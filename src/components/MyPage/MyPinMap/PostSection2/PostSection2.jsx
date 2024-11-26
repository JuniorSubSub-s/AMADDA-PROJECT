import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import api from "../../../../api/axios";
import "./PostSection2.css";

const PostSection2 = ({ userId, handleMarkerClick }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // 게시물 데이터 가져오기 
                const response = await api.get(`/api/amadda/posts/user/${userId}`);
                console.log("response data:", response.data);
                if (Array.isArray(response.data)) {
                    const sortedPosts = response.data.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

                    // 모든 레스토랑의 핀 색상 데이터 가져오기
                    const pinColorsResponse = await api.get("https://amadda.kr:7777/api/restaurants/pins");
                    const pinColors = pinColorsResponse.data;

                    const postsWithImages = await Promise.all(
                        sortedPosts.map(async (post) => {
                            try {
                                // 게시물 이미지 가져오기
                                const imgResponse = await api.get(`/api/amadda/foodImage?postId=${post.postId}`);

                                // 현재 게시물에 해당하는 레스토랑의 핀 색상 가져오기
                                const pinColor = pinColors.find((pin) => pin.restaurantId === post.restaurantId)?.color || "black";

                                return { ...post, foodImage: imgResponse.data, pinColor };
                            } catch (error) {
                                console.error("이미지 가져오기 오류:", error);
                                return post;
                            }
                        })
                    );
                    setPosts(postsWithImages);

                    // 컴포넌트 마운트 시 첫 번째 게시물의 레스토랑 정보 전달
                    if (postsWithImages.length > 0) {
                        const firstPost = postsWithImages[0];
                        handleMarkerClick({
                            ...firstPost.restaurant,
                            pinColor: firstPost.pinColor,
                            restaurantId: firstPost.restaurant.restaurantId,
                        });
                    }
                } else {
                    setPosts([]);
                }
            } catch (error) {
                console.error("포스트 제목을 가져오는 중 오류 발생:", error);
            }
        };

        if (userId) {
            fetchPosts();
        }
    }, [userId, handleMarkerClick]);

    // 게시물 클릭 시 핀 위치와 색상 전달
    const handlePostClick = (post) => {
        if (post.restaurant) {
            handleMarkerClick({
                ...post.restaurant,
                pinColor: post.pinColor, // 핀 색상 전달
                restaurantId: post.restaurant.restaurantId, // restaurantId 전달
            });
        }
    };

    return (
        <Box className="mainPage-post-section" sx={{ marginBottom: 4, maxHeight: "500px" }}>
            <Typography variant="h6">게시물</Typography>
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
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    {post.postTitle}
                                </Typography>
                                {/* 포스트 주소 추가 */}
                                {post.restaurant.restaurantAddress && (
                                    <Typography sx={{ color: "#888", fontSize: "0.9rem", marginTop: 1 }}>
                                        {post.restaurant.restaurantAddress}
                                    </Typography>
                                )}
                                <Typography sx={{ color: "#666", fontSize: "0.9rem", marginLeft: 45, marginTop: 3 }}>
                                    {new Date(post.postDate).toLocaleDateString("ko-KR")}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                ))
            ) : (
                <Typography variant="body2" sx={{ color: "#888" }}>
                    게시물이 없습니다.
                </Typography>
            )}
        </Box>
    );
};

export default PostSection2;
