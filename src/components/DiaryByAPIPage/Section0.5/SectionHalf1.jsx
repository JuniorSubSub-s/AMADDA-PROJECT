import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import './SectionHalf1.css';

const SectionHalf1 = () => {
    const weatherData = [
        { date: '11일(월)', amIcon: '-', pmIcon: '/img/DiaryViewPageImg/weatherIcon/cloudy.png', amTemp: '9°C', pmTemp: '21°C', rainAm: '-', rainPm: '20%' },
        { date: '12일(화)', amIcon: '/img/DiaryViewPageImg/weatherIcon/cloudy.png', pmIcon: '/img/DiaryViewPageImg/weatherIcon/sunny.png', amTemp: '11°C', pmTemp: '18°C', rainAm: '10%', rainPm: '0%' },
        { date: '13일(수)', amIcon: '/img/DiaryViewPageImg/weatherIcon/sunny.png', pmIcon: '/img/DiaryViewPageImg/weatherIcon/cloudy.png', amTemp: '9°C', pmTemp: '19°C', rainAm: '20%', rainPm: '20%' },
        { date: '14일(목)', amIcon: '/img/DiaryViewPageImg/weatherIcon/cloudy.png', pmIcon: '/img/DiaryViewPageImg/weatherIcon/rainy.png', amTemp: '11°C', pmTemp: '18°C', rainAm: '30%', rainPm: '60%' },
        { date: '15일(금)', amIcon: '/img/DiaryViewPageImg/weatherIcon/cloudy.png', pmIcon: '/img/DiaryViewPageImg/weatherIcon/sunny.png', amTemp: '13°C', pmTemp: '19°C', rainAm: '40%', rainPm: '30%' },
        { date: '16일(토)', amIcon: '/img/DiaryViewPageImg/weatherIcon/cloudy.png', pmIcon: '/img/DiaryViewPageImg/weatherIcon/cloudy.png', amTemp: '12°C', pmTemp: '18°C', rainAm: '40%', rainPm: '40%' },
        { date: '17일(일)', amIcon: '/img/DiaryViewPageImg/weatherIcon/sunny.png', pmIcon: '/img/DiaryViewPageImg/weatherIcon/sunny.png', amTemp: '9°C', pmTemp: '13°C', rainAm: '30%', rainPm: '20%' },
    ];

    return (
        <Container maxWidth="xl">
            <Typography variant="h6" className="section-title">일별 예보</Typography>
            <Grid item container direction="row" className="date-row" alignItems="center">
                {weatherData.map((day, index) => (
                    <Grid item xs={12} sm={6} md={1.5} lg={1.5} key={index} className="date-container">
                        <Typography className={`weather-date ${day.date.includes('(토)') ? 'saturday' : ''} ${day.date.includes('(일)') ? 'sunday' : ''}`}>
                            {day.date}
                        </Typography>
                        <div className="time-container">
                            <span className="time-text">오전</span>
                            <span className="time-text">오후</span>
                        </div>
                        <div className="weather-icon-container">
                            {day.amIcon === '-' ? (
                                <span className="weather-icon">-</span>
                            ) : (
                                <img src={day.amIcon} alt="am weather" className="weather-icon" />
                            )}
                            {day.pmIcon === '-' ? (
                                <span className="weather-icon">-</span>
                            ) : (
                                <img src={day.pmIcon} alt="pm weather" className="weather-icon" />
                            )}
                        </div>
                        <div className="temperature-container">
                            <span className="temperature am-temp">{day.amTemp}</span>
                            <span className="temperature pm-temp">{day.pmTemp}</span>
                        </div>
                        <div className="rain-container">
                            <span className="rain am-rain">{day.rainAm}</span>
                            <span className="rain pm-rain">{day.rainPm}</span>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default SectionHalf1;
