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
                    scrollToSection1={() => section1Ref.current.scrollIntoView({ behavior: 'smooth' })}
                    scrollToSection2={() => section2Ref.current.scrollIntoView({ behavior: 'smooth' })}
                    scrollToSection3={() => section3Ref.current.scrollIntoView({ behavior: 'smooth' })}
                    scrollToSection4={() => section4Ref.current.scrollIntoView({ behavior: 'smooth' })}
                />
            </div>

            <div ref={sectionHalf1Ref}>
                <SectionHalf1 />
            </div>

            <div ref={section1Ref}>
                <Section1 data={makPostData} />
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
