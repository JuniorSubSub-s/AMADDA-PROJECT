import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import ListSection from '../ListSection';

import "./Section1Mak.css";

const Section1Mak = () => (
    <div>
        <Container maxWidth={false} sx={{ width: '80%', margin: "0 auto", marginTop: "100px" }}>
            <Grid container spacing={2} justifyContent="center">
                {/* 배너 섹션 */}
                <Grid item xs={12} className="diaryAPI-banner-grid">
                    <Card className="diaryAPI-banner-card">
                        <CardMedia
                            component="img"
                            src="/img/DiaryByAPIPage/makguli.png"
                            alt="Rainy Day"
                            className="diaryAPI-banner-image"
                        />
                        <CardContent className="diaryAPI-banner-content">
                            <Typography variant="h6" className="diaryAPI-banner-title">RAINY DAY</Typography>
                            <Typography variant="body2" className="diaryAPI-banner-subtitle">
                                막걸이 한 잔에 어울리는 최고의 안주 찾기! 🍶
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>

        <Container maxWidth={false} sx={{ width: '90%', margin: "0 auto", marginTop: "50px" }}>
            {/* ListSection을 포함하는 그리드 */}
            <Grid item xs={12} style={{ width: '100%' }}>
                <ListSection />
            </Grid>
        </Container>
    </div>
);

export default Section1Mak;
