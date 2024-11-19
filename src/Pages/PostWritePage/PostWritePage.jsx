import React, { useRef, useState } from "react";

// 페이지 밑 모달
import { useParams } from "react-router-dom";
import PostMainHeader from '../Header/MainHeader';
import PostWriteFooter from "./PostWriteFooter";
// 컴포넌트
import CategoryModal from "../../components/PostWritePageModal/CategoryModal/CategoryModal";
import MapModal from "../../components/PostWritePageModal/MapModal/MapModal";

import { Button, Chip, Grid, TextField } from "@mui/material";

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

import "../../ui/PostWritePage/PostWritePage.css";

import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

import getUserId from "../../utils/getUserId";

function PostWritePage() {
  const navigate = useNavigate();
  const user_id_test = useParams();
  // 지도 모달
  const [openMapModal, setOpenMapModal] = useState(false);
  // 카테고리 모달
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  // 텍스트 Area 상태 관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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

  const [receiptLoading, setReceiptLoading] = useState(false); // 로딩 상태 관리

  const [receiptVerification, setReceiptVerification] = useState("");

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리


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

  const imageInputRef = useRef(null);

  // 이미지 띄우기 동작처리
  const imageHandler = (e) => {
    if (images.length > 3) {
      alert("이미지는 최대 4개까지만 업로드 가능합니다.");
      return;
    }

    if (images.length == 1) {
      setSelectedImg(0);
    }
    const file = e.target.files[0];
    if (file) {
      setImages((prevImages) => [...prevImages, file]);

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setPreviewImages((prevPreviews) => [...prevPreviews, base64]);
      };
      reader.readAsDataURL(file);
    }
  }


  const handleSelectImg = (index) => {
    setImages((prevImages) => {
      const selectedImage = prevImages[index]; // 선택한 이미지
      const updatedImages = [selectedImage, ...prevImages.filter((_, i) => i !== index)]; // 배열 재구성
      return updatedImages;
    });

    setPreviewImages((prevPreviews) => {
      const selectedPreview = prevPreviews[index]; // 선택한 이미지의 미리보기
      const updatedPreviews = [selectedPreview, ...prevPreviews.filter((_, i) => i !== index)]; // 배열 재구성
      return updatedPreviews;
    });

    setSelectedImg(0); // 선택된 이미지를 첫 번째로 설정
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
    //필수 입력 항목 확인

    if (!selectedData.category.length || !selectedData.weather || !selectedData.mood) {
      alert("추가 정보 입력은 필수입니다.");
      return;
    } else if (!(title.length > 0)) {
      alert("제목을 입력해주세요.");
      return;
    } else if (!(restaurantName.length > 0) && !(restaurantAddress > 0)) {
      alert("맛집 주소를 선택해주세요.");
      return;
    } else if (!(content.length > 0)) {
      alert("내용을 입력해주세요.");
    } else if (!(images.length > 0)) {
      alert("이미지를 한 장 이상 업로드해주세요.");
      return;
    }

    // 레스토랑 -> 포스트 -> 이미지 순으로 저장

    saveRestaurant();

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
      user_id: getUserId(),   // 여기서 바꾸면 됨
      theme_id: 1,
      clip: selectedData.clip,
      tag: tags
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
        alert("게시물 작성이 완료되었습니다.");
        navigate("/amadda");

      })
      .catch(error => {
        console.error('Error uploading files:', error);
      });

  };

  // 영수증 인증
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // 아이콘 클릭 시 파일 선택창 열기
  const triggerFileInput = () => {
    fileInputRef.current.click(); // 숨겨진 input 요소 클릭
  };

  // 파일 선택 이벤트 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // 선택된 파일 저장
      console.log("파일 선택됨:", file);
    }
  };

  // 영수증 이미지 전송 함수
  const imageHandleSubmit = async (event) => {
    event.preventDefault();

    if (!restaurantName || !restaurantAddress) {
      alert("맛집 주소를 선택해주세요");
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

    setReceiptLoading(true);

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
        setSelectedFile(null);
      } else {
        setReceiptVerification(false);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("이미지 전송 중 오류 발생:", error);
      setSelectedFile(null);
    }
    setReceiptLoading(false);
  };

   // ChatGPT API 요청 함수
  const generateAIContent = async (selectedData) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: '당신은 사용자의 입력 데이터를 바탕으로 글을 작성해주는 친절한 도우미입니다.' },
          { 
            role: 'user', 
            content: `다음의 데이터를 기반으로 글을 작성해주세요. 제목은 포함하지 말고 본문만 작성해주세요. 글의 길이는 최대 4단락으로 제한해주세요.\n
            Category: ${selectedData.category.join(', ') || 'None'}\n
            Clip: ${selectedData.clip.join(', ') || 'None'}\n
            Weather: ${selectedData.weather || 'None'}\n
            Feeling: ${selectedData.feeling || 'None'}\n
            Privacy: ${selectedData.privacy || 'None'}\n
            친절하고 일기형식처럼 사람이 작성한것처럼 작성해주세요` 
          },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok && data.choices && data.choices.length > 0) {
      return data.choices[0].message.content; // 생성된 콘텐츠 반환
    } else {
      throw new Error('Invalid response from ChatGPT API');
    }
    } catch (error) {
      console.error('Error generating AI content:', error);
      return 'AI 글 자동 완성 중 오류가 발생했습니다.'; // 에러 발생 시 기본 메시지 반환
    }
  };

  // 자동 완성 버튼 클릭 시 호출되는 함수
  const handleAutocompleteClick = async () => {
    if (!selectedData || Object.keys(selectedData).length === 0) {
      alert('AI 글 생성을 위한 데이터를 먼저 선택하세요.');
      return;
    }

    try {
      setIsLoading(true); // 로딩 상태 활성화
      const generatedContent = await generateAIContent(selectedData);

      if (generatedContent) {
        setContent(generatedContent); // 생성된 콘텐츠를 상태에 저장
        console.log('Generated Content:', generatedContent);
        alert('AI 글 자동 완성 완료!');
      } else {
        alert('AI 글 자동 완성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error in handleAutocompleteClick:', error);
      alert('AI 글 생성 중 문제가 발생했습니다.');
    } finally {
      setIsLoading(false); // 로딩 상태 비활성화
    }
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
              {previewImages.length > 0 && (
                <div className="imgContainer">
                  <div className="imgFrame">
                    {previewImages.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`img${index + 1}`}
                        className={`img ${selectedImg === index ? 'selected' : ''}`}
                        onClick={() => handleSelectImg(index)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<AddAPhotoIcon />}
                style={{ marginTop: '20px', fontFamily: 'font-notosansKR-medium' }}
              >
                이미지 업로드
                {/* 숨겨진 파일 입력 */}
                <input
                  type="file"
                  ref={imageInputRef} // 참조 설정
                  style={{ display: 'none' }} // 화면에서 숨기기
                  onChange={imageHandler} // 파일 변경 시 처리
                  accept="image/*"
                />
              </Button>

              <div>
                <p style={{ fontSize: '13px', color: '#3e75ff', fontFamily: 'font-notosansKR-medium' }}>이미지를 클릭하여 대표 이미지로 설정</p>
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
                        기분과 날씨 등 일기에 추가할 내용을 선택해주세요!
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
                        <button className="autocomplete-button" onClick={handleAutocompleteClick}>자동완성 </button>
                      </div>
                    )}
                  </div>

                  <TextField
                    className="title-input-field"
                    placeholder="내용을 입력해주세요"
                    variant="outlined"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    inputProps={{
                      style: { overflowY: 'auto', resize: 'none' },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        fontFamily: 'font-notosansKR-medium',
                        backgroundColor: 'white',
                        fontSize: '14px',
                        borderRadius: '10px',
                        '& fieldset': {
                          border: '1px solid #c0c0c0', // 테두리를 균일하게 설정
                        },
                        '&:hover fieldset': {
                          border: '1px solid #c0c0c0',
                        },
                        '&.Mui-focused fieldset': {
                          border: '1px solid #007BFF', // 포커스 시 더 두꺼운 테두리 설정
                        },
                      },
                    }}
                  />
                </div>

                {/* 영수증 인증 */}
                <div className="text-input-container">
                  <div
                    className={`receipt-container ${showReceiptBubble ? 'hovered' : ''}`}
                    onMouseEnter={handleReceiptIconMouseEnter}
                    onMouseLeave={handleReceiptIconMouseLeave}
                    onClick={triggerFileInput}
                  >

                    <ReceiptLongIcon className="receipt-icon" />

                    {/* 말풍선 */}
                    {showReceiptBubble && (
                      <div className="receiptbubble">
                        영수증 사진을 업로드하여 맛집 방문을 인증해보세요!
                      </div>
                    )}

                  </div>

                  {/* 숨겨진 파일 입력 */}
                  <input
                    type="file"
                    ref={fileInputRef} // 참조 설정
                    style={{ display: 'none' }} // 화면에서 숨기기
                    onChange={handleFileChange} // 파일 변경 시 처리
                    accept="image/*"
                  />

                    {/* 전송 버튼 */}
                    <LoadingButton
                      onClick={imageHandleSubmit}
                      endIcon = {selectedFile
                        ? <SendIcon />
                        : receiptVerification
                        ? <DoneAllIcon /> 
                        : <CloseIcon/>}                    
                      loading={receiptLoading}
                      loadingPosition="end"
                      disabled={!selectedFile}
                      variant="outlined"
                      sx={{
                        color: '#01DF3A',         // 글자 색상
                        borderColor: '#01DF3A',   // 테두리 색상
                        '&:hover': {
                          borderColor: '#01DF3A', // 호버 시 테두리 색상 유지
                          backgroundColor: 'rgba(8, 247, 127, 0.1)', // 호버 시 배경색 (선택)
                        },
                      }}
                    >
                      {selectedFile
                        ? '영수증 인증 검사'
                        : receiptVerification
                        ? '영수증 인증 성공'
                        : '영수증 인증 실패'}
                  </LoadingButton>

                </div>


                {/* 태그 입력 영역 */}
                <div className="tag-input-area">
                  <TextField
                    className="tag-input-field"
                    placeholder="#태그를 입력해주세요"
                    onKeyDown={handleAddTag}
                    variant="outlined"
                    fullWidth
                    disabled={tags.length >= 5}  // 태그가 5개 이상이면 비활성화
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
                  {tags.length >= 5 && (
                    <div style={{ color: '#f67e7e', fontSize: '12px', marginTop: '5px' }}>
                      태그는 최대 5개까지만 가능합니다.
                    </div>
                  )}
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
