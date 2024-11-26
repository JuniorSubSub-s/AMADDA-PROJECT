import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Button, Divider, FormControlLabel, ListItemIcon, Menu, MenuItem, Modal, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import './CategoryModal.css';

function CategoryModal({ open, handleClose, handleDataSubmit }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("카테고리");
  const [selectedMenuItems, setSelectedMenuItems] = useState(""); // 메뉴 항목 배열
  const [selectedClipItems, setSelectedClipItems] = useState([]); // CLIP 항목 배열
  const [selectedWeather, setSelectedWeather] = useState(""); // 선택된 날씨 상태 추가
  const [hoveredWeather, setHoveredWeather] = useState(""); // 날씨 호버 상태 추가
  const [selectedFeeling, setSelectedFeeling] = useState(""); // 선택된 기분 상태
  const [hoveredFeeling, setHoveredFeeling] = useState(""); // 기분 호버 상태 추가
  const [selectedPrivacy, setSelectedPrivacy] = useState("전체 공개");

  // 메뉴 열기 핸들러
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // 항목 선택 핸들러
  const handleItemClick = (item, type) => {
    if (type === "menu") {
      setSelectedMenuItems([item]); // 선택한 항목만 배열에 저장
    } else if (type === "clip") {
      setSelectedClipItems((prevSelected) =>
        prevSelected.includes(item)
          ? prevSelected.filter((i) => i !== item)
          : [...prevSelected, item]
      );
    }
  };

  // 공개 설정 핸들러
  const handlePrivacyChange = (event) => {
    setSelectedPrivacy(event.target.value);
  };


  // 메뉴 닫기 핸들러
  const handleMenuClose = (category) => {
    setAnchorEl(null);
    if (category) {
      setSelectedCategory(category);
    }
  };

  // 등록 버튼 클릭 핸들러
  const handleRegister = () => {
    console.log("선택된 메뉴 항목: ", selectedMenuItems);
    console.log("선택된 CLIP 항목: ", selectedClipItems);
    setAnchorEl(null);
  };


  // 날씨 선택 핸들러
  const handleWeatherClick = (weatherLabel) => {
    setSelectedWeather(weatherLabel); // 선택된 날씨 업데이트
  };

  // 기분 선택 핸들러
  const handleFeelingClick = (feelingLabel) => {
    setSelectedFeeling(feelingLabel); // 선택된 기분 업데이트
  };

  const handleData = () => {
    if (
      (Array.isArray(selectedMenuItems) && selectedMenuItems.length === 0) ||
      !selectedWeather ||
      !selectedFeeling
    ) {
      alert("카테고리, 날씨, 기분은 필수 선택 사항입니다.");
      return;
    }
  
    const selectedData = {
      category: selectedMenuItems,  // 선택된 메뉴 항목
      clip: selectedClipItems,      // 선택된 클립 항목
      weather: selectedWeather,     // 선택된 날씨
      mood: selectedFeeling,     // 선택된 기분
      privacy: selectedPrivacy      // 공개 설정
    };
    handleDataSubmit(selectedData); // 부모 컴포넌트에 데이터 전달
    handleClose();
  };
  


  return (
    <Modal open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description">
      <Box className="category-modal-box">
        {/* 닫기 버튼 */}
        <div className="close-button" onClick={handleClose}></div>

        {/* 제목 */}
        <Typography id="category-modal-title"
          variant="h6"
          component="h2"
          className="category-modal-title">
          추가 정보 입력을 위해 눌러주세요
          <ArrowDropDownIcon onClick={handleMenuClick}
            style={{ cursor: 'pointer' }} />
        </Typography>

        {/* 메뉴 컴포넌트 */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {/* Menu 타이틀을 위한 MenuItem */}
          <MenuItem disabled>
            <Typography variant="subtitle1"
              style={{ fontWeight: 'bold', color: '#333', height: '18px' }}>
              Category
            </Typography>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />

          {/* 실제 메뉴 항목들 */}
          {['한식', '중식', '일식', '양식', '카페 & 디저트'].map((menu) => (
            <MenuItem
              key={menu}
              onClick={() => handleItemClick(menu, "menu")}
              selected={selectedMenuItems.includes(menu)}
              style={{ backgroundColor: selectedMenuItems.includes(menu) ? '#e0e0e0' : 'transparent' }}
            >

              {menu === '한식' && ( // "한식" 항목에만 이미지 추가
                <ListItemIcon>
                  <img
                    src={`/img/cateImg/korea.png`}
                    alt="한식"
                    style={{ width: 24, height: 24 }}
                  />
                </ListItemIcon>
              )}
              {menu === '중식' && ( // "한식" 항목에만 이미지 추가
                <ListItemIcon>
                  <img
                    src={`/img/cateImg/china.png`}
                    alt="중식"
                    style={{ width: 24, height: 24 }}
                  />
                </ListItemIcon>
              )}
              {menu === '일식' && ( // "한식" 항목에만 이미지 추가
                <ListItemIcon>
                  <img
                    src={`/img/cateImg/japan.png`}
                    alt="일식"
                    style={{ width: 24, height: 24 }}
                  />
                </ListItemIcon>
              )}
              {menu === '양식' && ( // "한식" 항목에만 이미지 추가
                <ListItemIcon>
                  <img
                    src={`/img/cateImg/america.png`}
                    alt="양식"
                    style={{ width: 24, height: 24 }}
                  />
                </ListItemIcon>
              )}
              {menu === '카페 & 디저트' && ( // "한식" 항목에만 이미지 추가
                <ListItemIcon>
                  <img
                    src={`/img/cateImg/cafe.png`}
                    alt="카페 & 디저트"
                    style={{ width: 24, height: 24 }}
                  />
                </ListItemIcon>
              )}
              {menu}
            </MenuItem>
          ))}

          {/* 구분선 */}
          <MenuItem disabled>
            <Typography variant="subtitle1"
              style={{ fontWeight: 'bold', color: '#333', height: '18px' }}>
              CLIP
            </Typography>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />

          {/* CLIP 항목 */}
          {[{ label: "가을", icon: <img src={`/img/cateImg/fall.png`} alt="가을" style={{ width: 24, height: 24 }} /> },
          { label: "가성비", icon: <img src={`/img/cateImg/saveMoney.png`} alt="가성비" style={{ width: 24, height: 24 }} /> },
          { label: "데이트", icon: <img src={`/img/cateImg/date.png`} alt="데이트" style={{ width: 24, height: 24 }} /> },
          { label: "캠핑&글램핑", icon: <img src={`/img/cateImg/camping.png`} alt="캠핑&글램핑" style={{ width: 24, height: 24 }} /> },
          { label: "흑백요리사", icon: <img src={`/img/cateImg/netflix.png`} alt="흑백요리사" style={{ width: 24, height: 24 }} /> },
          { label: "제주도", icon: <img src={`/img/cateImg/jeju.png`} alt="제주도" style={{ width: 24, height: 24 }} /> },
          { label: "라멘", icon: <img src={`/img/cateImg/camping.png`} alt="캠핑&글램핑" style={{ width: 24, height: 24 }} /> },
          { label: "간편식", icon: <img src={`/img/cateImg/netflix.png`} alt="흑백요리사" style={{ width: 24, height: 24 }} /> },
          { label: "막걸리", icon: <img src={`/img/cateImg/jeju.png`} alt="제주도" style={{ width: 24, height: 24 }} /> },
          { label: "탕", icon: <img src={`/img/cateImg/jeju.png`} alt="제주도" style={{ width: 24, height: 24 }} /> }].map((clip) => (
            <MenuItem
              key={clip.label}
              onClick={() => handleItemClick(clip.label, "clip")}
              selected={selectedClipItems.includes(clip.label)}
              style={{ backgroundColor: selectedClipItems.includes(clip.label) ? '#e0e0e0' : 'transparent' }}
            >

              <ListItemIcon>{clip.icon}</ListItemIcon>
              {clip.label}
            </MenuItem>
          ))}

          {/* 등록 버튼 */}
          <Box
            onClick={handleRegister}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '8px 16px', // 텍스트 주변에만 클릭 영역을 만들기 위한 여백 설정
              cursor: 'pointer',
              marginTop: '10px',
              '&:hover': {
                backgroundColor: 'transparent' // 호버 시 배경색이 변하지 않도록 설정
              }
            }}
          >
            <Typography variant="subtitle1" style={{ color: '#007BFF', fontWeight: 'bold' }}>
              등록
            </Typography>
          </Box>
        </Menu>

        {/* 공개 설정 */}
        <div className="privacy-settings">
          <Typography variant="subtitle1"
            style={{ fontFamily: 'Gmarket Sans TTF-Light, Helvetica, sans-serif' }}>공개 설정</Typography>
          <RadioGroup row defaultValue="전체 공개"
            className="radio-group" onChange={handlePrivacyChange}>
            <FormControlLabel
              value="전체 공개"
              control={<Radio />}
              label={
                <Typography style={{ fontFamily: 'Gmarket Sans TTF-Light, Helvetica, sans-serif' }}>
                  전체 공개
                </Typography>
              }
            />
            <FormControlLabel
              value="나만 보기"
              control={<Radio />}
              label={
                <Typography style={{ fontFamily: 'Gmarket Sans TTF-Light, Helvetica, sans-serif' }}>
                  나만 보기
                </Typography>
              }
            />
          </RadioGroup>
        </div>

        {/* 날씨 선택 */}
        <div className="section">
          <Typography variant="subtitle1" style={{ fontFamily: 'Gmarket Sans TTF-Light, Helvetica, sans-serif' }}>오늘의 날씨는 어땠나요?</Typography>
          <div className="weather-group">
            {[
              { label: '맑음', icon: `/img/weather/sun.png`, width: '30px', height: '30px', extraSpacing: true },
              { label: '흐림', icon: `/img/weather/cloud.png`, width: '40px', height: '30px', extraSpacing: true },
              { label: '비', icon: `/img/weather/rain.png`, width: '55px', height: '50px' },
              { label: '번개', icon: `/img/weather/thunder.png`, width: '40px', height: '35px', extraSpacing: true },
              { label: '눈', icon: `/img/weather/snow.png`, width: '55px', height: '50px' }
            ].map((weather) => (
              <div className="weather-card" key={weather.label}>
                <img
                  src={
                    hoveredWeather === weather.label || selectedWeather === weather.label
                      ? `${weather.icon.slice(0, -4)}2.png`
                      : weather.icon
                  } // 선택된 날씨에만 2 추가
                  alt={weather.label}
                  className="weather-icon"
                  style={{
                    width: weather.width,
                    height: weather.height + 10,
                    marginRight: weather.extraSpacing ? '5px' : '0', // 특정 항목에만 추가 간격 설정
                    cursor: "pointer"
                  }}
                  onClick={() => handleWeatherClick(weather.label)} // 날씨 클릭 시 선택
                  onMouseEnter={() => setHoveredWeather(weather.label)}
                  onMouseLeave={() => setHoveredWeather("")}
                />
                <span className="weather-label">{weather.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 기분 선택 */}
        <div className="section">
          <Typography variant="subtitle1" style={{ fontFamily: 'Gmarket Sans TTF-Light, Helvetica, sans-serif' }}>오늘의 기분은 어땠나요?</Typography>
          <div className="feeling-group">
            {[
              { label: '평온', icon: `/img/feeling/peaceful.png`, width: '30px', height: '30px' },
              { label: '행복', icon: `/img/feeling/happy.png`, width: '30px', height: '30px' },
              { label: '사랑', icon: `/img/feeling/love.png`, width: '30px', height: '30px' },
              { label: '호기심', icon: `/img/feeling/curiosity.png`, width: '30px', height: '30px' },
              { label: '귀찮음', icon: `/img/feeling/boring.png`, width: '30px', height: '30px' },
              { label: '스트레스', icon: `/img/feeling/stress.png`, width: '30px', height: '30px' }
            ].map((feeling) => (
              <div className="feeling-card" key={feeling.label}>
                <img
                  src={
                    hoveredFeeling === feeling.label || selectedFeeling === feeling.label
                      ? `${feeling.icon.slice(0, -4)}2.png`
                      : feeling.icon
                  }
                  alt={feeling.label}
                  className="feeling-icon"
                  style={{
                    width: selectedFeeling === feeling.label ? `${parseInt(feeling.width)}px` : feeling.width, // 선택된 경우 크기 증가
                    cursor: "pointer"
                  }}
                  onClick={() => handleFeelingClick(feeling.label)}
                  onMouseEnter={() => setHoveredFeeling(feeling.label)}
                  onMouseLeave={() => setHoveredFeeling("")}
                />
                <span className="feeling-label">{feeling.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 작성 완료 버튼 */}
        <Button variant="outlined"
          className="submit-button"
          onClick={handleData}>
          작성 완료
        </Button>
      </Box>
    </Modal>
  );
}

export default CategoryModal;