import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import MainHeader from "../Header/MainHeader";
import Footer from "../Foorter/Footer";

import Section1 from '../../components/DiaryByAPIPage/Section1Mak/Section1Mak';
import Section2 from '../../components/DiaryByAPIPage/Section2Tang/Section2Tang';
import Section3 from '../../components/DiaryByAPIPage/Section3Season/Section3Season';
import Section4 from '../../components/DiaryByAPIPage/Section4Top/Section4Top';
import axios from 'axios';
import "../../ui/DiaryByAPIPage/DiaryByAPIPage.css";

function DiaryByAPIPage() {

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

    //백엔드
    const [makPostData, setMakPostData] = useState([]);
    const [tangPostData, setTangPostData] = useState([]);
    const [seasonPostData, setSeasonPostData] = useState([]);
    const [topPostData, setTopPostData] = useState([]);

    useEffect(() => {
        getMakPostData();
        getTangPostData();
        getSeasonPostData();
        getTopPostData();
    }, []);

    const api_array = axios.create({
        baseURL: 'http://localhost:7777', // API의 기본 URL
        paramsSerializer: params => {
            return Object.entries(params)
                .map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return value.map(v => `${key}=${encodeURIComponent(v)}`).join('&');
                    }
                    return `${key}=${encodeURIComponent(value)}`;
                })
                .join('&');
        },
    });

    // 막걸리 데이터 요청
    const getMakPostData = async () => {
        try {
            const response = await api_array.get("/api/amadda/posts/topics", {
                params: { topicNames: ['막걸리'] },
            });
            setMakPostData(response.data);
            console.log("막걸리 데이터 : ", response.data);
        } catch (error) {
            console.error("Error fetching topic data:", error);
        }
    };

    // 탕 데이터 요청
    const getTangPostData = async () => {
        try {
            const response = await api_array.get("/api/amadda/posts/topics", {
                params: { topicNames: ['탕'] },
            });
            setTangPostData(response.data);
            console.log("탕 데이터 : ", response.data);
        } catch (error) {
            console.error("Error fetching topic data:", error);
        }
    };

    // 시즌 데이터 요청
    const getSeasonPostData = async () => {
        try {
            const response = await api_array.get("/api/amadda/posts/topics", {
                params: { topicNames: ['가을'] },
            });
            setSeasonPostData(response.data);
            console.log("시즌 데이터 : ", response.data);
        } catch (error) {
            console.error("Error fetching topic data:", error);
        }
    };

    // 인기 데이터 요청
    const getTopPostData = async () => {
        try {
            const response = await api_array.get("/api/amadda/posts/dailyViews", {});
            setTopPostData(response.data);
            console.log("인기 데이터 : ", response.data);
        } catch (error) {
            console.error("Error fetching topic data:", error);
        }
    };

    return (
        <div>
            <MainHeader />

            {/* 상단 배너 */}
            <Container maxWidth={false} disableGutters className="diaryAPI-full-width-banner">
                <Grid container className="diaryAPI-banner-grid">
                    {/* 비디오 배경 */}
                    <Grid item xs={12} className="diaryAPI-video-container">
                        <video className="diaryAPI-banner-video" src="/img/DiaryByAPIPage/Rainy.mp4" autoPlay loop playsInline />
                    </Grid>
                    {/* 텍스트 오버레이 */}
                    <Grid item xs={12} className="diaryAPI-banner-overlay">
                        <div className="diaryAPI-left-text">
                            <Typography variant="h6" className="diaryAPI-banner-title">
                                Autumn rain
                            </Typography>
                            <Typography variant="body1" className="diaryAPI-banner-subtext">
                                촉촉한 가을비, 입맛 돋우는 별미는?<br />
                                🍁 비 내리는 날, 더 맛있는 시간이 기다립니다
                            </Typography>
                            <Typography variant="body1" className={`diaryAPI-poem-line ${fade ? 'fade-in' : 'fade-out'}`}>
                                {currentPoemLine}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Container>

            {/* 각 섹션 컴포넌트 렌더링 */}
            <Section1 data={makPostData} />
            <Section2 data={tangPostData} />
            <Section3 data={seasonPostData}/>
            <Section4 data={topPostData}/>

            <Footer />
        </div>
    );
}

export default DiaryByAPIPage;
