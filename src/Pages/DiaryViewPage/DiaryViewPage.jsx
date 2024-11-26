import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer, Grid, IconButton, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from "react";

import FilterMenu from "../../components/DiaryViewPage/DiaryFilter/FilterMenu";
import Footer from "../Foorter/Footer";
import MainHeader from "../Header/MainHeader";
import MainRecentDiary from "./MainRecentDiary";
import MonthPickDiary from "./MonthPickDiary";
import TopHotDiary from "./TopHotDiary";
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';
import api from "../../api/axios";
import "../../ui/DiaryViewPage/DiaryViewPage.css";

function DiaryViewPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:900px)');
    const [originalData, setOriginalData] = useState([]); // 초기 데이터 상태 추가
    const [recentPostData, setRecentPostData] = useState([]);
    const [hotPostData, setHotPostData] = useState([]);
    const [loading, setLoading] = useState(false); // 로딩 상태

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

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    useEffect(() => {
        fetchRecentData();
        fetchHotData();
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행

    const fetchRecentData = async () => {
        try {
            const response = await api_array.get('/api/amadda/posts/latest');
            const sortedData = response.data.sort((a, b) => b.postId - a.postId);
            setOriginalData(sortedData || []); // originalData에 저장
            setRecentPostData(sortedData || []); // recentPostData도 초기화
        } catch (error) {
            console.error("Error fetching recent posts:", error);
            setOriginalData([]);
            setRecentPostData([]);
        }
    };

    const fetchHotData = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/amadda/posts/amaddabadge');
            const sortedData = response.data.sort((a, b) => b.postId - a.postId); // postId 기준 내림차순 정렬
            setHotPostData(sortedData || []); // 데이터가 없으면 빈 배열로 설정
            console.log('Hot Posts (Sorted by postId):', sortedData);
        } catch (error) {
            console.error("Error fetching hot posts:", error);
            setHotPostData([]); // 오류 발생 시 빈 배열로 설정
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };


    // 데이터 필터
    const filterData = async () => {
        if (originalData.length === 0) {
            console.warn("No data available for filtering");
            return;
        }
    
        setLoading(true);
        let filteredData = [...originalData]; // 항상 originalData를 기준으로 필터링
    
        // Topic 필터
        if (filters.topic.length > 0) {
            try {
                const response = await api_array.get("/api/amadda/posts/topics", {
                    params: { topicNames: filters.topic },
                });
                filteredData = response.data;
            } catch (error) {
                console.error("Error fetching topic data:", error);
            }
        }
    
        // 검색어 필터
        if (filters.searchText && filters.searchText.trim().length > 0) {
            const searchTextLower = filters.searchText.toLowerCase();
            filteredData = filteredData.filter(post =>
                (post.postTitle && post.postTitle.toLowerCase().includes(searchTextLower)) ||
                (post.restaurant?.restaurantName && post.restaurant.restaurantName.toLowerCase().includes(searchTextLower))
            );
        }
    
        // Mood 필터
        if (filters.mood.length > 0) {
            filteredData = filteredData.filter(post => filters.mood.includes(post.mood));
        }
    
        // Verification 필터
        if (filters.verification.length === 1) {
            const verificationValue = filters.verification[0] === "인증";
            filteredData = filteredData.filter(post => post.receiptVerification === verificationValue);
        }
    
        // PinColor 필터
        const pinColors = Array.isArray(filters.pinColor) ? filters.pinColor : [filters.pinColor];
        if (pinColors.length > 0) {
            filteredData = filteredData.filter(post => {
                const totalPost = post.restaurant?.totalPost ?? 0;
                return pinColors.some(color => {
                    switch (color) {
                        case "Black":
                            return totalPost < 50;
                        case "Red":
                            return totalPost >= 50 && totalPost < 100;
                        case "Orange":
                            return totalPost >= 100 && totalPost < 200;
                        case "Blue":
                            return totalPost >= 200 && totalPost < 300;
                        case "Yellow":
                            return totalPost >= 300 && totalPost < 400;
                        case "Purple":
                            return totalPost >= 400;
                        case "Total":
                            return true;
                        default:
                            return false;
                    }
                });
            });
        }
    
        // 데이터 정렬 및 업데이트
        const sortedData = filteredData.sort((a, b) => b.postId - a.postId);
        setRecentPostData(sortedData);
        setLoading(false);
    };
    
    
    useEffect(() => {
        filterData(); // 필터가 변경될 때마다 데이터 요청
    }, [filters]); // filters가 변경될 때마다 fetchData 호출


    return (
        <div>
            <MainHeader />

            {/* 상단 이미지와 카테고리 검색 바 */}
            <Box className="diary-background">
                <Box className="page-title-container">
                    <Box className="page-title">지역별 HOT PIN 맛집</Box>
                    <Box className="page-subject">
                        <Box className="text-subject-1">새로운 맛집 이야기,</Box>
                        <Box className="text-subject-2">핫한 리뷰와 함께 떠나는 미식 여행!</Box>
                        <Box className="text-subject-2-1">당신의 입맛을 만족시킬 핫 핀 맛집!</Box>
                        <Box className="text-subject-2-2">필터로 원하는 맛집을 찾아보세요</Box>
                    </Box>
                </Box>
            </Box>

            {/* 좌측 필터와 우측 메인 콘텐츠 영역 */}
            <Grid container spacing={2} className="diary-content-container">
                {/* 데스크탑 화면에서만 좌측 필터 영역 표시 */}
                {!isMobile && (
                    <Grid item xs={12} md={3} lg={2.5} className="filter-container">
                        <FilterMenu onSearch={handleSearch} />
                    </Grid>
                )}

                {/* 우측 메인 콘텐츠 영역 */}
                <Grid item xs={12} md={9} lg={9.5} className="diary-main-content">
                    {/* 모바일 화면에서 필터 열기 버튼 (Drawer 사용) */}
                    {isMobile && !isDrawerOpen && (
                        <Box display="flex" justifyContent="center" mb={2}>
                            <IconButton
                                onClick={toggleDrawer(true)}
                                style={{
                                    zIndex: 1300,
                                    borderRadius: '50%',
                                    padding: '10px',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    )}
                    <MainRecentDiary data={recentPostData} />
                    <TopHotDiary data={hotPostData} />
                    <MonthPickDiary />
                </Grid>
            </Grid>

            {/* Drawer를 사용하여 모바일 화면에서 필터를 왼쪽에 표시 */}
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: { width: '80%', maxWidth: '300px' }
                }}
            >
                <FilterMenu onSearch={handleSearch} />
            </Drawer>

            <Footer />
        </div>
    );
}

export default DiaryViewPage;
