import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Button, Tooltip } from "@mui/material";
import { BoldEssentionalUiCrownStar } from "../../../../assets/icons/BoldEssentionalUiCrownStar";
import { BoldDuotoneEssentionalUiGift } from "../../../../assets/icons/BoldDuotoneEssentionalUiGift";
import api from "../../../../api/axios";

import "./BottomButtonSection.css";

const BottomButtonSection = ({ userId }) => {
    const [badgeCount, setBadgeCount] = useState(0); //총 뱃지 수
    const [badges, setBadges] = useState([]); // 뱃지 데이터
    const [openBadgeModal, setOpenBadgeModal] = useState(false);  // 모달 열기/닫기 상태
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태
    const [itemsPerPage] = useState(6);  // 한 페이지당 보여줄 뱃지 개수

    const fetchBadgeData = useCallback(async () => {
        try {
            const response = await api.get(`/api/amadda/user/badge/${userId}`);  // 유저의 모든 뱃지 가져오기
            if (response.data) {
                setBadges(response.data);  // 뱃지 리스트 저장
                setBadgeCount(response.data.length || 0);  // 뱃지 개수 업데이트
            }
        } catch (error) {
            console.error("뱃지 데이터를 가져오는 중 오류 발생:", error);
        }
    }, [userId]);

    // 컴포넌트 마운트 시 API 호출
    useEffect(() => {
        fetchBadgeData();
    }, [fetchBadgeData]);

    // 모달 열기/닫기
    const handleBadgeClick = () => setOpenBadgeModal(true);
    const handleCloseModal = () => setOpenBadgeModal(false);

    
    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (direction) => {
        if (direction === "next" && currentPage < Math.ceil(badgeCount / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 현재 페이지에 해당하는 뱃지들만 필터링
    const indexOfLastBadge = currentPage * itemsPerPage;
    const indexOfFirstBadge = indexOfLastBadge - itemsPerPage;
    const currentBadges = badges.slice(indexOfFirstBadge, indexOfLastBadge);

    return (
        <Grid container spacing={2} justifyContent="center" className="bottom-buttons" style={{ cursor: "pointer" }}>
            {/* 아맛따 뱃지 버튼 */}
            <Grid item xs={12} sm={6} md={6} lg={5.9} className="button-container">
                <Box
                    className="badge-button"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                        gap: 2,
                        width: "100%", // 가로 크기 100%
                    }}
                    onClick={handleBadgeClick}  // 클릭 시 모달 열기
                >
                    <BoldEssentionalUiCrownStar sx={{ fontSize: "2rem", color: "#ffc107" }} />
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography sx={{ fontFamily: "font-notosansKR-medium", fontSize: "1.5rem", color: "#666" }}>
                            아맛따 뱃지
                        </Typography>
                        <Typography sx={{ fontFamily: "font-notosansKR-medium", fontSize: "1rem", color: "#666" }}>
                            {badgeCount} / 28
                        </Typography>
                    </Box>
                </Box>
            </Grid>

            {/* 선물하기 버튼 */}
            <Grid item xs={12} sm={6} md={6} lg={5.9} className="button-container">
                <Box
                    className="gift-button"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                        gap: 2,
                        width: "100%", // 가로 크기 100%
                    }}
                >
                    <BoldDuotoneEssentionalUiGift sx={{ fontSize: "2rem", color: "#ff4081" }} />
                    <Typography sx={{ fontFamily: "font-notosansKR-medium", fontSize: "1.5rem", color: "#666" }}>
                        선물하기
                    </Typography>
                </Box>
            </Grid>

            {/* 아맛따 뱃지 모달 */}
            <Dialog
                open={openBadgeModal}
                onClose={handleCloseModal}
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: '#fafafa',  // 모달 배경 색상 변경
                        borderRadius: '16px',  // 모달 테두리 둥글게
                        padding: '20px',  // 여백
                        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',  // 그림자 추가
                    },
                }}
            >
                <DialogTitle sx={{ fontFamily: 'font-notosansKR-medium', fontSize: '1.2rem' }}>보유한 아맛따 뱃지</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {currentBadges.map((badge) => (
                            <Grid item xs={4} key={badge.badgeId}>
                                {/* 뱃지 이미지 및 툴팁 */}
                                <Tooltip 
                                    title={(
                                        <>
                                        <Typography variant="subtitle1" fontWeight="bold">{badge.name}</Typography>
                                        <Typography variant="body2">{badge.badgeDescription}</Typography>
                                        </>
                                    )}
                                    enterDelay={500}  // 툴팁 표시 전 지연 시간
                                    leaveDelay={0}  // 툴팁 사라지는 지연 시간 제거
                                    PopperProps={{
                                        disablePortal: true,
                                    }}
                                    >
                                    <img
                                        src={badge.badgeImage.startsWith("http") ? badge.badgeImage : `http://localhost:7777/img/badges/${badge.badgeImage}`}
                                        alt={badge.badgeName}
                                        style={{
                                        width: "100%",
                                        borderRadius: "12px",
                                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                                        transition: "transform 0.3s ease-in-out",
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                                        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                                    />
                                </Tooltip>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between",  // 가운데와 오른쪽 끝에 배치
                    padding: "0 16px",  // 여백 조정 (선택 사항)
                }}
            >
                {/* 이전 버튼 */}
                <Button
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 1 || badgeCount === 0}
                    color="primary"
                    sx={{
                        flexGrow: 1,  // 버튼이 동일한 크기로 나누어짐
                        backgroundColor: '#9e9e9e',  
                        color: '#fff', 
                        '&:hover': {
                            backgroundColor: '#757575',
                        },
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease, transform 0.3s ease',
                        '&:active': {
                            transform: 'scale(0.98)',
                        },
                        margin: '0 8px',
                    }}
                >
                    이전
                </Button>

                {/* 다음 버튼 */}
                <Button
                    onClick={() => handlePageChange("next")}
                    disabled={currentPage === Math.ceil(badgeCount / itemsPerPage) || badgeCount === 0}
                    color="primary"
                    sx={{
                        flexGrow: 1,  // 버튼이 동일한 크기로 나누어짐
                        backgroundColor: '#9e9e9e',  
                        color: '#fff', 
                        '&:hover': {
                            backgroundColor: '#757575',
                        },
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease, transform 0.3s ease',
                        '&:active': {
                            transform: 'scale(0.98)',
                        },
                        margin: '0 8px',
                    }}
                >
                    다음
                </Button>

                {/* 닫기 버튼 (오른쪽 끝으로 배치) */}
                <Button
                    onClick={handleCloseModal}
                    color="primary"
                    sx={{
                        backgroundColor: '#9e9e9e',  
                        color: '#fff', 
                        '&:hover': {
                            backgroundColor: '#757575',
                        },
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease, transform 0.3s ease',
                        '&:active': {
                            transform: 'scale(0.98)',
                        },
                        margin: '0 8px',
                    }}
                >
                    닫기
                </Button>
            </DialogActions>

            </Dialog>
        </Grid>
    );
};

export default BottomButtonSection;
