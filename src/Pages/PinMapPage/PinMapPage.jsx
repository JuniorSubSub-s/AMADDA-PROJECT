import React, { useState, useEffect } from "react";
import { Grid, Box, useMediaQuery, IconButton, Drawer } from '@mui/material';
import Filter from "../../components/DiaryViewPage/DiaryFilter/FilterMenu";
import Footer from "../Foorter/Footer";
import MainHeader from "../Header/MainHeader";
import MenuIcon from '@mui/icons-material/Menu';
import Kakao from '../../components/Kakao/Kakao'; // Kakao 지도 컴포넌트
import axios from "axios"; // axios import
import "../../ui/PinMapPage/PinMapPage.css";

export const PinMapPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]); // 레스토랑 정보 상태
  const [pinColors, setPinColors] = useState([]); // 핀 색상 상태
  const isMobile = useMediaQuery('(max-width:900px)');

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    fetchData(); // 데이터 가져오기 호출
  }, []); // 빈 배열을 넣어 한번만 호출되도록

    // 레스토랑 정보와 핀 색상 정보 받아오는 함수
    const fetchData = async () => {
      try {
        // 레스토랑 정보 가져오기
        const restaurantsResponse = await axios.get("http://localhost:7777/api/restaurants");
        setRestaurants(restaurantsResponse.data); // 레스토랑 정보 상태에 저장
        console.log(restaurantsResponse.data)
        // 핀 색상 가져오기
        const pinColorsResponse = await axios.get("http://localhost:7777/api/restaurants/pins");
        setPinColors(pinColorsResponse.data); // 핀 색상 상태에 저장
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };
  return (
    <div>
      <MainHeader />

      {/* 전체 레이아웃을 감싸는 그리드 컨테이너 */}
      <Grid container sx={{ minHeight: "80vh", width: "100%" }}>
        {/* 필터 영역 (모바일에서는 Drawer로 표시) */}
        {!isMobile && (
          <Grid item xs={12} sm={2} md={1} lg={2.5} className="pinMap-filter-container">
            <Box sx={{ height: "100%", justifyContent: "center", display: "flex", marginTop: "20px" }}>
              <Filter />
            </Box>
          </Grid>
        )}

        {/* 지도 나오는 영역 */}
        <Grid item xs={12} sm={9} md={11} lg={9.5} className="map-container">
          {/* 모바일 화면에서 필터 열기 버튼 (필터가 열려 있을 때는 버튼 숨김) */}
          {isMobile && !isDrawerOpen && (
            <Box display="flex" justifyContent="center" mb={2}>
              <IconButton
                onClick={toggleDrawer(true)}
                style={{
                  borderRadius: '50%',
                  padding: '10px',
                  backgroundColor: '#fff',
                  position: 'relative',
                  top: 0,
                  zIndex: 1300,
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          {/* 지도 영역 */}
          <Box sx={{ height: "100vh", width: "100%", mt: isMobile ? 4 : 0 }}>
            {/* 실제 지도 컴포넌트가 들어갈 공간 */}
            <div className="map-border">
              <Kakao restaurants={restaurants} pinColors={pinColors} />
            </div>
          </Box>
        </Grid>
      </Grid>

      {/* Drawer를 사용하여 화면 왼쪽에 필터 표시 */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: '80%', maxWidth: '300px' }
        }}
      >
        <Filter />
      </Drawer>

      <Footer />
    </div>
  );
};

export default PinMapPage;
