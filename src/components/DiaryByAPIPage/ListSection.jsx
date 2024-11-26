import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, IconButton, Typography, CircularProgress } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import DiaryPostModal from "../DiaryViewPage/DisaryPostItem/DiaryPostModal";
import axios from 'axios';
import "./ListSection.css";

const ITEMS_PER_PAGE = 5; // 페이지당 표시할 항목 수

const ListSection = ({ data = [] }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [images, setImages] = useState({}); // postId별 이미지 데이터를 저장
    const [isLoading, setIsLoading] = useState(false); // 이미지 요청 중인지 여부
    const [openModal, setOpenModal] = useState(false); // 모달 열기/닫기 상태 추가
    const [postData, setPostData]   = useState([]);
    const [tags, setTags] = useState([]);

    const postclick = () => {
        console.log("포스트 클릭함");
        console.log(data);      
        console.log(images);
          
        setOpenModal(true);

    };

    // 모달 닫기 핸들러
    const handleCloseModal = () => {
        console.log("포스트 닫기");
        setOpenModal(false);
    };

    const getTags = async (postId) => {
        try {
            const response = await axios.get('/api/amadda/tags', {
                params: { postId: postId },
            });
            setTags(response.data); // 받아온 태그를 상태에 저장
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    console.log("받아온 데이터 : " + JSON.stringify(data, null, 2));
    

    // 현재 페이지의 게시물을 추출
    const currentItems = data.slice(
        currentPage * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    const api_array = axios.create({
        baseURL: 'http://localhost:7777', // API의 기본 URL
        paramsSerializer: params => {
            return Object.entries(params)
                .map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return value.map(v => `${key}=${encodeURIComponent(v)}`).join('&');
                    }
                    return `${key}=${encodeURIComponent(value)}`;
                })
                .join('&');
        },
    });

    // 이미지 데이터를 가져오는 함수
    const fetchImages = async () => {
        console.log("이미지 요청 시작");

        // 아직 요청되지 않은 postId만 추출
        const postIdsToFetch = currentItems
            .map(item => item.postId)
            .filter(postId => !images[postId]); // images 상태에 없으면 요청

        if (postIdsToFetch.length > 0 && !isLoading) {
            setIsLoading(true); // 요청 시작 시 로딩 상태 설정
            try {
                const response = await api_array.get('/api/amadda/foodImages', {
                    params: { postIds: postIdsToFetch }, // 여러 postId를 쿼리 파라미터로 요청
                });

                console.log(response.data); // 디버그용 콘솔 출력

                // 응답 데이터를 바로 setImages에 할당
                setImages(prevImages => {
                    const newImages = { ...prevImages };
                    Object.keys(response.data).forEach(postId => {
                        newImages[postId] = response.data[postId];
                    });
                    return newImages;
                });                
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setIsLoading(false); // 로딩 완료 후 상태 초기화
            }
        }
    };

    // currentItems가 변경될 때마다 이미지 요청
    useEffect(() => {
        fetchImages();
    }, [currentItems]); // currentItems가 변경될 때마다 한 번만 호출

    // 다음 페이지로 이동하는 함수
    const handleNextPage = () => {
        if ((currentPage + 1) * ITEMS_PER_PAGE < data.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    // 이전 페이지로 이동하는 함수
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentItemHandler = (item, postId) => {
        console.log("게시물 클릭함");
        console.log(item);
        console.log(postId);
        
        
        setPostData(item);        
        getTags(postId);
        postclick();

    }

    return (
        <Grid container spacing={2} justifyContent="space-around" alignItems="center">
            {/* 왼쪽 화살표 */}
            <Grid item>
                <IconButton 
                    className="diaryAPI-arrow-button" 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 0}
                >
                    <ArrowBackIos />
                </IconButton>
            </Grid>

            {/* 리스트 카드 아이템 */}
            {currentItems.map((item) => (
                <Grid item xs={12} sm={6} md={2} className="diaryAPI-list-item" key={item.postId}>
                    <Card className="diaryAPI-list-card" onClick={() => currentItemHandler(item, item.postId)}>
                        <CardMedia component="div" className="diaryAPI-card-placeholder">
                            {images[item.postId] ? (
                                <img
                                    src={images[item.postId]}
                                    alt="User Post Img"
                                    style={{
                                        width: '100%',  // Box 너비에 맞춤
                                        height: '100%', // Box 높이에 맞춤
                                        objectFit: 'cover', // 크롭하며 비율 유지
                                        maxHeight: '300px', // 이미지 최대 높이 설정
                                    }}
                                />
                            ) : (
                                <CircularProgress /> // 이미지 로딩 중 로딩 아이콘 표시
                            )}
                        </CardMedia>
                        <CardContent>
                            <Typography variant="body1" className="diaryAPI-user-name">
                                {item.user && item.user.userNickname} 
                            </Typography>
                            <Typography variant="subtitle2" className="diaryAPI-diary-title">
                                {item.postTitle} 
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                
            ))}

            {/* 오른쪽 화살표 */}
            <Grid item>
                <IconButton 
                    className="diaryAPI-arrow-button" 
                    onClick={handleNextPage} 
                    disabled={(currentPage + 1) * ITEMS_PER_PAGE >= data.length}
                >
                    <ArrowForwardIos />
                </IconButton>
            </Grid>
            <DiaryPostModal open={openModal} handleClose={handleCloseModal} post={postData} image={images} tags={tags} />
        </Grid>
    );
};

export default ListSection;
