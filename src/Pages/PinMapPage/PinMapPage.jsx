import React, { useState, useEffect } from "react";
import { Grid, Box, useMediaQuery, IconButton, Drawer } from '@mui/material';
import Filter from "../../components/DiaryViewPage/DiaryFilter/FilterMenu"; // 필터 컴포넌트
import Footer from "../Foorter/Footer";
import MainHeader from "../Header/MainHeader";
import MenuIcon from '@mui/icons-material/Menu';
import Kakao from '../../components/Kakao/Kakao'; // Kakao 지도 컴포넌트
import axios from "axios"; // axios import
import "../../ui/PinMapPage/PinMapPage.css";
import api from "../../api/axios";
import BackgroundModal from "../../components/PostModal/BackgroundModal.jsx";

export const PinMapPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]); // 레스토랑 정보 상태
  const [pinColors, setPinColors] = useState([]); // 핀 색상 상태
  const isMobile = useMediaQuery('(max-width:900px)');

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };
  const [filters, setFilters] = useState({
    searchText: "", // 검색어 필터
    mood: [], // 기분 필터
    verification: [], // 인증 필터
    pinColor: [], // 색상 필터
    topic: [] // 주제 필터
});

  // 필터 변경 시 호출되는 함수
  const handleSearch = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  useEffect(() => {
    fetchData(); // 데이터 가져오기 호출
  }, []); // 빈 배열을 넣어 한번만 호출되도록

  // 레스토랑 정보와 핀 색상 정보 받아오는 함수
  const fetchData = async () => {
    try {
      // 레스토랑 정보 가져오기
      const restaurantsResponse = await axios.get("http://localhost:7777/api/restaurants");
      setRestaurants(restaurantsResponse.data); // 레스토랑 정보 상태에 저장

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
      <Grid container sx={{ minHeight: "80vh", width: "100%" }}>
        {!isMobile && (
          <Grid item xs={12} sm={2} md={1} lg={2.5} className="pinMap-filter-container">
            <Box sx={{ height: "100%", justifyContent: "center", display: "flex", marginTop: "20px" }}>
              <Filter onSearch={handleSearch} /> {/* 필터에서 onSearch 콜백 전달 */}
            </Box>
          </Grid>
        )}
        
        <Grid item xs={12} sm={9} md={11} lg={9.5} className="map-container">
          {isMobile && !isDrawerOpen && (
            <Box display="flex" justifyContent="center" mb={2}>
              <IconButton
                onClick={toggleDrawer(true)}
                style={{ borderRadius: '50%', padding: '10px', backgroundColor: '#fff', position: 'relative', top: 0, zIndex: 1300 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          <Box sx={{ height: "100vh", width: "100%", mt: isMobile ? 4 : 0 }}>
            <div className="map-border">
              {/* 필터링된 레스토랑 정보를 Kakao 컴포넌트로 전달 */}
              <Kakao restaurants={restaurants} pinColors={pinColors} filters={filters} />
            </div>
          </Box>
        </Grid>
      </Grid>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: '80%', maxWidth: '300px' }
        }}
      >
        <Filter onSearch={handleSearch} />
      </Drawer>

      <Footer />
    </div>
  );
};

export default PinMapPage;
