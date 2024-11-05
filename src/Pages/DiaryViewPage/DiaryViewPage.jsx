import React, { useState } from "react";
import { useMediaQuery, IconButton, Grid, Box, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import MainHeader from "../Header/MainHeader";
import Footer from "../Foorter/Footer";
import MainRecentDiary from "./MainRecentDiary";
import TopHotDiary from "./TopHotDiary";
import MonthPickDiary from "./MonthPickDiary";
import FilterMenu from "../../components/DiaryViewPage/DiaryFilter/FilterMenu";

import "../../ui/DiaryViewPage/DiaryViewPage.css";

function DiaryViewPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:900px)');

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
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
                        <FilterMenu />
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
                    <MainRecentDiary />
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
                <FilterMenu />
            </Drawer>

            <Footer />
        </div>
    );
}

export default DiaryViewPage;
