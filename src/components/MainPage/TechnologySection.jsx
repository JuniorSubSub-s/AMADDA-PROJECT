import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

const features = [
    {
        backgroundColor: '#B08D68',
        text: "AMADDA에서는 다양한 활동을 통해 \n 특별한 뱃지를 획득할 수 있습니다.",
        linkText: "뱃지 리스트 보러가기 →",
        linkAction: "handleBadgeClick", // 동적으로 클릭 핸들러 지정
        imgSrc: "/img/MainPageImg/badge.png",
        alt: "Badge Icon",
    },
    {
        backgroundColor: '#8D8AA7',
        text: "실제 방문한 맛집임을 증명! 더 신뢰받는 정보! \n 인증하고, 믿을 수 있는 리뷰를 작성해 보세요!",
        linkText: "양수증 인증을 통한 정정 →",
        linkAction: null, // 클릭 동작이 없는 경우
        imgSrc: "/img/MainPageImg/receipt.png",
        alt: "Review Icon",
    },
];

const TechnologySection = ({ handleBadgeClick }) => {
    const handleClick = (action) => {
        if (action === "handleBadgeClick") {
            handleBadgeClick();
        }
    };

    return (
        <Grid item xs={12}>
            <Paper className="technology-section">
                <Typography variant="h5" className="technology-title">AMADDA Technology</Typography>
                <Typography variant="body2" className="technology-description">
                    이곳만의 창의적인 기능들로 당신의 맛집 일기 생활을 더 풍성하게 꾸며보세요.
                </Typography>

                <Grid container spacing={2} marginTop={1}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Paper
                                className="feature-box"
                                style={{ backgroundColor: feature.backgroundColor }}
                            >
                                <Typography variant="body1" className="feature-text">
                                    {feature.text.split("\n").map((line, idx) => (
                                        <React.Fragment key={idx}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className="feature-link"
                                    style={{ cursor: feature.linkAction ? "pointer" : "default" }}
                                    onClick={() => handleClick(feature.linkAction)}
                                >
                                    {feature.linkText}
                                </Typography>
                                <img
                                    className="feature-icon"
                                    alt={feature.alt}
                                    src={feature.imgSrc}
                                />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Grid>
    );
};

export default TechnologySection;
