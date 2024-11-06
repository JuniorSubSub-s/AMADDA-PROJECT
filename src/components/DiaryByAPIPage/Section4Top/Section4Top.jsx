import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ListSection from '../ListSection';

import "./Section4Top.css";

const Section4Top = () => (
    <Container maxWidth={false} sx={{ width: '95%', margin: "0 auto", marginTop: "100px", marginBottom: "100px" }}>
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} className="diaryAPI-text-banner">
                <Typography variant="h6" className="diaryAPI-banner-title">TODAY'S TOP PICK</Typography>
                <Typography variant="body2" className="diaryAPI-banner-season-toppick-subtitle">
                    From AMADDA
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ListSection />
            </Grid>
        </Grid>
    </Container>
);

export default Section4Top;
