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
    const [backgroundImage, setBackgroundImage] = useState('/img/DiaryByAPIPage/left-content-background.png');

    const handleToggleContent = () => {
        setShowSection0((prev) => !prev);
    };

    const updateBackgroundImage = (mainKo) => {
        switch (mainKo) {
            case '맑음':
                return '/img/DiaryByAPIPage/left-content-background.png';
            case '구름':
                return '/img/DiaryByAPIPage/clouds.jpg';
            case '비':
                return '/img/DiaryByAPIPage/rain.jpg';
            default:
                return '/img/DiaryByAPIPage/left-content-background.png';
        }
    };

    useEffect(() => {
        if (todayWeather && todayWeather.mainKo) {
            const newBackground = updateBackgroundImage(todayWeather.mainKo);
            setBackgroundImage(newBackground);
        }
    }, [todayWeather]);

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

        const nx = 60;
        const ny = 127;

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
                    {showSection0 ? (
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
                        <Section0Content weatherCondition={weatherCondition} />
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
                            {todayWeather.mainKo === '맑음'
                                ? '맑음1'
                                : todayWeather.mainKo === '구름'
                                    ? '구름1'
                                    : todayWeather.mainKo === '비'
                                        ? '비1'
                                        : '나머지'}
                        </Typography>
                        <Typography className="section0-card-box"></Typography>
                        <Typography variant="body2" className="section0-card-text">
                            {todayWeather.mainKo === '맑음'
                                ? '맑음내용1'
                                : todayWeather.mainKo === '구름'
                                    ? '구름내용1'
                                    : todayWeather.mainKo === '비'
                                        ? '비내용1'
                                        : '나머지'}
                        </Typography>
                    </Grid>

                    {/* 두 번째 카드 */}
                    <Grid item xs={5.6} className="section0-card" onClick={scrollToSection2}>
                        <Typography variant="h6" className="section0-card-title">
                            {todayWeather.mainKo === '맑음'
                                ? '맑음2'
                                : todayWeather.mainKo === '구름'
                                    ? '구름2'
                                    : todayWeather.mainKo === '비'
                                        ? '비2'
                                        : '나머지'}
                        </Typography>
                        <Typography className="section0-card-box"></Typography>
                        <Typography variant="body2" className="section0-card-text">
                            {todayWeather.mainKo === '맑음'
                                ? '맑음내용2'
                                : todayWeather.mainKo === '구름'
                                    ? '구름내용2'
                                    : todayWeather.mainKo === '비'
                                        ? '비내용2'
                                        : '나머지'}
                        </Typography>
                    </Grid>

                    {/* 세 번째 카드 */}
                    <Grid item xs={5.6} className="section0-card" onClick={scrollToSection3}>
                        <Typography variant="h6" className="section0-card-title">
                            {todayWeather.mainKo === '맑음'
                                ? '맑음3'
                                : todayWeather.mainKo === '구름'
                                    ? '구름3'
                                    : todayWeather.mainKo === '비'
                                        ? '비3'
                                        : '나머지'}
                        </Typography>
                        <Typography className="section0-card-box"></Typography>
                        <Typography variant="body2" className="section0-card-text">
                            {todayWeather.mainKo === '맑음'
                                ? '맑음내용3'
                                : todayWeather.mainKo === '구름'
                                    ? '구름내용3'
                                    : todayWeather.mainKo === '비'
                                        ? '비내용3'
                                        : '나머지'}
                        </Typography>
                    </Grid>

                    {/* 네 번째 카드 */}
                    <Grid item xs={5.6} className="section0-card" onClick={scrollToSection4}>
                        <Typography variant="h6" className="section0-card-title">
                            {todayWeather.mainKo === '맑음'
                                ? '맑음4'
                                : todayWeather.mainKo === '구름'
                                    ? '구름4'
                                    : todayWeather.mainKo === '비'
                                        ? '비4'
                                        : '나머지'}
                        </Typography>
                        <Typography className="section0-card-box"></Typography>
                        <Typography variant="body2" className="section0-card-text">
                            {todayWeather.mainKo === '맑음'
                                ? '맑음내용4'
                                : todayWeather.mainKo === '구름'
                                    ? '구름내용4'
                                    : todayWeather.mainKo === '비'
                                        ? '비내용4'
                                        : '나머지'}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Section0;
