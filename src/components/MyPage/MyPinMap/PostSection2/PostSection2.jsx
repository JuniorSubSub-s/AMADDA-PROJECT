import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import api from "../../../../api/axios";
import "./PostSection2.css";

const PostSection2 = ({ userId, handleMarkerClick }) => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = useCallback(async () => {
        try {
            // 게시물 데이터와 핀 색상 병렬로 가져오기
            const [postsResponse, pinColorsResponse] = await Promise.all([
                api.get(`/api/amadda/posts/user/${userId}`),
                api.get("https://amadda.kr:7777/api/restaurants/pins"),
            ]);

            const pinColors = pinColorsResponse.data;

            if (Array.isArray(postsResponse.data)) {
                const sortedPosts = postsResponse.data.sort(
                    (a, b) => new Date(b.postDate) - new Date(a.postDate)
                );

                // 게시물과 이미지, 핀 색상 매핑
                const postsWithImages = await Promise.all(
                    sortedPosts.map(async (post) => {
                        try {
                            const imgResponse = await api.get(
                                `/api/amadda/foodImage?postId=${post.postId}`
                            );

                            // 데이터 구조 확인 및 방어 코드 추가
                            const pinColor = (pinColors.find(
                                (pin) => pin.restaurantId === post.restaurantId
                            )?.color) || "black";

                            return {
                                ...post,
                                foodImage: imgResponse.data,
                                pinColor,
                            };
                        } catch (error) {
                            console.error("이미지 가져오기 오류:", error);

                            // 오류 발생 시에도 기본값 반환
                            return { ...post, pinColor: "black" };
                        }
                    })
                );

                setPosts(postsWithImages);
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.error("포스트 제목을 가져오는 중 오류 발생:", error);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchPosts();
        }
    }, [userId, fetchPosts]);

    // 게시물 클릭 시 핀 위치와 색상 전달
    const handlePostClick = useCallback(
        (post) => {
            if (post.restaurant) {
                handleMarkerClick({
                    ...post.restaurant,
                    pinColor: post.pinColor,
                    restaurantId: post.restaurant.restaurantId,
                });
            }
        },
        [handleMarkerClick]
    );

    return (
        <Box
            className="mainPage-post-section2"
            sx={{ marginBottom: 4, maxHeight: "500px" }}
        >
            <Typography
                variant="h6"
                sx={{ fontFamily: "font-notosansKR-medium" }}
            >
                게시물
            </Typography>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <Card
                        key={post.postId}
                        sx={{
                            marginTop: 2,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "stretch",
                        }}
                        onClick={() => handlePostClick(post)} // 클릭 이벤트 추가
                    >
                        {post.foodImage && (
                            <CardMedia
                                component="img"
                                sx={{
                                    width: "150px",
                                    height: "150px",
                                    objectFit: "cover",
                                    cursor: "pointer",
                                }}
                                image={Array.isArray(post.foodImage) ? post.foodImage[0] : post.foodImage}
                                alt="음식 이미지"
                            />
                        )}
                        <CardContent
                            sx={{
                                flex: 1,
                                paddingLeft: 3,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                cursor: "pointer",
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{ fontFamily: "font-notosansKR-medium" }}
                                >
                                    {post.postTitle}
                                </Typography>
                                {post.restaurant.restaurantAddress && (
                                    <Typography
                                        sx={{
                                            color: "#888",
                                            fontSize: "0.9rem",
                                            marginTop: 1,
                                            fontFamily: "font-notosansKR-light",
                                        }}
                                    >
                                        {post.restaurant.restaurantAddress}
                                    </Typography>
                                )}
                                <Typography
                                    sx={{
                                        color: "#666",
                                        fontSize: "0.9rem",
                                        marginLeft: 46,
                                        marginTop: 3,
                                        fontFamily: "font-notosansKR-medium",
                                    }}
                                >
                                    {new Date(post.postDate).toLocaleDateString("ko-KR")}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography variant="body2" sx={{ color: "#888" }}> </Typography>
            )}
        </Box>
    );
};

export default React.memo(PostSection2);
