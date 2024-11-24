import MenuIcon from "@mui/icons-material/Menu";
import { Box, Drawer, Grid, IconButton, useMediaQuery } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";

import FilterMenu from "../../components/DiaryViewPage/DiaryFilter/FilterMenu";
import Footer from "../Foorter/Footer";
import MainHeader from "../Header/MainHeader";
import MainRecentDiary from "./MainRecentDiary";
import MonthPickDiary from "./MonthPickDiary";
import TopHotDiary from "./TopHotDiary";

import api from "../../api/axios";
import "../../ui/DiaryViewPage/DiaryViewPage.css";

function DiaryViewPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const isMobile = useMediaQuery("(max-width:900px)");

    const [filters, setFilters] = useState({
        searchText: "",
        mood: [],
        verification: [],
        pinColor: [],
        topic: [],
    });

    // Drawer toggle
    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    // API 요청 유틸리티
    const fetchPosts = useCallback(async (endpoint, params = {}) => {
        try {
            const response = await api.get(`${endpoint}`, { params });
            return response.data;
        } catch (error) {
            console.error(`Error fetching data from ${endpoint}:`, error);
            return [];
        }
    }, []);

    // 초기 데이터 로드
    const fetchInitialData = useCallback(async () => {
        setLoading(true);
        const initialData = await fetchPosts("/api/amadda/posts/latest");
        setPostData(initialData || []);
        setLoading(false);
    }, [fetchPosts]);

    // 필터 데이터를 기반으로 게시물 필터링
    const filterData = useCallback(async () => {
        setLoading(true);

        const requests = [
            filters.searchText &&
            fetchPosts("/api/amadda/posts/searchText", { searchText: filters.searchText }),
            filters.mood.length > 0 &&
            fetchPosts("/api/amadda/posts/mood", { moods: filters.mood }),
            filters.verification.length > 0 &&
            fetchPosts("/api/amadda/posts/verification", {
                receiptVerification: filters.verification[0] === "인증",
            }),
            filters.pinColor.length > 0 &&
            fetchPosts("/api/amadda/posts/pinColor", { color: filters.pinColor }),
            filters.topic.length > 0 &&
            fetchPosts("/api/amadda/posts/topics", { topicNames: filters.topic }),
        ].filter(Boolean);

        try {
            if (requests.length === 0) {
                // 필터가 비어 있으면 초기 데이터로 돌아감
                fetchInitialData();
                return;
            }

            const results = await Promise.all(requests);
            const filteredIds = results.reduce(
                (intersection, current) =>
                    intersection.filter((id) => current.some((post) => post.postId === id)),
                results[0]?.map((post) => post.postId) || []
            );

            if (filteredIds.length > 0) {
                const filteredData = await fetchPosts(`/api/amadda/posts/${filteredIds.join(",")}`);
                setPostData(filteredData || []);
            } else {
                setPostData([]);
            }
        } catch (error) {
            console.error("Error filtering posts:", error);
        } finally {
            setLoading(false);
        }
    }, [filters, fetchPosts, fetchInitialData]);

    // 필터 변경 처리
    const handleFiltersChange = useCallback(
        (newFilters) => {
            setFilters((prev) => ({ ...prev, ...newFilters }));
        },
        [setFilters]
    );

    // 컴포넌트 마운트 시 초기 데이터 로드
    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    // 필터 변경 시 게시물 재필터링
    useEffect(() => {
        filterData();
    }, [filters, filterData]);

    return (
        <div>
            <MainHeader />

            {/* 상단 배경 및 제목 */}
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

            {/* 메인 콘텐츠 및 필터 */}
            <Grid container spacing={2} className="diary-content-container">
                {!isMobile && (
                    <Grid item xs={12} md={3} lg={2.5} className="filter-container">
                        <FilterMenu onSearch={handleFiltersChange} />
                    </Grid>
                )}
                <Grid item xs={12} md={9} lg={9.5} className="diary-main-content">
                    {isMobile && !isDrawerOpen && (
                        <Box display="flex" justifyContent="center" mb={2}>
                            <IconButton
                                onClick={toggleDrawer(true)}
                                style={{
                                    zIndex: 1300,
                                    borderRadius: "50%",
                                    padding: "10px",
                                    backgroundColor: "#fff",
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    )}
                    <MainRecentDiary data={postData} loading={loading} />
                    <TopHotDiary />
                    <MonthPickDiary />
                </Grid>
            </Grid>

            {/* Drawer를 사용하여 모바일 화면에서 필터 표시 */}
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: { width: "80%", maxWidth: "300px" },
                }}
            >
                <FilterMenu onSearch={handleFiltersChange} />
            </Drawer>

            <Footer />
        </div>
    );
}

export default DiaryViewPage;
