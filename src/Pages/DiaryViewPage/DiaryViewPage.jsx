import React, { useState, useEffect } from "react";
import { useMediaQuery, IconButton, Grid, Box, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import MainHeader from "../Header/MainHeader";
import Footer from "../Foorter/Footer";
import MainRecentDiary from "./MainRecentDiary";
import TopHotDiary from "./TopHotDiary";
import MonthPickDiary from "./MonthPickDiary";
import FilterMenu from "../../components/DiaryViewPage/DiaryFilter/FilterMenu";

import "../../ui/DiaryViewPage/DiaryViewPage.css";
import api from "../../api/axios";
import axios from 'axios';

function DiaryViewPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:900px)');
    const [selectedMoods, setSelectedMoods] = useState([]);
    const [selectedVerification, setSelectedVerification] = useState([]);
    const [selectedPinColor, setSelectedPinColor] = useState(null);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [postData, setPostData] = useState([]);

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    // 인증 여부에 따른 데이터 요청

    const handleVerificationChange = async (selectedVerification) => {
        setSelectedVerification(selectedVerification);
    };

    useEffect(() => {
        getPostDataByVerification();
    }, [selectedVerification]); 

    const getPostDataByVerification = async () => {
        if (selectedVerification.length === 1) {
            const receiptVerification = selectedVerification[0] === "인증";
            
            try {
                const response = await api.get('/api/amadda/posts/verification', {
                    params: { receiptVerification },
                });
                setPostData(response.data); 
                console.log(response.data); 
            } catch (error) {
                console.error("Error fetching verification-filtered posts:", error);
            }
        }else{
            fetchData();
        }
    };

    // 기분에 따른 데이터 요청

    const handleMoodChange = (moods) => {
        setSelectedMoods(moods);
    };

    useEffect(() => {
        getPostDataByMoods();
    }, [selectedMoods]); 

    const api_mood = axios.create({
        baseURL: 'http://localhost:8080', // API의 기본 URL
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

    const getPostDataByMoods = async () => {
        if (selectedMoods.length > 0) {
            try {
                const response = await api_mood.get('/api/amadda/posts/mood', {
                    params: { moods: selectedMoods },
                });
                setPostData(response.data);
                console.log(response.data); 
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }else{
            fetchData();
        }
    };

    // 검색어에 따른 데이터 요청

    const getPostBySearchText = async (searchText) => {
        try {
            const response = await api.get('/api/amadda/posts/searchText', {
                params: { searchText },
            });
            setPostData(response.data); // 검색 결과 업데이트
            console.log('Fetched Posts:', response.data); // 콘솔에 로그 출력
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행

    const fetchData = async () => {
        try {
            const response = await api.get('/api/amadda/posts/latest', {});
            setPostData(response.data); // 검색 결과 업데이트
            console.log('Fetched Posts:', response.data); 
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // 핀 색에 따른 데이터 요청

    const handlePinColorChange = (pinColorValue) => {
        setSelectedPinColor(pinColorValue);
    };
    
    useEffect(() => {
        if (selectedPinColor !== null) {
            getPostsByPinColor(selectedPinColor);
        }
    }, [selectedPinColor]);

    const getPostsByPinColor = async (pinColorValue) => {
        console.log(pinColorValue);
        try {
            const response = await api.get('/api/amadda/posts/pinColor', {
                params: { color: pinColorValue }
            });
            setPostData(response.data);
            console.log('Fetched Posts:', response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // 주제에 따른 데이터 요청
    const handleTopicChange = (selected) => {
        setSelectedTopics(selected); 
        
    };

    useEffect(() => {
        console.log(selectedTopics);
        getPostDataByTopics();
    }, [selectedTopics]); 

    const api_topic = axios.create({
        baseURL: 'http://localhost:8080', // API의 기본 URL
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

    const getPostDataByTopics = async () => {
        if (selectedTopics.length > 0) {
            try {
                const response = await api_topic.get('/api/amadda/posts/tags', {
                    params: { tagNames: selectedTopics },
                });
                setPostData(response.data);
                console.log(response.data); 
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }else{
            fetchData();
        }
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
                        <FilterMenu onMoodChange={handleMoodChange} onSearch={getPostBySearchText}
                                    onVerificationChange={handleVerificationChange}
                                    onPinColorChange={handlePinColorChange}
                                    onTopicChange={handleTopicChange} />
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
                <FilterMenu onMoodChange={handleMoodChange} onSearch={getPostBySearchText}
                            onVerificationChange={handleVerificationChange}
                            onPinColorChange={handlePinColorChange}
                            onTopicChange={handleTopicChange} />
            </Drawer>

            <Footer />
        </div>
    );
}

export default DiaryViewPage;
