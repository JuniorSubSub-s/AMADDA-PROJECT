import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import ListSection from '../ListSection';

import "./Section3Season.css";

function Section3Season({ data }) {
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    const seasonalFood = [
        {
            title: '찬바람 부는 11월 가을꼬막의 전성기',
            description: '피로회복, 항암, 콜레스테롤 억제',
            image: '/img/DiaryByAPIPage/Cockle.png',
        },
        {
            title: '기력 보충에 뛰어난 11월에 조기',
            description: '고혈압, 동맥경화, 심근경색 등 성인병 예방',
            image: '/img/DiaryByAPIPage/Croaker.png',
        },
        {
            title: '찬바람 부는 11월 가을꼬막의 전성기',
            description: '기력 회복, 면역력 상승, 혈압 저하',
            image: '/img/DiaryByAPIPage/Oyster.png',
        }
    ]

    useEffect(() => {
        setLoading(false); // 데이터가 설정된 후 로딩 종료
    }, []); // data가 변경될 때마다 실행되도록 의존성 추가

    return (
        <Container maxWidth={false} sx={{ width: '95%', margin: '0 auto', marginTop: '100px' }}>
            {/* 고정된 3개의 사진과 텍스트 */}
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} className="diaryAPI-text-banner">
                    <Typography variant="h6" className="diaryAPI-banner-title">SEASONAL FOOD</Typography>
                    <Typography variant="body2" className="diaryAPI-banner-season-toppick-subtitle">
                        지금 먹으면 딱 맛있는 음식
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{
                    maxWidth: '1600px !important', // 최대 너비를 제한
                    width: '100%',
                    margin: '0 auto !important'
                }}>
                    <Grid container spacing={4}>
                        {seasonalFood.map((food, index) => (
                            <Grid item xs={12} sm={4} key={index} sx={{ marginBottom: '40px' }}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={food.image}
                                        alt={food.title}
                                        className="food-card-image"
                                    />
                                    <CardContent>
                                        <Typography variant="h6" className="food-title">
                                            {food.title}
                                        </Typography>
                                        <Typography variant="body2" className="food-description">
                                            {food.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            {/* 게시글 섹션 */}
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <ListSection data={data} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Section3Season;
