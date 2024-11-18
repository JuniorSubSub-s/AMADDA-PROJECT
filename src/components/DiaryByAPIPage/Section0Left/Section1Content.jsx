import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { WiThermometer, WiHumidity, WiWindDeg, WiRaindrop, WiSunrise, WiSunset } from "react-icons/wi";
import "./Section1Content.css";

const Section1Content = ({ todayWeather }) => {

    console.log("오늘날씨보여줄 곳" + JSON.stringify(todayWeather, null, 2));

    // 현재 시간을 상태로 관리
    const [currentTime, setCurrentTime] = useState(new Date().getHours());
    const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.getHours());
            setCurrentMinute(now.getMinutes());
        }, 60000); // 1분마다 갱신

        return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 interval을 정리
    }, []);

    // 요일을 숫자로 가져오기 (0 = 일요일, 1 = 월요일, ..., 6 = 토요일)
    const now = new Date();
    const dayOfWeekNumber = now.getDay();

    // 요일을 문자열로 변환
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeekString = daysOfWeek[dayOfWeekNumber];

    // 월과 일을 가져와서 2자리로 포맷팅
    const month = (now.getMonth() + 1).toString().padStart(2, '0');  // getMonth()는 0부터 시작하므로 1을 더함
    const day = now.getDate().toString().padStart(2, '0');  // 1자리 수일 경우 앞에 '0'을 채움

    // MM-dd 형식으로 조합
    const formattedDate = `${month}.${day}`;

    return (
        <div>
            <Typography variant="body2" className="location">
                {todayWeather.cityName}
            </Typography>
            <Typography variant="body2" className="timestamp">
                {formattedDate}.({dayOfWeekString}) {currentTime}:{currentMinute < 10 ? `0${currentMinute}` : currentMinute} 현재
            </Typography>

            <div className="temperature-section">
                <Typography variant="h1" className="temperature">{todayWeather.temp}°C</Typography>
                <div className="feels-like">
                    체감({todayWeather.feelsLike}°C) <WiThermometer className="feels-like-icon" />
                </div>
            </div>

            <div className="weather-details">
                <div className="detail-item">
                    <WiHumidity className="icon" />
                    <Typography variant="body2" className='text-design'>습도</Typography>
                    <Typography variant="h6" className='text-design'>{todayWeather.humidity}%</Typography>
                </div>
                <div className="detail-item">
                    <WiWindDeg className="icon" />
                    <Typography variant="body2" className='text-design'>바람</Typography>
                    <Typography variant="h6" className='text-design'>{todayWeather.windDirection} {todayWeather.windSpeed}m/s</Typography>
                </div>
                <div className="detail-item">
                    <WiRaindrop className="icon" />
                    <Typography variant="body2" className='text-design'>3시간강수량</Typography>
                    <Typography variant="h6" className='text-design'>{todayWeather.rain}mm</Typography>
                </div>
            </div>
        </div>
    );
}

export default Section1Content;
