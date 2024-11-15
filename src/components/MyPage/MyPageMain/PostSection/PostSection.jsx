import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, IconButton, Divider } from "@mui/material";
import api from "../../../../api/axios";
import DeleteIcon from "@mui/icons-material/Delete";

import "./PostSection.css";

function PostSection({ userId }) {
    const [posts, setPosts] = useState([]); // 포스트 배열로 상태 변경

    useEffect(() => {
        // 사용자 ID에 따라 포스트 제목과 작성일을 가져오는 API 호출
        const fetchPosts = async () => {
            try {
                const response = await api.get(`/api/amadda/posts/user/${userId}`);
                
                if (Array.isArray(response.data)) {
                    const sortedPosts = response.data.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

                    // 각 게시물에 대해 foodImage를 가져옴
                    const postsWithImages = await Promise.all(
                        sortedPosts.map(async (post) => {
                            try {
                                const imgResponse = await api.get(`/api/amadda/foodImage?postId=${post.postId}`);
                                return { ...post, foodImage: imgResponse.data };
                            } catch (error) {
                                console.error("이미지 가져오기 오류:", error);
                                return post;
                            }
                        })
                    );

                    setPosts(postsWithImages); // 응답 데이터를 상태에 저장
                } else {
                    console.error("응답 데이터가 배열이 아닙니다:", response.data);
                    setPosts([]); // 배열이 아닐 경우 빈 배열로 설정
                }
            } catch (error) {
                console.error("포스트 제목을 가져오는 중 오류 발생:", error);
            }
        };

        if (userId) {
            fetchPosts();
        }
    }, [userId]);

    const handleDeleteClick = async (postId) => {
        console.log("포스트 아이디 : ", postId);
        if (window.confirm("정말 삭제하겠습니까?")) {
            try {
                const response = await api.delete(`/api/amadda/posts/${postId}`);
                if (response.status === 204) {
                    alert("게시물이 성공적으로 삭제되었습니다.");
                    setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
                } else {
                    alert("게시물 삭제에 실패했습니다.");
                }
            } catch (error) {
                console.error("포스트 삭제 중 오류 발생:", error);
                alert("게시물 삭제 중 오류가 발생했습니다.");
            } 
        }
    };

    const getCategoryStyles = (category) => {
        switch (category) {
            case '한식':
                return {
                    backgroundColor: '#A8D080', // 연한 초록색
                    color: '#000', 
                    icon: '🍲', // 한식 아이콘
                };
            case '중식':
                return {
                    backgroundColor: '#F88B7F', // 연한 빨간색
                    color: '#000', 
                    icon: '🍜', // 중식 아이콘
                };
            case '양식':
                return {
                    backgroundColor: '#FFDB5C', // 연한 노란색
                    color: '#000',
                    icon: '🍝', // 양식 아이콘
                };
            case '일식':
                return {
                    backgroundColor: '#F5A9B8', // 연한 분홍색
                    color: '#000',
                    icon: '🍣', // 일식 아이콘
                };
            case '아시아요리':
                return {
                    backgroundColor: '#E3F2FD', // 연한 파란색
                    color: '#000',
                    icon: '🍱', // 아시아 요리 아이콘
                };
            case '패스트푸드':
                return {
                    backgroundColor: '#FFCC00', // 노란색
                    color: '#000',
                    icon: '🍔', // 패스트푸드 아이콘
                };
            case '디저트':
                return {
                    backgroundColor: '#F1C0D6', // 연한 핑크색
                    color: '#000',
                    icon: '🍰', // 디저트 아이콘
                };
            default:
                return {
                    backgroundColor: '#E0E0E0', // 기본 색상
                    color: '#333333', // 기본 텍스트 색상
                    icon: '🍽️', // 기본 아이콘
                };
        }
    };

    return (
        <Box
            className="mainPage-post-section"
            sx={{
                marginBottom: 4,
                maxHeight: "400px",
                overflowY: "scroll",
            }}
        >
            <Typography variant="h6" sx={{ fontFamily: "font-notosansKR-medium !important" }}>
                게시물
            </Typography>

            {Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post) => {
                    const { backgroundColor, color, icon } = getCategoryStyles(post.foodCategory);
                    return (
                        <Card
                            key={post.postId}
                            className="mainPage-post-card"
                            sx={{
                                marginTop: 2,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "stretch",
                                position: "relative",
                            }}
                        >
                            <IconButton
                                onClick={() => handleDeleteClick(post.postId)}
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    color: "#000000",
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>

                            {/* 좌측 이미지 영역에 foodImage를 적용 */}
                            <CardMedia
                                component="img"
                                image={Array.isArray(post.foodImage) ? post.foodImage[0] : post.foodImage}
                                alt="음식 이미지"
                                style={{ width: '30%', height: '300px', objectFit: 'cover' }}
                            />

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
                                        sx={{ fontWeight: "bold" , marginBottom: 5 }}
                                    >
                                        {post.postTitle}
                                    </Typography>
                                    
                                    {/* 포스트 콘텐츠 추가 */}
                                    <Typography
                                        className="mainPage-post-content"
                                        variant="body2"
                                        sx={{ color: "#333", marginBottom: 13 }}
                                    >
                                        {post.postContent} {/* postContent를 추가 */}
                                    </Typography>

                                    <Divider sx={{ marginY: 1 }} />

                                    {/* 카테고리 스타일 */}
                                    <Box
                                        sx={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            backgroundColor,
                                            color,
                                            padding: "2px 8px",
                                            borderRadius: "20px",
                                            fontSize: "1rem",
                                            fontWeight: "bold",
                                            marginBottom: 2,
                                        }}
                                    >
                                        <Typography>{icon}</Typography>
                                        <Typography sx={{ marginLeft: 1 }}>
                                          {post.foodCategory}
                                        </Typography>

                                    </Box>
                                    <Typography
                                        className="mainPage-post-date"
                                        sx={{ color: "#666", fontSize: "0.9rem" , marginLeft: 72 }}
                                        >
                                        {new Date(post.postDate).toLocaleDateString("ko-KR")}
                                        </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    );
                })
            ) : (
                <Typography variant="body2" sx={{ color: "#888" }}>
                    게시물이 없습니다.
                </Typography>
            )}
        </Box>
    );
}

export default PostSection;
