import React, { useRef, useState, useCallback } from "react";

// 페이지 밑 모달
import PostMainHeader from '../Header/MainHeader';
import PostWriteFooter from "./PostWriteFooter";

// 컴포넌트
import MapModal from "../../components/PostWritePageModal/MapModal/MapModal";
import CategoryModal from "../../components/PostWritePageModal/CategoryModal/CategoryModal";

import { Grid, Chip, TextField, Button, LinearProgress } from "@mui/material";

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import "../../ui/PostWritePage/PostWritePage.css"

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../../api/axios";
import axios from 'axios';

function PostWritePage() {

  // 지도 모달
  const [openMapModal, setOpenMapModal] = useState(false);
  // 카테고리 모달
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  // 텍스트 Area 상태 관리
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  // 태그 상태 관리
  const [tags, setTags] = useState([]);
  // imgFrame 표시할 이미지 목록
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  // Cate 버블 상태 관리
  const [showCateBubble, setShowCateBubble] = useState(false);
  const cateIconRef = useRef(null);

  // AI 버블 상태 관리
  const [showBubble, setShowBubble] = useState(false);
  const [showClickBubble, setShowClickBubble] = useState(false);
  const [bubblePosition, setBubblePosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);

  // Map 버블 상태 관리
  const [showAddressBubble, setShowAddressBubble] = useState(false);
  const addressIconRef = useRef(null);

  // 영수증 인증 버블 상태 관리
  const [showReceiptBubble, setShowReceiptBubble] = useState(false);

  const [restaurantName, setRestaurantName] = useState(""); // 맛집 주소
  const [restaurantAddress, setRestaurantAddress] = useState(""); 
  const [restaurantLatitude, setRestaurantLatitude] = useState(0.0); 
  const [restaurantLongitude, setRestaurantLongitude] = useState(0.0); 

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

  const [receiptVerification, setReceiptVerification] = useState("");

  // Tag 추가 시 함수
  const handleAddTag = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      setTags([...tags, event.target.value.trim()]);
      event.target.value = '';
    }
  }

  // Tag 지우기 함수
  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  // 맵 모달 창 열기
  const handleOpenMapModal = () => setOpenMapModal(true);
  const handleCloseMapModal = () => setOpenMapModal(false);

  // 카테고리 모달 창 열기
  const handleOpenCategoryModal = () => setOpenCategoryModal(true);
  const handleCloseCategoryModal = () => setOpenCategoryModal(false);
  const handleCateIconMouseEnter = () => setShowCateBubble(true);
  const handleCateIconMouseLeave = () => setShowCateBubble(false);

  // 주소 아이콘 마우스 동작처리
  const handleAddressIconMouseEnter = () => setShowAddressBubble(true);
  const handleAddressIconMouseLeave = () => setShowAddressBubble(false);

  // 영수증 아이콘 마우스 동작처리
  const handleReceiptIconMouseEnter = () => setShowReceiptBubble(true);
  const handleReceiptIconMouseLeave = () => setShowReceiptBubble(false);

  // AI 아이콘 마우스 동작처리
  const handleAIIconMouseEnter = () => {
    if (!showClickBubble && iconRef.current) {
      const iconRect = iconRef.current.getBoundingClientRect();
      setBubblePosition({
        top: iconRect.top - 70,
        left: iconRect.left + iconRect.width / 2 + 140,
      });
      setShowBubble(true);
    }
  };

  const handleAIIconMouseLeave = () => {
    if (!showClickBubble) {
      setShowBubble(false);
    }
  };

  const handleAIIconClick = () => {
    setShowBubble(false);

    setTimeout(() => {
      if (iconRef.current) {
        const iconRect = iconRef.current.getBoundingClientRect();
        setBubblePosition({
          top: iconRect.top - 20,
          left: iconRect.left + iconRect.width / 2 + 340,
        });
      }
      setShowClickBubble(!showClickBubble);
    }, 100); // 100ms 지연 후 클릭 말풍선 표시
  };


  // 이미지 띄우기 동작처리
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        setImages((prevImages) => [...prevImages, file]);

        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;
          setPreviewImages((prevPreviews) => [...prevPreviews, base64]);
        };
        reader.readAsDataURL(file);
      }
    };
  }, [setImages, setPreviewImages]);



  const handleSelectImg = (index) => {
    setSelectedImg(index);
  };

  // ReactQuill 동작처리

  const toolbarOptions = [
    ['image'], // 이미지 버튼만 남김
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: imageHandler,
      },
    },
  };

  const handleDataSubmit = (data) => {
    setSelectedData(data); // CategoryModal에서 받은 데이터를 상태에 저장
    console.log(data);
  };

  // MapModal로 부터 받은 식당의 이름과 주소
  const addressHandler = (name, address, latitude, longitude) => {
    setRestaurantName(name);
    setRestaurantAddress(address);
    setRestaurantLatitude(parseFloat(latitude));
    setRestaurantLongitude(parseFloat(longitude));
  } 

  // 백엔드

  const [selectedData, setSelectedData] = useState({
    category: [],
    clip: [],
    weather: "",
    mood: "",
    privacy: "전체 공개"
  });


  const postHandleSubmit = () => {
    // 필수 입력 항목 확인
    // if (!selectedData.category.length || !selectedData.weather || !selectedData.mood) {
    //   alert("추가 정보 입력은 필수입니다.");
    //   return;
    // } else if(!(title.length > 0)){
    //   alert("제목을 입력해주세요.");
    //   return;
    // } else if(!(restaurantName.length > 0) && !(restaurantAddress > 0) ){
    //   alert("맛집 주소를 선택해주세요.");
    //   return;
    // } else if(!(content.length > 0)){
    //   alert("내용을 입력해주세요.");
    // } else if(!(images.length > 0)){
    //   alert("이미지를 한 장 이상 업로드해주세요.");
    //   return;
    // }


    saveRestaurant();


  };

  

  // 영수증 인증
  const [selectedFile, setSelectedFile] = useState(null);

  // 파일 선택 이벤트 핸들러
  const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
  };

  // 레스토랑 유무검사/추가 함수
  const saveRestaurant = async () => {
    try {
        const response = await api.post("/api/amadda/saveRestaurant", null, {
            params: {
                restaurantName: restaurantName,
                restaurantAddress: restaurantAddress,
                locationLatitude: restaurantLatitude,
                locationLongitude: restaurantLongitude
            }
        });
        const restaurantId = response.data;
        console.log("Restaurant ID:", restaurantId);

       // 게시물 저장 함수 실행
       savePost(restaurantId);

    } catch (error) {
        console.error("Failed to save restaurant:", error);
    }
  };

  // 게시물 저장 함수
  const savePost = async (restaurantId) => {
    const category = selectedData.category.join(',');
    const receiptVerificationValue = receiptVerification === "" || receiptVerification === false ? false : true;
    
    // HTML을 텍스트로 변환하는 함수
    const parseHTMLToText = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    };

    // content를 텍스트로 변환하여 저장
    const plainTextContent = parseHTMLToText(content);

    // post 데이터 준비
    const postData = {
      post_title: title,
      post_content: plainTextContent,
      privacy: "PUBLIC",
      food_category: category,
      mood: selectedData.mood,
      weather: selectedData.weather,
      receipt_verification: receiptVerificationValue,
      restaurant_id: restaurantId,
      user_id: 1,
      theme_id: 1
    };

    console.log("postData : ", postData);

    try {
        // POST 요청
        const response = await api.post("/api/amadda/savePost", postData);

        // 요청 성공 시 처리
        if (response.status === 200) {
          const postId = response.data;
          console.log("게시물 저장 성공:", postId); // 서버에서 반환된 데이터 출력

          // 이미지 저장 함수 실행
          saveImages(images, postId, restaurantId);
            
        }
    } catch (error) {
        // 요청 실패 시 에러 처리
        console.error("게시물 저장 실패:", error.response ? error.response.data : error.message);
    }
  };

  // 이미지 저장 함수
  const saveImages = async (images, postId, restaurantId) => {
    const formData = new FormData();
    images.forEach(image => {
        formData.append("file", image); // 이미지 배열을 하나씩 추가
    });
    formData.append("postId", postId);
    formData.append("restaurantId", restaurantId);

    api.post('/api/amadda/saveFoodImages', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        console.log('Uploaded file URLs:', response.data); // 여러 URL이 반환됨
        console.log("게시물 저장 성공");
    })
    .catch(error => {
        console.error('Error uploading files:', error);
    });

  };

  // 영수증 이미지 전송 함수
  const imageHandleSubmit = async (event) => {
    event.preventDefault();
    
    if (!restaurantName || !restaurantAddress) {
        alert("먼저 맛집 주소를 선택해주세요");
        return;
    }

    if (!selectedFile) {
      alert("영수증 사진을 업로드해주세요");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("storeName", restaurantName);
    formData.append("storeAddress", restaurantAddress);

    setIsLoading(true);

    try {
      const response = await api.post("/api/amadda/process", formData, {
          headers: {
              "Content-Type": "multipart/form-data"
          }
      });
      console.log(response.data);

      // 서버에서 반환한 결과 처리
      if (response.data === true) {
          setReceiptVerification(true);
      } else {
          setReceiptVerification(false);
      }
    } catch (error) {
        console.error("이미지 전송 중 오류 발생:", error);
    }
    setIsLoading(false);
  };

  

  
  return (
    <div className="PostWritePage">
      {/* header 부분 */}
      <PostMainHeader />

      <div className="PostWritePage-content">
        <Grid container sx={{ minHeight: "80vh", width: "100%" }}>
          <Grid
            item
            xs={12}
            sm={1.5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
              padding: 2,
            }}
          >
            {/* 추후에 콘텐츠를 넣을 수 있는 왼쪽 사이드바 */}
            <div className="left-frame"></div>
          </Grid>

          {/* 메인 콘텐츠 부분 */}
          <Grid
            item
            xs={12}
            sm={9}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
            }}
          >
            {/* 메인 영역 중 전체 컨텐츠 영역 */}
            <div className="contentContainer"
              style={{ flexGrow: 1 }}>

              {/* 상단 페이지 타이틀 */}
              <div className="titleContainer">
                <p className="PageTitle">나만의 맛집을 공유해보세요!</p>
              </div>

              {/* 이미지 관리 부분 */}
              <div className="imgContainer">
                <div className="imgFrame">
                  {previewImages.length === 0 ? (
                    <div>
                      <p className="placeholder-text">아래 버튼을 눌러 이미지를 업로드해주세요</p>
                    </div>
                  ) : (
                    previewImages.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`img${index + 1}`}
                        className={`img ${selectedImg === index ? 'selected' : ''}`}
                        onClick={() => handleSelectImg(index)}
                      />
                    ))
                  )}
                </div>
              </div>


              {/* 텍스트 input 부분 */}
              <div className="text-input-frame">
                <div className="title-input-container">
                  <div
                    className={`title-container ${showCateBubble ? 'hovered' : ''}`}
                    onMouseEnter={handleCateIconMouseEnter}
                    onMouseLeave={handleCateIconMouseLeave}
                    onClick={handleOpenCategoryModal}
                    ref={addressIconRef}
                  >

                    <CircleNotificationsIcon
                      className="blinking-icon"
                      style={{
                        cursor: 'pointer',
                        fontSize: '60px'
                      }}
                      onClick={handleOpenCategoryModal} // 아이콘 클릭 시 모달 열기
                    />
                    {/* 말풍선 */}
                    {showCateBubble && (
                      <div className="titlebubble">
                        기분과 날씨 등 일기에 추가할 내용을 선택해주세요
                      </div>
                    )}
                  </div>
                  <TextField
                    className="title-input-field"
                    placeholder="제목을 입력해주세요"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        fontFamily: 'font-notosansKR-medium',
                        backgroundColor: 'white',
                        fontSize: '14px',
                        '&.Mui-focused fieldset': {
                          border: '1px solid #d3d3d3',
                        },
                      },
                    }}
                  />
                </div>

                <div className="location-input-container">
                  <div
                    className={`address-container ${showAddressBubble ? 'hovered' : ''}`}
                    onMouseEnter={handleAddressIconMouseEnter}
                    onMouseLeave={handleAddressIconMouseLeave}
                    onClick={handleOpenMapModal}
                    ref={addressIconRef}
                  >

                    <LocationOnIcon className="address-icon" />

                    {/* 말풍선 */}
                    {showAddressBubble && (
                      <div className="addressbubble">
                        주소를 편하게 검색해서 찾아보세요!
                      </div>
                    )}

                  </div>

                  {/* 주소 입력란 */}
                  <TextField
                    className="location-input-field"
                    placeholder="주소를 입력해주세요"
                    onKeyDown={handleAddTag}
                    variant="outlined"
                    fullWidth
                    value={restaurantName && restaurantAddress ? `${restaurantName} (${restaurantAddress})` : ""}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        fontFamily: 'font-notosansKR-medium',
                        backgroundColor: 'white',
                        fontSize: '14px',
                        '&.Mui-focused fieldset': {
                          border: '1px solid #d3d3d3', // focused 상태일 때의 테두리 색상을 연한 회색으로 설정
                        },
                      },
                    }}
                  />
                </div>

                {/* 버튼을 textarea 위에 배치 */}
                <div className="text-input-container">
                  <div
                    className={`ai-button-container ${showBubble ? 'hovered' : ''} ${showClickBubble ? 'clicked' : ''}`}
                    onMouseEnter={handleAIIconMouseEnter}
                    onMouseLeave={handleAIIconMouseLeave}
                    onClick={handleAIIconClick}
                    ref={iconRef}
                  >

                    <AutoFixHighIcon className={`ai-icon ${showBubble ? 'hovered-icon' : ''} ${showClickBubble ? 'clicked-icon' : ''}`} />

                    {/* 말풍선 */}
                    {showBubble && (
                      <div
                        className="bubble"
                        style={{
                          position: "fixed",
                          top: `${bubblePosition.top}px`,
                          left: `${bubblePosition.left}px`,
                          height: "35px"
                        }}
                      >
                        <p style={{ fontFamily: "font-notosansKR-medium", fontSize: "13px", paddingBottom: "20px" }}>AI를 이용해 글을 작성해보세요!</p>
                      </div>
                    )}

                    {showClickBubble && (
                      <div
                        className="bubbleClick"
                        style={{
                          position: "fixed",
                          top: `${bubblePosition.top - 50}px`, // 기존 말풍선 위에 위치하도록 조정
                          left: `${bubblePosition.left}px`,
                        }}
                      >
                        <p style={{ margin: 0 }}>제목, 주소, 카테고리를 작성해주면 AI가 내용을 자동으로 완성해드립니다.</p>
                        <button className="autocomplete-button">자동완성</button>
                      </div>
                    )}
                  </div>

                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setcontent}
                    modules={modules}
                    placeholder="내용을 입력해주세요"
                    style={{ width: '100%' }}
                  />
                </div>

                {/* 영수증 인증 */}
                <div>
                  <div
                      className={`receipt-container ${showAddressBubble ? 'hovered' : ''}`}
                      onMouseEnter={handleReceiptIconMouseEnter}
                      onMouseLeave={handleReceiptIconMouseLeave}
                      onClick={handleOpenMapModal}
                      ref={addressIconRef}
                    >

                      <ReceiptLongIcon/>

                      {/* 말풍선 */}
                      {showAddressBubble && (
                        <div className="receiptbubble">
                          주소를 편하게 검색해서 찾아보세요!
                        </div>
                      )}

                    </div>
                  
                    <form onSubmit={imageHandleSubmit}>
                        <input type="file" onChange={handleFileChange} />
                        <button type="submit">이미지 전송</button>
                    </form>
                    {isLoading && <LinearProgress color="success" />} {/* 로딩 상태에 따라 LinearProgress 표시 */}
                    {receiptVerification !== "" && (
                      <div>
                        <h3>
                          {receiptVerification ? "영수증 인증 완료" : "영수증 인증 실패"}
                        </h3>
                      </div>
                    )}

                </div>
  

                {/* 태그 입력 영역 */}
                <div className="tag-input-area">
                  <TextField
                    className="tag-input-field"
                    placeholder="#태그를 입력해주세요"
                    onKeyDown={handleAddTag}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        '& fieldset': { border: 'none' },
                        backgroundColor: 'white',
                        fontFamily: "font-notosansKR-medium",
                        fontSize: '13px',
                      },
                    }}
                  />
                  <div className="tag-list">
                    {tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={`#${tag}`}
                        onDelete={() => handleDeleteTag(tag)}
                        sx={{ margin: '5px' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          {/* Right Sidebar */}
          <Grid
            item
            xs={12}
            sm={1.5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
              padding: 2, // 좌측 그리드와 동일하게 설정
            }}
          >
            <div className="right-frame">
              {/* Right Sidebar 내용 */}
            </div>
          </Grid>
        </Grid>
      </div>

      <PostWriteFooter onSubmit={postHandleSubmit} />

      {/*MapModal 컴포넌트*/}
      <MapModal open={openMapModal} handleClose={handleCloseMapModal} addressHandler={addressHandler} />

      {/*CategoryModal 컴포넌트*/}
      <CategoryModal open={openCategoryModal} handleClose={handleCloseCategoryModal} handleDataSubmit={handleDataSubmit} />
    </div>
  );
}


export default PostWritePage;
