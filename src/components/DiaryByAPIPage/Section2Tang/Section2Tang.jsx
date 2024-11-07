import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import ListSection from '../ListSection';

import "./Section2Tang.css";

const Section2Tang = () => (
    <div>
        <Container maxWidth={false} sx={{ width: '80%', margin: "0 auto", marginTop: "100px" }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} className="diaryAPI-banner-grid">
                    <Card className="diaryAPI-banner-card">
                        <CardMedia
                            component="img"
                            src="/img/DiaryByAPIPage/gimchijjige.png"
                            alt="Rainy Day"
                            className="diaryAPI-banner-image"
                        />
                        <CardContent className="diaryAPI-banner-content">
                            <Typography variant="h6" className="diaryAPI-banner-title">HOT FOOD</Typography>
                            <Typography variant="body2" className="diaryAPI-banner-subtitle">
                                쌀쌀한 저녁, 속까지 따뜻하게 데워줄<br />
                                뜨끈한 탕 한 그릇 어때요? 🍲
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

export default Section2Tang;
