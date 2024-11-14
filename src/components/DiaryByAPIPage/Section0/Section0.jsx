import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';

import Section0Content from '../Section0Left/Section0Content';
import Section1Content from '../Section0Left/Section1Content';

import './Section0.css';

const Section0 = ({ scrollToSection1, scrollToSection2, scrollToSection3, scrollToSection4 }) => {
    const [showSection0, setShowSection0] = useState(true);

    const handleToggleContent = () => {
        setShowSection0((prev) => !prev);
    };

    return (
        <Container maxWidth={false} disableGutters className="section0-container">
            <Grid container spacing={4} justifyContent="space-between">
                <Grid
                    item
                    xs={12}
                    md={5.9}
                    className="section0-banner"
                    onClick={handleToggleContent}
                >
                    {/* showSection0이 true일 때 비디오 배경, false일 때 이미지 배경 */}
                    {showSection0 ? (
                        <video
                            autoPlay
                            loop
                            muted
                            className="background-video"
                        >
                            <source src="/img/DiaryByAPIPage/Rainy.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div
                            className="background-image"
                            style={{
                                backgroundImage: "url('/img/DiaryByAPIPage/left-content-background.png')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                borderRadius: '15px',
                                zIndex: -1,
                            }}
                        />
                    )}

                    {/* 현재 콘텐츠에 따라 Section0Content 또는 Section1Content 렌더링 */}
                    {showSection0 ? <Section0Content /> : <Section1Content />}
                </Grid>

                {/* 오른쪽 작은 카드들 */}
                <Grid item xs={12} md={6.1} container spacing={3} className="section0-right-container">
                    <Grid item xs={5.6} className="section0-card" onClick={scrollToSection1}>
                        <Typography variant="h6" className="section0-card-title">오늘의 안주</Typography>
                        <Typography className="section0-card-box"></Typography>
                        <Typography variant="body2" className="section0-card-text">
                            막걸리 한 잔에 어울리는<br />최고의 안주 찾기 🍶
                        </Typography>
                    </Grid>
                    <Grid item xs={5.6} className="section0-card" onClick={scrollToSection2}>
                        <Typography variant="h6" className="section0-card-title">오늘 추천 메뉴</Typography>
                        <Typography className="section0-card-box"></Typography>
                        <Typography variant="body2" className="section0-card-text">
                            쌀쌀한 저녁<br />뜨끈한 탕 한 그릇 어때요? 🍲
                        </Typography>
                    </Grid>
                    <Grid item xs={5.6} className="section0-card" onClick={scrollToSection3}>
                        <Typography variant="h6" className="section0-card-title">Seasonal food</Typography>
                        <Typography className="section0-card-box"></Typography>
                        <Typography variant="body2" className="section0-card-text">
                            지금 먹으면 딱 맛있는 음식
                        </Typography>
                    </Grid>
                    <Grid item xs={5.6} className="section0-card" onClick={scrollToSection4}>
                        <Typography variant="h6" className="section0-card-title">Today’s Top Pick</Typography>
                        <Typography className="section0-card-box"></Typography>
                        <Typography variant="body2" className="section0-card-text">
                            오늘 제일 많이 찾는 음식
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Section0;
