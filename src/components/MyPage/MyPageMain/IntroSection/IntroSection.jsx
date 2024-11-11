import React from "react";
import { Box, Typography, TextField } from "@mui/material";

import "./IntroSection.css";

const IntroSection = ({ introText, handleIntroChange }) => {
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
                placeholder="회원님을 소개해주세요!"
                value={introText}
                onChange={handleIntroChange}
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
