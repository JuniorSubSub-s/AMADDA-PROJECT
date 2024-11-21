import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DiaryPostItem from "../../components/DiaryViewPage/DisaryPostItem/DiaryPostItem";
import "../../ui/DiaryViewPage/mainrecentdiary.css";

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

    return (
        <Box className="recentDiary-container">
            <Grid container spacing={1} className="recent-title-container">
                <Typography className="recent-title">AMADDA<br />맛집 방문 일기</Typography>
                <div className="recent-title-underbar" />
            </Grid>

            {/* 게시글 목록 */}
            <Grid container spacing={2} className="post-group" justifyContent="center">
                {currentData.map((item, index) => (
                    <Grid item xs={12} sm={8} md={4} lg={3} key={index}>
                        <DiaryPostItem data={item} />
                    </Grid>
                ))}
            </Grid>

            {/* 버튼 */}
            <Grid container spacing={2} justifyContent="center" className="diary-btn-container">
                <Button className="recent-back-btn" onClick={handlePreviousPage}>되돌리기</Button>
                <Button className="recent-more-btn" onClick={handleNextPage}>더 보기</Button>  
            </Grid>
        </Box>
    );
}

export default MainRecentDiary;
