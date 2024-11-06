import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ListSection from '../ListSection';

import "./Section3Season.css";

const Section3Season = () => (
    <Container maxWidth={false} sx={{ width: '95%', margin: "0 auto", marginTop: "100px" }}>
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} className="diaryAPI-text-banner">
                <Typography variant="h6" className="diaryAPI-banner-title">SEASONAL FOOD</Typography>
                <Typography variant="body2" className="diaryAPI-banner-season-toppick-subtitle">
                    지금 먹으면 딱 맛있는 음식
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ListSection />
            </Grid>
        </Grid>
    </Container>
);

export default Section3Season;
