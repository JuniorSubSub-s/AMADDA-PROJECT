import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';

import Section0Content from '../Section0Left/Section0Content';
import Section1Content from '../Section0Left/Section1Content';

import './Section0.css';

const Section0 = ({ todayWeather, scrollToSection1, scrollToSection2, scrollToSection3, scrollToSection4 }) => {
    const [showSection0, setShowSection0] = useState(true);
    const [videoSrc, setVideoSrc] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('/img/DiaryByAPIPage/left-content-background.png');

    // 클릭 시 콘텐츠 토글
    const handleToggleContent = () => {
        setShowSection0((prev) => !prev);
    };

    // 배경 이미지 업데이트
    const updateBackgroundImage = (mainKo) => {
        switch (mainKo) {
            case '맑음':
                return '/img/DiaryByAPIPage/left-content-background.png';
            case '눈':
                return '/img/DiaryByAPIPage/snow.jpg';
            case '구름':
                return '/img/DiaryByAPIPage/clouds.jpg';
            case '비':
                return '/img/DiaryByAPIPage/rain.jpg';
            default:
                return '/img/DiaryByAPIPage/left-content-background.png';
        }
    };

    // 비디오 소스 업데이트
    const updateVideoSrc = (mainKo) => {
        switch (mainKo) {
            case '맑음':
                return '/img/DiaryByAPIPage/Sunny.mp4';
            case '눈':
                return '/img/DiaryByAPIPage/snow2.mp4';
            case '구름':
                return '/img/DiaryByAPIPage/Cloudy.mp4';
            case '비':
                return '/img/DiaryByAPIPage/Rainy.mp4';
            default:
                return '/img/DiaryByAPIPage/Default.mp4';
        }
    };

    // 날씨 상태에 따라 배경과 비디오 소스 업데이트
    useEffect(() => {
        if (todayWeather && todayWeather.mainKo) {
            setBackgroundImage(updateBackgroundImage(todayWeather.mainKo));
            setVideoSrc(updateVideoSrc(todayWeather.mainKo));
        }
    }, [todayWeather]);

    return (
        <Container maxWidth={false} disableGutters className="section0-container">
            <Grid container spacing={4} justifyContent="space-between">
                <Grid
                    item
                    xs={12}
                    md={5.9}
                    className="section0-banner"
                    onClick={handleToggleContent}
                >
                    {showSection0 ? (
                        <video
                            autoPlay
                            loop
                            muted
                            className="background-video"
                        >
                            {/* <source src={videoSrc} type="video/mp4" />
                            Your browser does not support the video tag. */}

                            {videoSrc && <source src={videoSrc} type="video/mp4" />}
                            {!videoSrc && <p>Loading video...</p>}
                        </video>
                    ) : (
                        <div
                            className="background-image"
                            style={{
                                backgroundImage: `url(${backgroundImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                borderRadius: '15px',
                                zIndex: -1,
                            }}
                        />
                    )}

                    {showSection0 ? (
                        <Section0Content
                            weatherCondition={todayWeather?.mainKo || 'Default'} />
                    ) : (
                        <Section1Content todayWeather={todayWeather} />
                    )}
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={6.1}
                    container
                    spacing={3}
                    className="section0-right-container"
                >
                    {/* 첫 번째 카드 */}
                    <Grid item xs={5.6} className="section0-card" onClick={scrollToSection1}>
                        <Typography variant="h6" className="section0-card-title">
                            오늘의 안주
                        </Typography>
                        <Typography className="section0-card-box"></Typography>
                        <Typography variant="body2" className="section0-card-text">
                            {todayWeather.mainKo === '맑음'
                                ? <span>
                                    햇살 아래 즐기는 최고의 음식! ☀️ 🌞🍹
                                </span>
                                : todayWeather.mainKo === '구름'
                                    ? <span>
                                        구름 낀 날씨에 집에서 <br />
                                        즐길 수 있는 간편 안주 🌥️🏠🍶
                                    </span>
                                    : todayWeather.mainKo === '비'
                                        ? <span>말걸리 한 잔에 어울리는 <br />
                                            최고의 안주 찾기 🍶</span>
                                        : todayWeather.mainKo === '눈'
                                            ? <span>눈 내리는 겨울철 별미, <br/> 붕어빵 🐟🍞</span>
                                            : '나머지'}
                        </Typography>
                    </Grid>

                    {/* 두 번째 카드 */}
                    <Grid item xs={5.6} className="section0-card" onClick={scrollToSection2}>
                        <Typography variant="h6" className="section0-card-title">
                            오늘 추천 메뉴
                        </Typography>
                        <Typography className="section0-card-box"></Typography>
                        <Typography variant="body2" className="section0-card-text">
                            {todayWeather.mainKo === '맑음'
                                ? <span>오늘처럼 맑은 날엔 <br />달콤한 디저트 어때요?  🍰🧁</span>
                                : todayWeather.mainKo === '구름'
                                    ? <span>오늘 같은 날, <br />몸 녹이는 <br />라면 한 그릇 어때요? 🍜</span>
                                    : todayWeather.mainKo === '비'
                                        ? <span>쌀쌀한 저녁 <br />뜨끈한 탕 한 그릇 어때요? 🍲</span>
                                        : todayWeather.mainKo === '눈'
                                            ? <span>포근한 눈 오는 날, <br />달콤한 호떡 어때요? 🥞❄️</span>
                                            : '나머지'}
                        </Typography>
                    </Grid>

                    {/* 세 번째 카드 */}
                    <Grid item xs={5.6} className="section0-card" onClick={scrollToSection3}>
                        <Typography variant="h6" className="section0-card-title">
                            Seasonal food
                        </Typography>
                        <Typography className="section0-card-box"></Typography>
                        <Typography variant="body2" className="section0-card-text">
                            지금 먹으면 딱 맛있는 음식
                        </Typography>
                    </Grid>

                    {/* 네 번째 카드 */}
                    <Grid item xs={5.6} className="section0-card" onClick={scrollToSection4}>
                        <Typography variant="h6" className="section0-card-title">
                            Today's Top Pick
                        </Typography>
                        <Typography className="section0-card-box"></Typography>
                        <Typography variant="body2" className="section0-card-text">
                            오늘 제일 많이 찾는 음식
                        </Typography>
                    </Grid>

                </Grid>
            </Grid>
        </Container>
    );
};

export default Section0;
