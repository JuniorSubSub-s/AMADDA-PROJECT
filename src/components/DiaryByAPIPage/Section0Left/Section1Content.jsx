import React from 'react';
import { Typography } from '@mui/material';
import { WiThermometer, WiHumidity, WiWindDeg, WiRaindrop, WiSunrise, WiSunset } from "react-icons/wi";
import "./Section1Content.css";

const Section1Content = () => {
    return (
        <div>
            <Typography variant="body2" className="location">
                서울 특별시 동작구 신대방제2동
            </Typography>
            <Typography variant="body2" className="timestamp">
                11.12.(화) 15:30 현재
            </Typography>

            <div className="temperature-section">
                <Typography variant="h1" className="temperature">21.4°C</Typography>
                <div className="feels-like">
                    체감(21.4°C) <WiThermometer className="feels-like-icon" />
                </div>
            </div>

            <Typography variant="h6" className="description">어제보다 2°C 높아요</Typography>

            <div className="weather-details">
                <div className="detail-item">
                    <WiHumidity className="icon" />
                    <Typography variant="body2" className='text-design'>습도</Typography>
                    <Typography variant="h6" className='text-design'>32%</Typography>
                </div>
                <div className="detail-item">
                    <WiWindDeg className="icon" />
                    <Typography variant="body2" className='text-design'>바람</Typography>
                    <Typography variant="h6" className='text-design'>남서 0.6m/s</Typography>
                </div>
                <div className="detail-item">
                    <WiRaindrop className="icon" />
                    <Typography variant="body2" className='text-design'>1시간강수량</Typography>
                    <Typography variant="h6" className='text-design'>-mm</Typography>
                </div>
            </div>

            <div className="sun-times">
                <div className="sun-item">
                    <WiSunrise className="sun-icon" />
                    <Typography variant="body2" className='text-design'>일출 07:08</Typography>
                </div>
                <div className="sun-bye">
                    <WiSunset className="sun-icon" />
                    <Typography variant="body2" className='text-design'>일몰 17:24</Typography>
                </div>
            </div>
        </div>
    );
}

export default Section1Content;
