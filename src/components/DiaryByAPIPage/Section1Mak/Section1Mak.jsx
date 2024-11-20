import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import ListSection from '../ListSection';
import "./Section1Mak.css";

function Section1Mak({ data, todayWeather }) {
    const [loading, setLoading] = useState(true);

    console.log(todayWeather);
    

    // 날씨에 따라 배너 정보를 정의
    const getBannerContent = () => {
        switch (todayWeather) {
            case "맑음":
                return {
                    title: "SUNNY DAY",
                    subtitle: "햇살 아래 즐기는 최고의 막걸리와 안주! ☀️",
                    image: "/img/DiaryByAPIPage/left-content-background.png",
                };
            case "구름":
                return {
                    title: "CLOUDY DAY",
                    subtitle: <span>구름 낀 날씨에 <br /> 즐길 수 있는 간편 안주🌥️🏠🍶 </span>,
                    image: "/img/DiaryByAPIPage/cloudfood1.png",
                };
            case "비":
                return {
                    title: "RAINY DAY",
                    subtitle: "막걸리 한 잔에 어울리는 최고의 안주 찾기! 🍶",
                    image: "/img/DiaryByAPIPage/makguli.png",
                };
            default:
                return {
                    title: "UNKNOWN WEATHER",
                    subtitle: "막걸리는 날씨와 상관없어요! 😄",
                    image: "/img/DiaryByAPIPage/default.png",
                };
        }
    };

    // 배너 콘텐츠 가져오기
    const bannerContent = getBannerContent();

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div>
            <Container maxWidth={false} sx={{ width: '80%', margin: "0 auto", marginTop: "100px" }}>
                <Grid container spacing={2} justifyContent="center">
                    {/* 배너 섹션 */}
                    <Grid item xs={12} className="diaryAPI-banner-grid">
                        <Card className="diaryAPI-banner-card">
                            <CardMedia
                                component="img"
                                src={bannerContent.image}
                                alt={bannerContent.title}
                                className="diaryAPI-banner-image"
                            />
                            <CardContent className="diaryAPI-banner-content">
                                <Typography variant="h6" className="diaryAPI-banner-title">
                                    {bannerContent.title}
                                </Typography>
                                <Typography variant="body2" className="diaryAPI-banner-subtitle">
                                    {bannerContent.subtitle}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth={false} sx={{ width: '90%', margin: "0 auto", marginTop: "50px" }}>
                <Grid item xs={12} style={{ width: '100%' }}>
                    {loading ? (
                        <Typography variant="h6">Loading...</Typography>
                    ) : (
                        <ListSection data={data} />
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default Section1Mak;
