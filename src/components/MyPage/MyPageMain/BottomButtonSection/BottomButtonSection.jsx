import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Button, Tooltip } from "@mui/material";
import { BoldEssentionalUiCrownStar } from "../../../../assets/icons/BoldEssentionalUiCrownStar";
import { BoldDuotoneEssentionalUiGift } from "../../../../assets/icons/BoldDuotoneEssentionalUiGift";
import api from "../../../../api/axios";

import "./BottomButtonSection.css";

const BottomButtonSection = ({ userId }) => {
    const [badgeCount, setBadgeCount] = useState(0);
    const [badges, setBadges] = useState([]);
    const [openBadgeModal, setOpenBadgeModal] = useState(false);  // 모달 열기/닫기 상태

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

    useEffect(() => {
        fetchBadgeData();
    }, [fetchBadgeData]);

    // 아맛따 뱃지 버튼 클릭 시 모달 열기
    const handleBadgeClick = () => {
        setOpenBadgeModal(true);
    };

    // 모달 닫기
    const handleCloseModal = () => {
        setOpenBadgeModal(false);
    };

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
                            {badgeCount} / 29
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
            <Dialog open={openBadgeModal} onClose={handleCloseModal}>
                <DialogTitle>보유한 아맛따 뱃지</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {badges.map((badge) => (
                            <Grid item xs={4} key={badge.badgeId}>
                                {/* 뱃지 이미지 및 툴팁 */}
                                <Tooltip title={
                                    <>
                                        <Typography variant="subtitle1" fontWeight="bold">{badge.name}</Typography>
                                        <Typography variant="body2">{badge.badgeDescription}</Typography>
                                    </>
                                }>
                                    <img
                                            src={badge.badgeImage.startsWith("http") ? badge.badgeImage : `http://localhost:7777/img/badges/${badge.badgeImage}`}
                                            alt={badge.badgeName}
                                            style={{
                                                width: "100%",
                                                borderRadius: "8px",
                                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                                            }}
                                            onError={(e) => {
                                                console.error("이미지 로드 오류:", e.target.src); // 이미지 로드 실패시 에러 로그 출력
                                            }}
                                        />
                                </Tooltip>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default BottomButtonSection;
