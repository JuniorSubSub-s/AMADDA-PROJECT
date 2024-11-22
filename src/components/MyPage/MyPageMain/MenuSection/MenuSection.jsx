import React from "react";
import { Box, Divider, Typography } from "@mui/material";

import "./MenuSection.css";
import { useNavigate } from "react-router-dom";

function MenuSection  ({ userId })  {

    const navigate = useNavigate();

    const handleUserInfoClick = () => {
        navigate(`/amadda/myPage/user-info/${userId}`);
    };

    const hadleUserPinMapClick = () => {
        navigate(`/amadda/myPage/user-pinMap/${userId}`);
    };

    const handleUserMyCalendar = () => {
        navigate(`/amadda/myPage/myCalendar/${userId}`);
    };

    return (
        <Box
            className="mainPage-menu-section"
            sx={{ maxWidth: "1050px", margin: "0 auto", marginBottom: 4 }}
        >
            <Divider />
            <Box    sx={{ paddingY: 1 }}
                    onClick={handleUserInfoClick}
                    style={{ cursor: "pointer" }}>
                <Typography variant="body1" sx={{ fontFamily: "font-notosansKR-medium" }}>
                    회원 정보 관리
                </Typography>
            </Box>
            <Divider />
            <Box    sx={{ paddingY: 1 }}
                    onClick={hadleUserPinMapClick}
                    style={{ cursor: "pointer" }}>
                <Typography variant="body1" sx={{ fontFamily: "font-notosansKR-medium" }}>나의 핀 맵 보기</Typography>
            </Box>
            <Divider />
            <Box    sx={{ paddingY: 1 }}
                    onClick={handleUserMyCalendar}>
                <Typography variant="body1" sx={{ fontFamily: "font-notosansKR-medium" }}>나의 맛캘린더 관리</Typography>
            </Box>
            <Divider />
        </Box>
    );
};

export default MenuSection;
