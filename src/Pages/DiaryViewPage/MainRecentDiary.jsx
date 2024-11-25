import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useMemo, useCallback } from "react";
import DiaryPostItem from "../../components/DiaryViewPage/DisaryPostItem/DiaryPostItem";
import "../../ui/DiaryViewPage/mainrecentdiary.css";

function MainRecentDiary({ data = [] }) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [isFlipping, setIsFlipping] = React.useState(false); // 카드 뒤집기 상태
    const itemsPerPage = 4;

    const currentData = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return data.slice(indexOfFirstItem, indexOfLastItem);
    }, [data, currentPage, itemsPerPage]);

    const handlePageChange = useCallback(
        (direction) => {
            setIsFlipping(true);
            setTimeout(() => {
                setIsFlipping(false);
                setCurrentPage((prevPage) => prevPage + direction);
            }, 180 * (itemsPerPage - 1)); // 카드 순차 애니메이션 시간 계산
        },
        [itemsPerPage]
    );

    const handleNextPage = useCallback(() => {
        if (currentPage * itemsPerPage < data.length) {
            handlePageChange(1);
        }
    }, [currentPage, data.length, itemsPerPage, handlePageChange]);

    const handlePreviousPage = useCallback(() => {
        if (currentPage > 1) {
            handlePageChange(-1);
        }
    }, [currentPage, handlePageChange]);

    return (
        <Box className="recentDiary-container">
            {/* 제목 */}
            <Grid container spacing={1} className="recent-title-container">
                <Typography className="recent-title" sx={{ wordBreak: "break-word", width: "100%" }}>
                    <p className="recent-title-amadda">AMADDA🐷</p>
                    <p className="recent-title-diary">맛집 방문 일기</p>
                </Typography>
                <p className="recent-title-now">지금 올라오는 따끈따끈한 맛집 정보</p>
                <div className="recent-title-underbar" />
            </Grid>

            {/* 게시글 목록 */}
            <Grid container spacing={2} className={`post-group ${isFlipping ? "flipping" : ""}`} justifyContent="center">
                {currentData.map((item, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={4}
                        lg={3}
                        key={index}
                        className={`card-item ${isFlipping ? `delay-${index}` : "fade-in"}`}
                    >
                        <DiaryPostItem data={item} />
                    </Grid>
                ))}
            </Grid>

            {/* 버튼 */}
            <Grid container spacing={2} justifyContent="center" className="diary-btn-container">
                <Button
                    className="recent-back-btn"
                    onClick={handlePreviousPage}
                    disabled={currentPage <= 1 || isFlipping}
                >
                    되돌리기
                </Button>
                <Button
                    className="recent-more-btn"
                    onClick={handleNextPage}
                    disabled={currentPage * itemsPerPage >= data.length || isFlipping}
                >
                    더 보기
                </Button>
            </Grid>
        </Box>
    );
}

export default MainRecentDiary;
