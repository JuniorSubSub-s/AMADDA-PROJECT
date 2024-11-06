import React from 'react';
import { Grid, Card, CardMedia, CardContent, IconButton, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import "./ListSection.css";

const ListSection = () => (
    <Grid container spacing={2} justifyContent="space-around" alignItems="center">
        {/* 왼쪽 화살표 */}
        <Grid item>
            <IconButton className="diaryAPI-arrow-button">
                <ArrowBackIos />
            </IconButton>
        </Grid>

        {/* 리스트 카드 아이템 */}
        {[1, 2, 3, 4, 5 ].map((item) => (
            <Grid item xs={12} sm={6} md={2} className="diaryAPI-list-item" key={item}>
                <Card className="diaryAPI-list-card">
                    <CardMedia component="div" className="diaryAPI-card-placeholder">
                        <Typography className="diaryAPI-placeholder-text">POST MAIN IMG</Typography>
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body1" className="diaryAPI-user-name">USER NAME</Typography>
                        <Typography variant="subtitle2" className="diaryAPI-diary-title">DIARY TITLE</Typography>
                    </CardContent>
                </Card>
            </Grid>
        ))}

        {/* 오른쪽 화살표 */}
        <Grid item>
            <IconButton className="diaryAPI-arrow-button">
                <ArrowForwardIos />
            </IconButton>
        </Grid>
    </Grid>
);

export default ListSection;
