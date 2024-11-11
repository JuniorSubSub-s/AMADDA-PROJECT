import DiaryPostItem from "../../components/DiaryViewPage/DisaryPostItem/DiaryPostItem";
import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import "../../ui/DiaryViewPage/mainrecentdiary.css";

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
            <Grid container
                spacing={2}
                className="post-group"
                justifyContent="center">
                {(showingFirstPage ? firstPageData : secondPageData).map((data, index) => (
                    <Grid item xs={12} sm={8} md={4} lg={3} key={index}>
                        <div className={`card-item ${animate ? 'fade-in' : ''} delay-${index}`}>
                            <DiaryPostItem data={data} />
                        </div>
                    </Grid>
                ))}
            </Grid>

            {/* 버튼 */}
            <Grid container spacing={2} justifyContent="center" className="diary-btn-container">
                <Button className="recent-more-btn" onClick={handleMoreClick}>
                    더 보기
                </Button>
                <Button className="recent-back-btn">되돌리기</Button>
            </Grid>
        </Box>
    );
}

export default MainRecentDiary;
