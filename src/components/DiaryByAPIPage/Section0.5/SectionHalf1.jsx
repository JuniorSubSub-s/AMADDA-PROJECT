import { React } from "react";
import { Container, Grid, Typography } from "@mui/material";
import "./SectionHalf1.css";

const SectionHalf1 = ({ weatherData, loading, error }) => {
    const sortedWeatherData = [...weatherData].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <Container maxWidth="xl">
            <Typography variant="h6" className="section-title">
                일별 예보
            </Typography>
            {loading ? (
                <p>날씨 데이터를 불러오는 중...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Grid container spacing={2}>
                    {sortedWeatherData.map((weather, index) => {
                        const dateObj = new Date(weather.date);
                        const day = dateObj.getDate().toString().padStart(2, '0');
                        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
                        const dayOfWeek = daysOfWeek[dateObj.getDay()];

                        return (
                            <Grid item xs={12} sm={6} md={3} lg={2} key={index} className="date-container" style={{ paddingLeft: '0', paddingTop: '0', borderRadius: '12px' }} >
                                <div className="date-card">
                                    <Typography className="title" sx={{fontFamily: 'font-nanumSquare-bold'}}>
                                        {day} ({dayOfWeek})
                                    </Typography>
                                    <Typography className="city" sx={{fontFamily: 'font-nanumSquare-light'}}>{weather.cityName}</Typography>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                                        alt={weather.main}
                                    />
                                    <Typography className="description">{weather.mainKo}</Typography>
                                    <div className="temp-container">
                                        <Typography className="temperature">
                                            {weather.tempMax}°C
                                        </Typography>
                                        <Typography className="temperature temperature-min">
                                            {weather.tempMin}°C
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Container>
    );
};

export default SectionHalf1;
