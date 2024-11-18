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
    const [postData, setPostData] = useState([]);
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
        fetchData();
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행

    // 서버에서 최신 포스트 가져오기
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api_array.get('/api/amadda/posts/latest', {});
            setPostData(response.data || []); // 데이터가 없으면 빈 배열로 설정
            console.log('Fetched Posts:', response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setPostData([]); // 오류 발생 시 빈 배열로 설정
        } finally {
            setLoading(false); // 로딩 상태 종료
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

        setLoading(true); // 로딩 상태 시작
        
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
                    params: { topicNames: filters.topic },
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
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        } else {
            setPostData([]); // 교집합이 비어 있으면 빈 배열로 업데이트
            setLoading(false);
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
                    <MainRecentDiary data={postData} />
                    <TopHotDiary />
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
                <FilterMenu onSearch={handleSearch}/>
            </Drawer>

            <Footer />
        </div>
    );
}
export default DiaryViewPage;
