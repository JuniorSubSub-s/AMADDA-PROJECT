import DiaryPostItem from "../../components/DiaryViewPage/DisaryPostItem/DiaryPostItem";
import { Grid, Box, Typography, Button } from '@mui/material';
import "../../ui/DiaryViewPage/mainrecentdiary.css";

function MainRecentDiary() {
    // 예시 데이터 배열 (반복 렌더링할 데이터)
    const postData = [
        { userName: 'User1', diaryTitle: 'DiaryTitle', isReceiptVerified: true, pinColor: 'YELLOW' },
        { userName: 'User2', diaryTitle: 'DiaryTitle', isReceiptVerified: false, pinColor: 'RED' },
        { userName: 'User3', diaryTitle: 'DiaryTitle', isReceiptVerified: true, pinColor: 'BLUE' },
        { userName: 'User4', diaryTitle: 'DiaryTitle', isReceiptVerified: false, pinColor: 'PURPLE' },
        { userName: 'User5', diaryTitle: 'DiaryTitle', isReceiptVerified: true, pinColor: 'RED' },
        { userName: 'User6', diaryTitle: 'DiaryTitle', isReceiptVerified: false, pinColor: 'BLUE' },
        { userName: 'User7', diaryTitle: 'DiaryTitle', isReceiptVerified: true, pinColor: 'YELLOW' },
        { userName: 'User8', diaryTitle: 'DiaryTitle', isReceiptVerified: false, pinColor: 'RED' },
    ];

    return (
        <Box className="recentDiary-container">
            <Grid container spacing={1} className="recent-title-container">
                <Typography className="recent-title">AMADDA<br/>맛집 방문 일기</Typography>
                <div className="recent-title-underbar" />
            </Grid>

            {/* 게시글 목록 */}
            <Grid   container 
                    spacing={2} 
                    className="post-group" 
                    justifyContent="center">
                {postData.map((data, index) => (
                    <Grid item xs={12} sm={8} md={4} lg={3} key={index}>
                        <DiaryPostItem data={data} />
                    </Grid>
                ))}
            </Grid>

            {/* 버튼 */}
            <Grid   container spacing={2} 
                    justifyContent="center" 
                    className="diary-btn-container">
                <Button className="recent-more-btn">더 보기</Button>
                <Button className="recent-back-btn">되돌리기</Button>
            </Grid>
        </Box>
    );
}

export default MainRecentDiary;
