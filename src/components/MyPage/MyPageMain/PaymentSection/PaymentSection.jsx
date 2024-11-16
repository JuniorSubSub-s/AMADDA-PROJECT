import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import api from "../../../../api/axios";

import "./PaymentSection.css";

const PaymentSection = ({ userId }) => {
    const [currencyBalance, setCurrencyBalance] = useState(0); // 보유 코인 상태

    // userId가 변경될 때마다 API 호출
    useEffect(() => {
        const fetchCurrencyBalance = async () => {
            try {
                const response = await api.get(`/api/amadda/user/${userId}`);
                // 응답 데이터에서 CurrencyBalance가 존재하면 설정, 없으면 0으로 설정
                const balance = response.data.currencyBalance;
                setCurrencyBalance(balance != null && !isNaN(balance) ? balance : 0);
            } catch (error) {
                console.error("보유 코인을 가져오는 중 오류 발생:", error);
                setCurrencyBalance(0); // 오류 발생 시 기본값을 0으로 설정
            }
        };

        if (userId) {
            fetchCurrencyBalance(); // userId가 유효할 경우에만 호출
        }
    }, [userId]); // userId가 변경될 때마다 호출

    return (
        <Box className="mainPage-payment-section">
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
                    보유 코인: {currencyBalance} AC {/* 가져온 보유 코인 값 표시 */}
                </Typography>
                <Typography className="points-arrow">〉</Typography>
            </Box>
        </Box>
    );
};

export default PaymentSection;
