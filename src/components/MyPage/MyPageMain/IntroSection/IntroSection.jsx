import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import api from "../../../../api/axios";

import "./IntroSection.css";

function IntroSection( {userId, forceUpdate }) {
    const [introduction, setIntroduction] = useState("");

    useEffect(() => {
        // 사용자 ID에 따라 소개글을 가져오는 API 호출
        const fetchIntroduction = async () => {
          try {
            const response = await api.get(`/api/amadda/user/${userId}`);
            // 응답 데이터에서 소개글을 설정
            setIntroduction(response.data.introduceText); // API 응답에서 introduceText를 가져옴
          } catch (error) {
            console.error("소개글을 가져오는 중 오류 발생:", error);
          }
        };
        // userId가 유효할 경우에만 API 호출
        if (userId) {
          fetchIntroduction();
        }
      }, [userId, forceUpdate]); // userId가 변경될 때마다 다시 호출

    return (
        <Box className="mainPage-introduce-myself">
            <Typography variant="h6"
                sx={{ fontFamily: "font-notosansKR-medium !important" }}>
                소개
            </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={introduction}
                    disabled // 입력을 비활성화하여 읽기 전용으로 설정
                    InputProps={{
                    sx: {
                    backgroundColor: "#f0f0f0",
                    borderRadius: 2,
                    marginTop: "10px",
                        },
                    }}
                />
        </Box>
    );
 };

export default IntroSection;
