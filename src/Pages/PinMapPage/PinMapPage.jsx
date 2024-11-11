import { Grid, Box, useMediaQuery, IconButton, Drawer } from '@mui/material';
import React, { useState } from "react";
import Filter from "../../components/DiaryViewPage/DiaryFilter/FilterMenu";
import Footer from "../Foorter/Footer";
import MainHeader from "../Header/MainHeader";
import { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

import "../../ui/PinMapPage/PinMapPage.css";

export const PinMapPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [restaurantName, setRestaurantName] = useState(""); // 맛집명 상태 추가
  const [pinColorValue, setPinColorValue] = useState(0); // 핀 색상 상태 추가
  const isMobile = useMediaQuery('(max-width:900px)');

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  useEffect(() => {
    console.log("현재 선택된 맛집명:", restaurantName);
  }, [restaurantName]); // restaurantName이 업데이트될 때마다 로그 출력


  return (
    <div>
      <MainHeader />

      {/* 전체 레이아웃을 감싸는 그리드 컨테이너 */}
      <Grid container sx={{ minHeight: "80vh", width: "100%" }}>
        {/* 필터 영역 (모바일에서는 Drawer로 표시) */}
        {!isMobile && (
          <Grid
            item
            xs={12}
            sm={2}
            md={1}
            lg={2}
            className="pinMap-filter-container">
            <Box sx={{
              justifyContent: "center",
              display: "flex",
              marginTop: "10px"
            }}>
              <Filter setRestaurantName={setRestaurantName}
                setPinColorValue={setPinColorValue} />
            </Box>
          </Grid>
        )}

        {/* 지도 나오는 영역 */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={10}>

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
          </Box>
        </Grid>
      </Grid>

      {/* 화면이 작아졌을때 나오는 필터 */}
      {/* Drawer를 사용하여 화면 왼쪽에 필터 표시 */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: '80%', maxWidth: '300px' }
        }}
      >
        <Filter
          setRestaurantName={setRestaurantName} // props 전달
          setPinColorValue={setPinColorValue} // props 전달 
        />
      </Drawer>

      <Footer />
    </div>
  );
};

export default PinMapPage;
