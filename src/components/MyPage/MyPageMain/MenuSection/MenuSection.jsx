import React from "react";
import { Box, Divider, Typography } from "@mui/material";

import "./MenuSection.css";
import { useNavigate } from "react-router-dom";

function MenuSection({ userId }) {

    const navigate = useNavigate();

    // 메뉴 항목 정의
    const menuItems = [
        { label: "회원 정보 관리", path: `/amadda/myPage/user-info/${userId}` },
        { label: "나의 핀 맵 보기", path: `/amadda/myPage/user-pinMap/${userId}` },
        { label: "나의 맛캘린더 관리", path: `/amadda/myPage/myCalendar/${userId}` },
    ];

    // 클릭 이벤트 헨들러
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Box
            className="mainPage-menu-section"
            sx={{ maxWidth: "1200px", margin: "0 auto", marginBottom: 4 }}
        >
            {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                    <Box
                        sx={{ paddingY: 1 }}
                        onClick={() => handleNavigation(item.path)}
                        style={{ cursor: "pointer" }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ fontFamily: "font-notosansKR-medium", marginLeft: 4 }}
                        >
                            {item.label}
                        </Typography>
                    </Box>
                    {index < menuItems.length - 1 && <Divider />}
                </React.Fragment>
            ))}
        </Box>
    );
};

export default React.memo(MenuSection);
