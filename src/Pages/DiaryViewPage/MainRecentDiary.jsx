import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useMemo, useCallback } from "react";
import DiaryPostItem from "../../components/DiaryViewPage/DisaryPostItem/DiaryPostItem";
import "../../ui/DiaryViewPage/mainrecentdiary.css";

function MainRecentDiary({ data = [] }) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 4; // 페이지당 아이템 수

    // 현재 페이지의 데이터 캐싱
    const currentData = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return data.slice(indexOfFirstItem, indexOfLastItem);
    }, [data, currentPage, itemsPerPage]);

    // 페이지 이동 핸들러
    const handleNextPage = useCallback(() => {
        if (currentPage * itemsPerPage < data.length) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }, [currentPage, data.length, itemsPerPage]);

    const handlePreviousPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    }, [currentPage]);

    return (
        <Box className="recentDiary-container">
            {/* 제목 영역 */}
            <Grid container spacing={1} className="recent-title-container">
                <Typography className="recent-title">
                    AMADDA
                    <br />
                    맛집 방문 일기
                </Typography>
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
                <Button
                    className="recent-back-btn"
                    onClick={handlePreviousPage}
                    disabled={currentPage <= 1}
                >
                    되돌리기
                </Button>
                <Button
                    className="recent-more-btn"
                    onClick={handleNextPage}
                    disabled={currentPage * itemsPerPage >= data.length}
                >
                    더 보기
                </Button>
            </Grid>
        </Box>
    );
}

export default MainRecentDiary;
