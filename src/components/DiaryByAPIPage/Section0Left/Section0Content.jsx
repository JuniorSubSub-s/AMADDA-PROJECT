import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import "./Section0Content.css";

const Section0Content = ({ weatherCondition }) => {
    // 날씨별 시 데이터
    const poems = {
        맑음: [
            "아무렇지도 않게 맑은 날",
            "진동규",
            "솔 꽃가루 쌓인",
            "토방 마루",
            "소쩍새 울음 몇",
            "몸 부리고 앉아",
            "피먹진 소절을 널어 말립니다",
            "산 발치에서는 한바탕",
            "보춘화 꽃대궁 어지럽더니",
            "진달래 철쭉 몸 사르더니",
            "골짝 골짝",
            "오늘도",
            "아무렇지도 않게 맑은 날",
            "쌓인 송홧가루",
            "밭은기침을 합니다.",
        ],
        비: [
            "그대의 우산",
            "이문조",
            "비를 맞는 사람에게 살며시 다가가 우산을 씌워준다.",
            "누군가에게 우산이 되어 준다는 것 참 행복한 일이다.",
            "비 바람을 막아주는 우산",
            "나도 이세상 누군가를 위해",
            "몸도 마음도 젖지 않게 해주는 다정한 우산이 되고 싶다."
        ],
        구름: [
            "어떤 흐린 날",
            "박정만",
            "내 마음의 어느 모래밭에",
            "꽃잎처럼 찍혀진 발자욱 하나",
            "사랑의 잔물결 마냥 꽃무동서니",
            "날 저물고 비 내리면 어찌하나",
            "꿈은",
            "오지 않을 길처럼 사라지고",
            "사랑은",
            "금단의 열매처럼 멀어졌으니"
        ],
        Thunder: [
            "천둥",
            "이문재",
            "마른번개가 쳤다",
            "12시 방향이었다",
            "너는 너의 인생을 읽어보았느냐",
            "몇 번이나 소리 내어 읽어보았느냐"
        ],
        눈: [
            "눈",
            "윤동주",
            "지난 밤에",
            "눈이 소오복히 왔네",
            "지붕이랑",
            "길이랑 밭이랑",
            "추워한다고",
            "덮어주는 이불인가봐",
            "그러기에"
        ]
    };

    // 날씨별 타이틀 데이터
    const titles = {
        맑음: "Bright Sunny Day",
        비: "Gentle Rainfall",
        구름: "Overcast Sky",
        Thunder: "Thunderstorm",
        눈: "Snowy Wonder"
    };

    // 현재 날씨 조건에 따른 시 선택
    const poemDate = poems[weatherCondition] || [""];
    const title = titles[weatherCondition] || "Weather Unknown";

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
            <Typography variant="h3" className="section0-title">{title}</Typography>
                <Typography variant="h6" className="section0-subtext">
                    {weatherCondition === "비" ? "촉촉한 가을비, 입맛 돋우는 별미는?" : ""}
                    {weatherCondition === "맑음" ? "맑은 하늘, 새로운 시작의 느낌을 담아보세요." : ""}
                    {weatherCondition === "구름" ? "구름이 잔뜩 낀 날, 고요한 분위기를 즐겨보세요." : ""}
                    {weatherCondition === "Thunder" ? "천둥소리가 울리는 날, 깊은 생각에 잠겨보세요." : ""}
                    {weatherCondition === "눈" ? "포근한 눈의 세계로 빠져보세요." : ""}
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
