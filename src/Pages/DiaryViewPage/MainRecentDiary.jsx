import React, { useState, useEffect } from 'react';
import DiaryPostItem from "../../components/DiaryViewPage/DisaryPostItem/DiaryPostItem";
import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import "../../ui/DiaryViewPage/mainrecentdiary.css";

<<<<<<< HEAD
function MainRecentDiary({ data = [] }) {
    // 현재 페이지 상태
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // 페이지당 보여줄 아이템 수

    // 현재 페이지의 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    // 페이지 증가 함수
    const handleNextPage = () => {
        if (indexOfLastItem < data.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    // 페이지 감소 함수
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };
=======
function MainRecentDiary() {

    const [showingFirstPage, setShowingFirstPage] = useState(true);
    const [animate, setAnimate] = useState(false);

    const handleMoreClick = () => {
        setAnimate(false);
        setTimeout(() => {
            setShowingFirstPage(!showingFirstPage);
            setAnimate(true);
        }, 500);
    };

    useEffect(() => {
        setAnimate(true);
    }, []);

    const firstPageData = [
        { userName: 'User1', diaryTitle: 'DiaryTitle', isReceiptVerified: true, pinColor: 'YELLOW' },
        { userName: 'User2', diaryTitle: 'DiaryTitle', isReceiptVerified: false, pinColor: 'RED' },
        { userName: 'User3', diaryTitle: 'DiaryTitle', isReceiptVerified: true, pinColor: 'BLUE' },
        { userName: 'User4', diaryTitle: 'DiaryTitle', isReceiptVerified: false, pinColor: 'PURPLE' },
        { userName: 'User5', diaryTitle: 'DiaryTitle', isReceiptVerified: true, pinColor: 'RED' },
        { userName: 'User6', diaryTitle: 'DiaryTitle', isReceiptVerified: false, pinColor: 'BLUE' },
        { userName: 'User7', diaryTitle: 'DiaryTitle', isReceiptVerified: true, pinColor: 'YELLOW' },
        { userName: 'User8', diaryTitle: 'DiaryTitle', isReceiptVerified: false, pinColor: 'RED' },
    ];
>>>>>>> 65ab65c0eafc6ae29c51218780513d0e319ea496

    const secondPageData = [
        { userName: 'User9', diaryTitle: 'DiaryTitle9', isReceiptVerified: true, pinColor: 'GREEN' },
        { userName: 'User10', diaryTitle: 'DiaryTitle10', isReceiptVerified: false, pinColor: 'ORANGE' },
        { userName: 'User11', diaryTitle: 'DiaryTitle11', isReceiptVerified: true, pinColor: 'CYAN' },
        { userName: 'User12', diaryTitle: 'DiaryTitle12', isReceiptVerified: false, pinColor: 'PINK' },
        { userName: 'User13', diaryTitle: 'DiaryTitle13', isReceiptVerified: true, pinColor: 'GREEN' },
        { userName: 'User14', diaryTitle: 'DiaryTitle14', isReceiptVerified: false, pinColor: 'ORANGE' },
        { userName: 'User15', diaryTitle: 'DiaryTitle15', isReceiptVerified: true, pinColor: 'CYAN' },
        { userName: 'User16', diaryTitle: 'DiaryTitle16', isReceiptVerified: false, pinColor: 'PINK' },
    ];

    return (
        <Box className="recentDiary-container">
            <Grid container spacing={1} className="recent-title-container">
                <Typography className="recent-title">AMADDA<br />맛집 방문 일기</Typography>
                <div className="recent-title-underbar" />
            </Grid>

            {/* 게시글 목록 */}
<<<<<<< HEAD
            <Grid container spacing={2} className="post-group" justifyContent="center">
                {currentData.map((item, index) => (
                    <Grid item xs={12} sm={8} md={4} lg={3} key={index}>
                        <DiaryPostItem data={item} />
=======
            <Grid container
                spacing={2}
                className="post-group"
                justifyContent="center">
                {(showingFirstPage ? firstPageData : secondPageData).map((data, index) => (
                    <Grid item xs={12} sm={8} md={4} lg={3} key={index}>
                        <div className={`card-item ${animate ? 'fade-in' : ''} delay-${index}`}>
                            <DiaryPostItem data={data} />
                        </div>
>>>>>>> 65ab65c0eafc6ae29c51218780513d0e319ea496
                    </Grid>
                ))}
            </Grid>

            {/* 버튼 */}
            <Grid container spacing={2} justifyContent="center" className="diary-btn-container">
<<<<<<< HEAD
                <Button className="recent-back-btn" onClick={handlePreviousPage}>되돌리기</Button>
                <Button className="recent-more-btn" onClick={handleNextPage}>더 보기</Button>  
=======
                <Button className="recent-more-btn" onClick={handleMoreClick}>
                    더 보기
                </Button>
                <Button className="recent-back-btn">되돌리기</Button>
>>>>>>> 65ab65c0eafc6ae29c51218780513d0e319ea496
            </Grid>
        </Box>
    );
}

export default MainRecentDiary;
