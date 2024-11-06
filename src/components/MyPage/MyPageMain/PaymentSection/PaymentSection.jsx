import React from "react";
import { Box, Typography } from "@mui/material";

import "./PaymentSection.css";

const PaymentSection = () => {
    return (
        <Box
            className="mainPage-payment-section">
            {/* 라벨 섹션 */}
            <Box className="label-section">
                <Box className="label amc-label" sx={{ fontFamily: "font-notosansKR-light" }}>아맛따 AMC</Box>
                <Box className="label event-label" sx={{ fontFamily: "font-notosansKR-light" }}>COIN EVENT</Box>
            </Box>

            {/* 결제 내역 타이틀 */}
            <Typography variant="h6" className="payment-title">
                마지막 결제 내역
            </Typography>

            {/* 결제 내역 정보 */}
            <Box className="payment-info">
                <Typography variant="body1" className="payment-description">
                    가을 테마 (이인섭)
                </Typography>
                <Typography variant="body1" className="payment-amount">
                    3000 AC
                </Typography>
            </Box>

            {/* AC 포인트 섹션 */}
            <Box className="points-section">
                <Typography variant="h5" className="points-amount">
                    2000 AC
                </Typography>
                <Typography className="points-arrow">〉</Typography>
            </Box>
        </Box>
    );
};

export default PaymentSection;
