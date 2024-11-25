import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import '../../ui/MainPage/MainPage.css';

const cards = [
    {
        title: "내가 꽂은 핀, 나만의 맛집 지도",
        description: (
            <>
                내가 발견한 최고의 맛집들을 지도로 한눈에 확인하세요.<br />
                핀을 꽂아 나만의 맛집 지도를 만들어 보세요!
            </>
        ),
        imgSrc: "/img/MainPageImg/CardSection/map.png",
        bgColor: "#8FD694",
        link: "/amadda/diary-view",
        buttonText: "맛집 찾기",
        imgStyle: { width: '350px', bottom: 5, right: 5 }, // 이미지 스타일
    },
    {
        title: "오늘의 기분에 딱 맞는 추천 맛집",
        description: (
            <>
                날씨, 기분, 컨디션에 맞춰 추천되는 특별한 맛집!<br />
                지금 내 상황에 맞는 최고의 맛집을 찾아보세요.
            </>
        ),
        imgSrc: "/img/MainPageImg/CardSection/box.png",
        bgColor: "#F67A7B",
        link: "/amadda/bestRes",
        buttonText: "추천 맛집 보러가기",
        imgStyle: { width: '310px', bottom: -30, right: 5 }, // 이미지 스타일
    },
    {
        title: "나만의 맛집 일기, 특별한 순간을 기록하다",
        description: (
            <>
                지도에 핀을 꽂고 나만의 맛집 경험을 다이어리 형식으로 작성하세요.<br />
                맛집에서 느낀 감정과 추억을 소중히 기록할 수 있습니다.
            </>
        ),
        imgSrc: "/img/MainPageImg/CardSection/notes.png",
        bgColor: "#B9A1A1",
        link: "/amadda/postWrite",
        buttonText: "일기 작성하기",
        imgStyle: { width: '200px', bottom: 15, right: 30 }, // 이미지 스타일
    },
];

const CardSection = () => {
    const navigate = useNavigate();

    return (
        <Grid container spacing={2} sx={{marginLeft: "1px"}}>
            {cards.map((card, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <Paper
                        sx={{
                            backgroundColor: card.bgColor,
                            padding: 2,
                            borderRadius: 3,
                            height: 300,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{ fontSize: '1.5rem', color: '#fff', fontFamily: 'font-nanumSquare-bold', marginBottom: '10px' }}
                        >
                            {card.title}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '1rem', lineHeight: 1.5, color: '#fff', fontFamily: 'font-notosansKR-light' }}
                        >
                            {card.description}
                        </Typography>
                        <img
                            alt={card.title}
                            src={card.imgSrc}
                            style={{ position: 'absolute', ...card.imgStyle }}
                        />
                        <Typography
                            sx={{ color: '#fff', cursor: 'pointer', marginTop: 'auto', fontFamily: 'font-notosansKR-light' }}
                            onClick={() => navigate(card.link)}
                        >
                            {card.buttonText} →
                        </Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardSection;