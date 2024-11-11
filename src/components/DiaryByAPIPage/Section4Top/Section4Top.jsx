import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import ListSection from '../ListSection';

import "./Section4Top.css";

function Section4Top({data}) {
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        setLoading(false); // 데이터가 설정된 후 로딩 종료
    }, []); // data가 변경될 때마다 실행되도록 의존성 추가

    return(
    <Container maxWidth={false} sx={{ width: '95%', margin: "0 auto", marginTop: "100px", marginBottom: "100px" }}>
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} className="diaryAPI-text-banner">
                <Typography variant="h6" className="diaryAPI-banner-title">TODAY'S TOP PICK</Typography>
                <Typography variant="body2" className="diaryAPI-banner-season-toppick-subtitle">
                    From AMADDA
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ListSection data={data} />
            </Grid>
        </Grid>
    </Container>
    );
}

export default Section4Top;
