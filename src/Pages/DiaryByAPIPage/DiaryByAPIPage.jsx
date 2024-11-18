import React, { useEffect, useState, useRef } from 'react';
import MainHeader from "../Header/MainHeader";
import Footer from "../Foorter/Footer";

import Section0 from '../../components/DiaryByAPIPage/Section0/Section0';
import SectionHalf1 from '../../components/DiaryByAPIPage/Section0.5/SectionHalf1';
import Section1 from '../../components/DiaryByAPIPage/Section1Mak/Section1Mak';
import Section2 from '../../components/DiaryByAPIPage/Section2Tang/Section2Tang';
import Section3 from '../../components/DiaryByAPIPage/Section3Season/Section3Season';
import Section4 from '../../components/DiaryByAPIPage/Section4Top/Section4Top';

import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';

import axios from 'axios';
import api from '../../api/axios';
import "../../ui/DiaryByAPIPage/DiaryByAPIPage.css";

function DiaryByAPIPage() {

    const section0Ref = useRef(null);
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    const section4Ref = useRef(null);
    const sectionHalf1Ref = useRef(null);

    const scrollToSection0 = () => section0Ref.current.scrollIntoView({ behavior: 'smooth' });
    const scrollToSection1 = () => section1Ref.current.scrollIntoView({ behavior: 'smooth' });
    const scrollToSection2 = () => section2Ref.current.scrollIntoView({ behavior: 'smooth' });
    const scrollToSection3 = () => section3Ref.current.scrollIntoView({ behavior: 'smooth' });
    const scrollToSection4 = () => section4Ref.current.scrollIntoView({ behavior: 'smooth' });
    const scrollToSectionHalf1 = () => sectionHalf1Ref.current.scrollIntoView({ behavior: 'smooth' });

    //백엔드
    const [makPostData, setMakPostData] = useState([]);
    const [tangPostData, setTangPostData] = useState([]);
    const [seasonPostData, setSeasonPostData] = useState([]);
    const [topPostData, setTopPostData] = useState([]);

    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [todayWeather, setTodayWeather] = useState("");

    // 처음에 위치 정보를 가져오는 useEffect
    useEffect(() => {
        getCurrentLocation();
    }, []);

    // 위치를 가져오는 함수
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude);
                setLon(position.coords.longitude);
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                setError("위치 정보를 가져오는데 실패했습니다.");
                setLoading(false);
            }
        );
    };

    // 날씨 데이터를 가져오는 함수
    const fetchWeather = async (latitude, longitude) => {
        try {
            const response = await api.get(`/api/weather?lat=${latitude}&lon=${longitude}`);
            const data = response.data;
    
            // 현재 시간과 가장 가까운 날씨 데이터를 찾는 로직
            const now = new Date();
            const currentTime = now.getHours();

            // UTC(협정 세계 시간)을 쓰고있어서 en-CA로 써줘야함
            // const todayDate = now.toISOString().split("T")[0];  // 오늘 날짜 (yyyy-mm-dd)
            const localDate = new Date().toLocaleDateString("en-CA"); // 로컬 기준 날짜
    
            const filtered = [];
            let closestWeather = null;
            let closestTimeDiff = Number.MAX_SAFE_INTEGER;  // 가장 작은 시간 차이를 저장할 변수
    
            data.forEach((weather) => {
                const weatherTime = parseInt(weather.time.split(":")[0]);  // 날씨 데이터 시간 (시 단위)
                const weatherDate = weather.date;
    
                // 오늘 날짜에 해당하는 날씨 데이터만 처리
                if (weatherDate === localDate) {
                    console.log("weatherDate : " + JSON.stringify(weather.date) );
                    console.log("localDate : " + localDate);
                    
                    
                    
                    const timeDiff = Math.abs(weatherTime - currentTime);  // 시간 차이 계산
                    if (timeDiff < closestTimeDiff) {
                        closestTimeDiff = timeDiff;
                        closestWeather = weather;  // 가장 가까운 시간의 날씨 데이터 저장
                    }
                } else {
                    filtered.push(weather);  // 오늘 날짜가 아닌 날씨 데이터는 나중에 저장
                }
            });
    
            // 가장 가까운 날씨 데이터를 첫 번째로 배치
            if (closestWeather) {
                filtered.unshift(closestWeather);
                setTodayWeather(closestWeather);
            }
    
            setWeatherData(filtered);  // 상태 업데이트
            
            
            setLoading(false);
        } catch (error) {
            setError("날씨 데이터를 가져오는데 실패했습니다.");
            setLoading(false);
        }
    };

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

            {/* 우측 고정 아이콘 */}
            <div className="scroll-icon-wrapper">
                <img
                    src="/img/DiaryViewPageImg/weatherIcon/Weather.png"
                    alt="Weather Icon"
                    className="scroll-icon"
                    onClick={scrollToSectionHalf1}
                />
                <span className="tooltip-text">이번주 날씨 확인!</span>

                {/* 상단 이동 아이콘 */}
                <FaArrowCircleUp
                    className="scroll-top-icon"
                    onClick={scrollToSection0}
                    title="맨 위로 이동"
                />
            </div>

            {/* Section0을 참조하는 div */}
            <div ref={section0Ref}>
                <Section0
                    todayWeather = {todayWeather}
                    scrollToSection1={() => section1Ref.current.scrollIntoView({ behavior: 'smooth' })}
                    scrollToSection2={() => section2Ref.current.scrollIntoView({ behavior: 'smooth' })}
                    scrollToSection3={() => section3Ref.current.scrollIntoView({ behavior: 'smooth' })}
                    scrollToSection4={() => section4Ref.current.scrollIntoView({ behavior: 'smooth' })}
                />
            </div>

            {/* 일별 예보 보여주는 컴포넌트 */}
            <div ref={sectionHalf1Ref} style={{ display: 'flex', justifyContent: 'center', width: '80%', margin: '0 auto' }}>
                <SectionHalf1 weatherData={weatherData} loading={loading} error={error} />
            </div>

            <div ref={section1Ref}>
                <Section1 data={makPostData} weatherData={weatherData} />
            </div>
            <div ref={section2Ref}>
                <Section2 data={tangPostData} />
            </div>
            <div ref={section3Ref}>
                <Section3 data={seasonPostData} />
            </div>
            <div ref={section4Ref}>
                <Section4 data={topPostData} />
            </div>

            <Footer />
        </div>
    );
}

export default DiaryByAPIPage;
