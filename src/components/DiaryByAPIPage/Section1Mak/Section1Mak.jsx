import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import ListSection from '../ListSection';
import "./Section1Mak.css";

function Section1Mak({ data }) {
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        setLoading(false); // 데이터가 설정된 후 로딩 종료
    }, []); // data가 변경될 때마다 실행되도록 의존성 추가

    return (
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
                                    막걸리 한 잔에 어울리는 최고의 안주 찾기! 🍶
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth={false} sx={{ width: '90%', margin: "0 auto", marginTop: "50px" }}>
                {/* ListSection을 포함하는 그리드 */}
                <Grid item xs={12} style={{ width: '100%' }}>
                    {/* 로딩 상태일 때는 로딩 메시지 또는 스피너를 보여줄 수 있음 */}
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
