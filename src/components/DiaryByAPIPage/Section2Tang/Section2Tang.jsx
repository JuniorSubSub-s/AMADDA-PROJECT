import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import ListSection from '../ListSection';

import "./Section2Tang.css";

function Section2Tang({data})  {
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        setLoading(false); // 데이터가 설정된 후 로딩 종료
    }, []); // data가 변경될 때마다 실행되도록 의존성 추가

    return(
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
            <ListSection data={data} />
        </Grid>
        </Container>
    </div>
    );
}

export default Section2Tang;
