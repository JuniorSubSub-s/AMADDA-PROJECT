import React from "react";
import { Box, Typography, Card, CardContent, CardMedia, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import "./PostSection.css";

const PostSection = () => {

    const handleDeleteClick = (index) => {
        if(window.confirm("정말 삭제하겠습니까?")) {
            // 실제 삭제 로직
            console.log(`Post ${index + 1} 삭제`);
        }
    };

    return (
        <Box
            className="mainPage-post-section"
            sx={{
                marginBottom: 4,
                maxHeight: "400px", // 최대 높이 설정 (필요에 맞게 조정 가능)
                overflowY: "scroll", // 세로 스크롤 활성화
            }}
        >
            <Typography variant="h6" sx={{ fontFamily: "font-notosansKR-medium !important" }}>
                게시물
            </Typography>

            {/* 여기에 여러 게시물이 렌더링되도록 하세요 */}
            {[...Array(10)].map((_, index) => (
                <Card
                    key={index}
                    className="mainPage-post-card"
                    sx={{
                        marginTop: 2,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "stretch",
                        position: "relative",
                    }}
                >
                    {/* 삭제 버튼 */}
                    <IconButton
                        onClick={() => handleDeleteClick(index)}
                        sx={{   position: "absolute",
                                top: 8,
                                right: 8,
                                color: "#000000",
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>

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

export default PostSection;
