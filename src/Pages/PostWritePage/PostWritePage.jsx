import React, { useRef, useState, useCallback } from "react";

// 페이지 밑 모달
import PostMainHeader from '../Header/MainHeader';
import PostWriteFooter from "./PostWriteFooter";

// 컴포넌트
import MapModal from "../../components/PostWritePageModal/MapModal/MapModal";
import CategoryModal from "../../components/PostWritePageModal/CategoryModal/CategoryModal";

import { Grid, Chip, TextField } from "@mui/material";

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

import "../../ui/PostWritePage/PostWritePage.css"

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function PostWritePage() {

  // 지도 모달
  const [openMapModal, setOpenMapModal] = useState(false);
  // 카테고리 모달
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  // 텍스트 Area 상태 관리
  const [content, setcontent] = useState("");
  // 태그 상태 관리
  const [tags, setTags] = useState([]);
  // imgFrame 표시할 이미지 목록
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

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

  const [restaurantName, setRestaurantName] = useState(""); // 맛집 주소
  const [restaurantAddress, setRestaurantAddress] = useState(""); // 맛집 주소

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

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;
          setImages((prevImages) => [...prevImages, base64]);
        };
        reader.readAsDataURL(file);
      }
    };
  }, [setImages]);

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
  
  const [selectedData, setSelectedData] = useState({
    category: [],
    clip: [],
    weather: "",
    feeling: "",
    privacy: "전체 공개"
  });

  const handleDataSubmit = (data) => {
    setSelectedData(data); // CategoryModal에서 받은 데이터를 상태에 저장
    console.log(data);
  };

  // MapModal로 부터 받은 식당의 이름과 주소
  const addressHandler = (name, address) => {
    setRestaurantName(name);
    setRestaurantAddress(address);
  }

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
                {/* 등록 이미지 프레임 */}
                <div className="imgFrame">
                  {images.length === 0 ? (
                    <p className="placeholder-text">이미지를 넣어주세요</p>
                  ) : (
                    images.map((src, index) => (
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
                        <p style={{fontFamily: "font-notosansKR-medium", fontSize: "13px", paddingBottom: "20px"}}>AI를 이용해 글을 작성해보세요!</p>
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

      <PostWriteFooter />

      {/*MapModal 컴포넌트*/}
      <MapModal open={openMapModal} handleClose={handleCloseMapModal} addressHandler={addressHandler} />

      {/*CategoryModal 컴포넌트*/}
      <CategoryModal open={openCategoryModal} handleClose={handleCloseCategoryModal} handleDataSubmit={handleDataSubmit} />
    </div>
  );
}

export default PostWritePage;
