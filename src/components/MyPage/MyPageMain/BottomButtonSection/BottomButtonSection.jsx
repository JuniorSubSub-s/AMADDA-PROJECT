import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { BoldEssentionalUiCrownStar } from "../../../../assets/icons/BoldEssentionalUiCrownStar";
import { BoldDuotoneEssentionalUiGift } from "../../../../assets/icons/BoldDuotoneEssentionalUiGift";
import api from "../../../../api/axios";

import "./BottomButtonSection.css";

const BottomButtonSection = ({ userId }) => {
    const [badgeCount, setBadgeCount] = useState(0);
    const [openBadgeModal, setOpenBadgeModal] = useState(false);  // 모달 열기/닫기 상태

    // fetchBadgeCount 함수를 useCallback으로 감싸서 의존성 배열을 관리
    const fetchBadgeCount = useCallback(async () => {
        try {
            const response = await api.get(`/api/amadda/user/${userId}`);
            if (response.data) {
                setBadgeCount(response.data.badgeCount || 0);
            }
        } catch (error) {
            console.error("배지 카운트를 가져오는 중 오류 발생:", error);
        }
    }, [userId]);

    useEffect(() => {
        fetchBadgeCount();
    }, [fetchBadgeCount]);

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
                    <Typography>
                            뱃지 이미지 넣기 !
                    </Typography>
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
