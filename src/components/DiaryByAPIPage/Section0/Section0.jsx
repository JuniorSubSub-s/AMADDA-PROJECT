import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';

import Section0Content from '../Section0Left/Section0Content';
import Section1Content from '../Section0Left/Section1Content';

import './Section0.css';

const Section0 = ({ userLocation, todayWeather, scrollToSection1, scrollToSection2, scrollToSection3, scrollToSection4 }) => {
    const [showSection0, setShowSection0] = useState(true);
    const [videoSrc, setVideoSrc] = useState('');
    const [weatherCondition, setWeatherCondition] = useState('Default'); // 날씨 상태
    const [weatherDetails, setWeatherDetails] = useState({}); // 날씨 상세 정보
    const [loading, setLoading] = useState(true); // 로딩 상태

    const handleToggleContent = () => {
        setShowSection0((prev) => !prev);
    };

    const determineVideoSrc = (data) => {
        const rainCondition = data.find((item) => item.category === 'PTY')?.fcstValue; // 강수형태
        const skyCondition = data.find((item) => item.category === 'SKY')?.fcstValue; // 하늘상태
        const lightningCondition = data.find((item) => item.category === 'LGT')?.fcstValue; // 낙뢰

        let condition = 'Default';
        let video = '/img/DiaryByAPIPage/Default.mp4';

        if (lightningCondition === '1') {
            condition = 'Thunder';
            video = '/img/DiaryByAPIPage/Thunder.mp4';
        } else if (lightningCondition === '0') {
            condition = 'Cloudy';
            video = '/img/DiaryByAPIPage/Cloudy.mp4';
        } else if (rainCondition === '1') {
            condition = 'Rainy';
            video = '/img/DiaryByAPIPage/Rainy.mp4';
        } else if (rainCondition === '2') {
            condition = 'Snow';
            video = '/img/DiaryByAPIPage/Snow.mp4';
        } else if (skyCondition === '1') {
            condition = 'Sunny';
            video = '/img/DiaryByAPIPage/Sunny.mp4';
        } else if (skyCondition === '3') {
            condition = 'Cloudy';
            video = '/img/DiaryByAPIPage/Cloudy.mp4';
        }

        setWeatherCondition(condition);
        return video;
    };

    const fetchWeatherData = async () => {
        setLoading(true);
        const currentDate = new Date();
        const baseDate = currentDate.toISOString().split('T')[0].replace(/-/g, '');
        const baseHour = currentDate.getHours();
        const baseTime = baseHour >= 8 ? '0800' : '0500';

        const nx = 43;
        const ny = 134;

        try {
            const response = await fetch(
                `http://localhost:7777/api/weatherImageChange?nx=${nx}&ny=${ny}&base_date=${baseDate}&base_time=${baseTime}`
            );
            const data = await response.json();

            if (data.response?.body?.items?.item) {
                const items = data.response.body.items.item;

                const currentHour = new Date().getHours();
                const currentFcstTime = `${String(currentHour).padStart(2, '0')}00`;
                const closestWeather = items.reduce((closest, item) => {
                    const diff = Math.abs(parseInt(item.fcstTime) - parseInt(currentFcstTime));
                    const closestDiff = Math.abs(parseInt(closest.fcstTime) - parseInt(currentFcstTime));
                    return diff < closestDiff ? item : closest;
                });

                console.log('Closest Weather Data:', closestWeather);

                if (closestWeather) {
                    const video = determineVideoSrc([closestWeather]);
                    setVideoSrc(video);

                    // 날씨 세부 정보 설정
                    const weatherData = {
                        temperature: `${closestWeather?.T1H || 'N/A'}°C`, // 현재 기온 (T1H는 API 문서에서 제공하는 키 이름 예시)
                        feelsLike: `${closestWeather?.SENSIBLE_TEMP || 'N/A'}°C`, // 체감온도
                        humidity: `${closestWeather?.REH || 'N/A'}%`, // 습도
                        wind: `${closestWeather?.WSD || 'N/A'}m/s`, // 풍속
                        rain: `${closestWeather?.RN1 || 'N/A'}mm`, // 강수량
                        sunrise: '07:08', // 실제 API 데이터를 확인 후 업데이트
                        sunset: '17:24', // 실제 API 데이터를 확인 후 업데이트
                        description: weatherConditionDescription(weatherCondition),
                    };
                    setWeatherDetails(weatherData);
                }
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        } finally {
            setLoading(false);
        }
    };

    const weatherConditionDescription = (condition) => {
        switch (condition) {
            case 'Sunny':
                return '맑은 날씨입니다. 야외 활동하기 좋은 날이에요!';
            case 'Rainy':
                return '비가 오고 있습니다. 우산을 챙기세요!';
            case 'Cloudy':
                return '구름 많은 날씨입니다. 산책하기 좋아요.';
            case 'Thunder':
                return '천둥 번개가 칩니다. 외출을 삼가세요!';
            case 'Snow':
                return '눈이 내리고 있습니다. 따뜻하게 입으세요!';
            default:
                return '날씨 정보를 확인할 수 없습니다.';
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, [userLocation]);

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
                    {/* showSection0이 true일 때 비디오 배경, false일 때 이미지 배경 */}
                    {loading ? (
                        <div className="loading-message">Loading weather data...</div> // 로딩 상태 표시
                    ) : (
                        showSection0 ? (
                            <video
                                autoPlay
                                loop
                                muted
                                className="background-video"
                            >
                                <source src={videoSrc} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div
                                className="background-image"
                                style={{
                                    backgroundImage: "url('/img/DiaryByAPIPage/left-content-background.png')",
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
                        )
                    )}

                    {/* 현재 콘텐츠에 따라 Section0Content 또는 Section1Content 렌더링 */}
                    {showSection0 ? (
                        <Section0Content weatherCondition={weatherCondition} />
                    ) : (
                        loading || !weatherDetails ? (
                            <div className="loading-message">Loading weather details...</div>
                        ) : (
                            <Section1Content todayWeather={todayWeather}/>
                        )
                    )}

                </Grid>

                {/* 오른쪽 작은 카드들 */}
                <Grid item xs={12} md={6.1} container spacing={3} className="section0-right-container">
                    <Grid item xs={5.6} className="section0-card" onClick={scrollToSection1}>
                        <Typography variant="h6" className="section0-card-title">오늘의 안주</Typography>
                        <Typography className="section0-card-box"></Typography>
                        <Typography variant="body2" className="section0-card-text">
                            막걸리 한 잔에 어울리는<br />최고의 안주 찾기 🍶
                        </Typography>
                    </Grid>
                    <Grid item xs={5.6} className="section0-card" onClick={scrollToSection2}>
                        <Typography variant="h6" className="section0-card-title">오늘 추천 메뉴</Typography>
                        <Typography className="section0-card-box"></Typography>
                        <Typography variant="body2" className="section0-card-text">
                            쌀쌀한 저녁<br />뜨끈한 탕 한 그릇 어때요? 🍲
                        </Typography>
                    </Grid>
                    <Grid item xs={5.6} className="section0-card" onClick={scrollToSection3}>
                        <Typography variant="h6" className="section0-card-title">Seasonal food</Typography>
                        <Typography className="section0-card-box"></Typography>
                        <Typography variant="body2" className="section0-card-text">
                            지금 먹으면 딱 맛있는 음식
                        </Typography>
                    </Grid>
                    <Grid item xs={5.6} className="section0-card" onClick={scrollToSection4}>
                        <Typography variant="h6" className="section0-card-title">Today’s Top Pick</Typography>
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
