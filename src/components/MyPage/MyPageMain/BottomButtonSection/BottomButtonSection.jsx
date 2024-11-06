import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { BoldEssentionalUiCrownStar } from "../../../../assets/icons/BoldEssentionalUiCrownStar";
import { BoldDuotoneEssentionalUiGift } from "../../../../assets/icons/BoldDuotoneEssentionalUiGift";

import "./BottomButtonSection.css";

const BottomButtonSection = () => {
    return (
        <Grid container spacing={2} justifyContent="center" className="bottom-buttons">
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
                >
                    <BoldEssentionalUiCrownStar sx={{ fontSize: "2rem", color: "#ffc107" }} />
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography sx={{ fontFamily: "font-notosansKR-medium", fontSize: "1.5rem", color: "#666" }}>
                            아맛따 뱃지
                        </Typography>
                        <Typography sx={{ fontFamily: "font-notosansKR-medium", fontSize: "1rem", color: "#666" }}>
                            0 / 30
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
        </Grid>
    );
};

export default BottomButtonSection;
