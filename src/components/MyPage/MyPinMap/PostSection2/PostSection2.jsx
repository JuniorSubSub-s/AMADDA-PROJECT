import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

import "./PostSection2.css";

const PostSection2 = () => {
    return (
        <Box
            className="mainPage-post-section"
            sx={{
                marginBottom: 4,
                maxHeight: "500px",
            }}
        >
            <Typography variant="h6" sx={{ fontFamily: "font-notosansKR-medium !important" }}>
                게시물
            </Typography>

            {/* 여러 게시물 렌더링 */}
            {[...Array(10)].map((_, index) => (
                <Card
                    key={index}
                    className="mainPage-post-card"
                    sx={{
                        marginTop: 2,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "stretch",
                    }}
                >
                    {/* 좌측 이미지 영역 */}
                    <CardMedia
                        component="img"
                        image="/img/cateImg/cafe.png"
                        alt="Post Image"
                        className="mainPage-post-image"
                        sx={{
                            width: "30%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "8px 0 0 8px",
                            marginRight: 0,
                        }}
                    />

                    {/* 우측 게시글 정보 영역 */}
                    <CardContent
                        sx={{
                            flex: 1,
                            paddingLeft: 3,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography
                                className="mainPage-post-title"
                                variant="h6"
                                sx={{ fontWeight: "bold" }}
                            >
                                Post Title {index + 1}
                            </Typography>
                            <Typography
                                className="mainPage-post-date"
                                sx={{ color: "#666", fontSize: "0.9rem", marginBottom: 2 }}
                            >
                                2024년 8월 24일
                            </Typography>
                        </Box>
                        <Box
                            className="mainPage-post-content"
                            sx={{
                                backgroundColor: "#f5f5f5",
                                padding: 2,
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="body2">Post content area...</Typography>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default PostSection2;
