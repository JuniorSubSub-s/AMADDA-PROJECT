import React from "react";
import { Grid, Box, Typography, Container } from "@mui/material";

import MainHeader from "../../Header/MainHeader";
import PostSection2 from "../../../components/MyPage/MyPinMap/PostSection2/PostSection2";

import "../../../ui/MyPage/MyPinMapPage/MyPinMapPage.css";

const MyPinMapPage = () => {
    return (
        <div>
            <MainHeader />

            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Box className="mypinmap-page" sx={{ p: 3, backgroundColor: "#f8f8f8", borderRadius: 2 }}>
                    <Typography variant="h5" className="mypinmap-title" sx={{ mb: 2 }}>
                        나의 핀 맵
                    </Typography>

                    <Grid container spacing={3}>
                        {/* 좌측 지도 영역 */}
                        <Grid item xs={12} md={6}>
                            <Box
                                className="map-container"
                                sx={{
                                    width: "95%",
                                    height: "500px",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                {/* 지도 API */}
                                <iframe
                                    title="map"
                                    src="지도 API 링크" // 실제 지도 API 링크로 변경하세요
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                ></iframe>
                            </Box>
                        </Grid>

                        {/* 우측 게시물 영역 */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ height: "550px", overflowY: "auto" }}>
                                <PostSection2 />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default MyPinMapPage;
