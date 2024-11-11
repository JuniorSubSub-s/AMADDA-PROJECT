import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import DiaryPostItem from "../../components/DiaryViewPage/DisaryPostItem/DiaryPostItem";
import "../../ui/DiaryViewPage/tophotdiary.css";

function TopHotDiary() {

    // 예시 데이터 배열 (반복 렌더링할 데이터)
    const postData = [
        // { userName: 'User1', diaryTitle: 'DiaryTitle', isReceiptVerified: true, pinColor: 'YELLOW' },
        // { userName: 'User2', diaryTitle: 'DiaryTitle', isReceiptVerified: false, pinColor: 'RED' },
        // { userName: 'User3', diaryTitle: 'DiaryTitle', isReceiptVerified: true, pinColor: 'BLUE' },
        // { userName: 'User4', diaryTitle: 'DiaryTitle', isReceiptVerified: false, pinColor: 'PURPLE' },
        // { userName: 'User5', diaryTitle: 'DiaryTitle', isReceiptVerified: true, pinColor: 'RED' },
        // { userName: 'User6', diaryTitle: 'DiaryTitle', isReceiptVerified: false, pinColor: 'BLUE' },
        // { userName: 'User7', diaryTitle: 'DiaryTitle', isReceiptVerified: true, pinColor: 'YELLOW' },
        // { userName: 'User8', diaryTitle: 'DiaryTitle', isReceiptVerified: false, pinColor: 'RED' },
    ];
    // 상태 변수 정의
    const [showingFirstPage, setShowingFirstPage] = useState(true);
    const [animate, setAnimate] = useState(false);

    // 예시 데이터 배열 (반복 렌더링할 데이터)
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

    // 페이지 변경 핸들러
    const handleMoreClick = () => {
        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
            setShowingFirstPage(!showingFirstPage);
        }, 500); // 애니메이션 시간 설정
    };

    return (
        <Box className="hotTopDiary-container">
            <Grid container spacing={1} className="topHot-title-container">
                <Typography className="topHot-title">맛잘알 회원들의 Top Hot 맛집 일기</Typography>
                <div className="topHot-title-underbar" />
            </Grid>

            {/* 게시글 목록 */}
            <Grid container spacing={2} className="post-group" justifyContent="center">
                {(showingFirstPage ? firstPageData : secondPageData).map((data, index) => (
                    <Grid item xs={12} sm={8} md={4} lg={3} key={index}>
                        <div className={`card-item ${animate ? 'fade-in' : ''} delay-${index}`}>
                            <DiaryPostItem data={data} />
                        </div>
                    </Grid>
                ))}
            </Grid>

            {/* 버튼 */}
            <Grid container spacing={2} justifyContent="center" className="topHot-btn-container">
                <Button className="topHot-more-btn" onClick={handleMoreClick}>더 보기</Button>
                <Button className="topHot-back-btn" onClick={() => setShowingFirstPage(true)}>되돌리기</Button>
            </Grid>
        </Box>
    );
}

export default TopHotDiary;
