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

    // 데이터 상태 관리

    const [seasonPostData, setSeasonPostData] = useState([]);
    const [topPostData, setTopPostData] = useState([]);

    const [section1Data, setSection1Data] = useState([]);
    const [section2Data, setSection2Data] = useState([]);

    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [todayWeather, setTodayWeather] = useState("");

    // 위치 정보 상태
    const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });

    // 위치 정보 가져오기
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    console.log('User location : ', { latitude, longitude });
                },
                (error) => {
                    console.log('Error fetching location: ', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        getCurrentLocation();
    }, []);

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

    const fetchWeather = async (latitude, longitude) => {
        try {
            const response = await api.get(`/api/weatherDetails?lat=${latitude}&lon=${longitude}`);
            const data = response.data;

            const now = new Date();
            const currentTime = now.getHours();

            const localDate = new Date().toLocaleDateString("en-CA");

            const filtered = [];
            let closestWeather = null;
            let closestTimeDiff = Number.MAX_SAFE_INTEGER;

            data.forEach((weather) => {
                weather.temp = Math.floor(weather.temp);
                weather.tempMin = Math.floor(weather.tempMin);
                weather.tempMax = Math.floor(weather.tempMax);
                weather.feelsLike = Math.floor(weather.feelsLike);

                const weatherTime = parseInt(weather.time.split(":")[0]);
                const weatherDate = weather.date;

                if (weatherDate === localDate) {
                    const timeDiff = Math.abs(weatherTime - currentTime);
                    if (timeDiff < closestTimeDiff) {
                        closestTimeDiff = timeDiff;
                        closestWeather = weather;
                    }
                } else {
                    filtered.push(weather);
                }
            });

            if (closestWeather) {
                filtered.unshift(closestWeather);
                setTodayWeather(closestWeather);
            }

            setWeatherData(filtered);
            setLoading(false);
        } catch (error) {
            setError("날씨 데이터를 가져오는데 실패했습니다.");
            setLoading(false);
        }
    };

    useEffect(() => {
        getSeasonPostData();
        getTopPostData();
    }, []);

    const api_array = axios.create({
        baseURL: 'http://localhost:7777',
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

    const fetchDataByTopic = async (topicName) => {
        console.log(`${topicName} 요청`);

        try {
            const response = await api_array.get("/api/amadda/posts/topics", {
                params: { topicNames: [topicName] },
            });
            console.log(`${topicName} 데이터 : `, response.data);

            switch (topicName) {
                case '흑백요리사':
                    setSection1Data(response.data);
                    break;
                case '라멘':
                    setSection2Data(response.data);
                    break;
                case '가을':
                    setSeasonPostData(response.data);
                    break;
                default:
                    console.warn("Unhandled topic name:", topicName);
            }
        } catch (error) {
            console.error(`Error fetching ${topicName} data:`, error);
        }
    };

    useEffect(() => {
        if (!todayWeather.mainKo) return;
    
        const topicMapping = {
            "맑음": ["막걸리", "탕"],
            "비": ["막걸리", "라멘"],
            "구름": ["흑백요리사", "라멘"]
        };
    
        const topics = topicMapping[todayWeather.mainKo] || [];
        if (topics.length > 0) {
            topics.forEach((topic) => fetchDataByTopic(topic));
        }
    }, [todayWeather.mainKo]);

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

            <div className="scroll-icon-wrapper">
                <img
                    src="/img/DiaryViewPageImg/weatherIcon/Weather.png"
                    alt="Weather Icon"
                    className="scroll-icon"
                    onClick={scrollToSectionHalf1}
                />
                <span className="tooltip-text">이번주 날씨 확인!</span>

                <FaArrowCircleUp
                    className="scroll-top-icon"
                    onClick={scrollToSection0}
                    title="맨 위로 이동"
                />
            </div>

            <div ref={section0Ref}>
                <Section0
                    userLocation={userLocation}
                    todayWeather={todayWeather}
                    scrollToSection1={scrollToSection1}
                    scrollToSection2={scrollToSection2}
                    scrollToSection3={scrollToSection3}
                    scrollToSection4={scrollToSection4}
                />
            </div>

            <div ref={sectionHalf1Ref} style={{ display: 'flex', justifyContent: 'center', width: '80%', margin: '0 auto' }}>
                <SectionHalf1 weatherData={weatherData} loading={loading} error={error} />
            </div>

            <div ref={section1Ref}>
                <Section1 data={section1Data} todayWeather={todayWeather.mainKo} />
            </div>
            <div ref={section2Ref}>
                <Section2 data={section2Data} todayWeather={todayWeather.mainKo} />
            </div>
            <div ref={section3Ref}>
                <Section3 data={seasonPostData} todayWeather={todayWeather.mainKo} />
            </div>
            <div ref={section4Ref}>
                <Section4 data={topPostData} todayWeather={todayWeather.mainKo} />
            </div>

            <Footer />
        </div>
    );
}

export default DiaryByAPIPage;
