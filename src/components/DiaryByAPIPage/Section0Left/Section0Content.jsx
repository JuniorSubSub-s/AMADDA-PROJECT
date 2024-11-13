import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import "./Section0Content.css";

const Section0Content = () => {

    const poemDate = [
        "그대의 우산",
        "이문조",
        "비를 맞는 사람에게 살며시 다가가 우산을 씌워준다.",
        "누군가에게 우산이 되어 준다는 것 참 행복한 일이다.",
        "비 바람을 막아주는 우산",
        "나도 이세상 누군가를 위해",
        "몸도 마음도 젖지 않게 해주는 다정한 우산이 되고 싶다."
    ];

    const [poemLineIndex, setPoemLineIndex] = useState(0);
    const [currentPoemLine, setCurrentPoemLine] = useState(poemDate[0]);
    const [fade, setFade] = useState(true);

    // 시 내용 한 줄씩 등장 효과
    useEffect(() => {
        const poemInterval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentPoemLine(poemDate[poemLineIndex]);
                setPoemLineIndex((prevIndex) => (prevIndex + 1) % poemDate.length);
                setFade(true);
            }, 1000);
        }, 4000);
        return () => clearInterval(poemInterval);
    }, [poemLineIndex, poemDate]);

    return (
        <div>
            {/* 왼쪽 큰 배너 */}
            <div className="section0-banner-content">
                <Typography variant="h3" className="section0-title">Autumn rain</Typography>
                <Typography variant="h6" className="section0-subtext">
                    촉촉한 가을비, 입맛 돋우는 별미는?<br />
                    🍁 비 내리는 날, 더 맛있는 시간이 기다립니다
                </Typography>
                <div className="poem-line">
                    <Typography variant="body1" className={`poem-text ${fade ? 'fade-in' : 'fade-out'}`}>
                        {currentPoemLine}
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default Section0Content;