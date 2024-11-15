import React, { useState, useEffect } from "react";
import { Grid, Box, useMediaQuery, IconButton, Drawer } from '@mui/material';
import Filter from "../../components/DiaryViewPage/DiaryFilter/FilterMenu";
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
//////////////////////////////////////////////////////////////////////////
const [postData, setPostData] = useState([]);

    const [filters, setFilters] = useState({
        searchText: "", // 검색어 필터
        mood: [], // 기분 필터
        verification: [], // 인증 필터
        pinColor: [], // 색상 필터
        topic: [] // 주제 필터
    });

    // onSearch 함수 정의
    const handleSearch = (newFilters) => {
        setFilters(newFilters); // filters 상태 업데이트
        console.log('Received Filters:', newFilters); // 필터 데이터를 로그로 출력
    };

    const api_array = axios.create({
        baseURL: 'http://localhost:7777', // API의 기본 URL
        paramsSerializer: params => {
            return Object.entries(params)
                .map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return value.map(v => `${key}=${encodeURIComponent(v)}`).join('&');
                    }
                    return `${key}=${encodeURIComponent(value)}`;
                })
                .join('&');
        },
    });


    useEffect(() => {
        fetchData3();
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행

    const fetchData3 = async () => {
        try {
            const response = await api.get('/api/amadda/posts/latest', {});
            setPostData(response.data); // 검색 결과 업데이트
            console.log('Fetched Posts:', response.data); 
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const fetchData2 = async () => {
        try {
            const response = await api.get('/api/amadda/posts/latest', {});
            return response.data;
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // 데이터 요청

    const getIntersection = (arrays) => {
        if (arrays.some(arr => arr.length === 0)) {
            return [];
        } 
        return arrays.reduce((acc, curr) => acc.filter(item => curr.includes(item)));
    };
    
    
    const filterData = async () => {
        let moodData = [];
        let verificationData = [];
        let pinColorData = [];
        let topicData = [];
        let searchTextData = [];

        let tempData = await fetchData2();
        // 검색어에 따른 데이터 요청
        if (filters.searchText) {
            try {
                const response = await api.get('/api/amadda/posts/searchText', {
                    params: { searchText: filters.searchText },
                });
                searchTextData = response.data.map(post => post.postId); // postId 배열로 변환
                console.log("searchTextData : ", searchTextData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        } else {
            searchTextData = tempData.map(post => post.postId); // 초기 데이터가 있을 경우 postId 사용
        }
    
        // 기분에 따른 데이터 요청
        if (filters.mood.length > 0) {
            try {
                const response = await api_array.get("/api/amadda/posts/mood", {
                    params: { moods: filters.mood },
                });
                moodData = response.data.map(post => post.postId); // postId 배열로 변환
                console.log("moodData : ", moodData);
            } catch (error) {
                console.error("Error fetching mood data:", error);
            }
        } else {
            moodData = tempData.map(post => post.postId);
        }
    
        // 인증 여부에 따른 데이터 요청
        if (filters.verification.length === 1) {
            try {
                const response = await api.get("/api/amadda/posts/verification", {
                    params: { receiptVerification: filters.verification[0] === "인증" },
                });
                verificationData = response.data.map(post => post.postId); // postId 배열로 변환
                console.log("verificationData : ", verificationData);
            } catch (error) {
                console.error("Error fetching verification data:", error);
            }
        } else {
            verificationData = tempData.map(post => post.postId);
        }
    
        // 핀 색상에 따른 데이터 요청
        if (filters.pinColor.length > 0) {
            try {
                const response = await api.get("/api/amadda/posts/pinColor", {
                    params: { color: filters.pinColor },
                });
                pinColorData = response.data.map(post => post.postId); // postId 배열로 변환
                console.log("pinColorData : ", pinColorData);
            } catch (error) {
                console.error("Error fetching pinColor data:", error);
            }
        } else {
            pinColorData = tempData.map(post => post.postId);
        }
    
        // 주제에 따른 데이터 요청
        if (filters.topic.length > 0) {
            try {
                const response = await api_array.get("/api/amadda/posts/topics", {
                    paramjs: { topicNames: filters.topic },
                });
                topicData = response.data.map(post => post.postId); // postId 배열로 변환
                console.log("topicData : ", topicData);
            } catch (error) {
                console.error("Error fetching topic data:", error);
            }
        } else {
            topicData = tempData.map(post => post.postId);
        }
    
        // 교집합 구하기
        const allPostIds = [moodData, verificationData, pinColorData, topicData, searchTextData];
        const intersection = getIntersection(allPostIds); // 교집합 계산 함수
        
        console.log("postIds : ", intersection);
    
        // 교집합에 해당하는 데이터를 다시 요청해서 가져오기
        if (intersection.length > 0) {
            try {
                // intersection 배열을 URL에 포함하여 요청
                const response = await api_array.get(`/api/amadda/posts/${intersection.join(",")}`);
                
                setPostData(response.data); // 교집합에 해당하는 데이터로 상태 업데이트
                console.log("Fetched Posts (Intersection):", response.data);
            } catch (error) {
                console.error("Error fetching intersection posts:", error);
            }
        } else {
            setPostData([]); // 교집합이 비어 있으면 빈 배열로 업데이트
        }
        
    };
    
    

    useEffect(() => {
        filterData(); // 필터가 변경될 때마다 데이터 요청
    }, [filters]); // filters가 변경될 때마다 fetchData 호출

    // 필터 상태 변경을 위한 함수 (필터 UI에서 호출)
    const handleFiltersChange = (newFilters) => {
        setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
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
              <Filter onSearch={handleSearch}/>
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
          
        />
      </Drawer>

      <Footer />
    </div>
  );
};
export default PinMapPage;
