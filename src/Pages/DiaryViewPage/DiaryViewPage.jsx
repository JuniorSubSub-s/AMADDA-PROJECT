
import MainHeader from "../Header/MainHeader";
import Footer from "../Foorter/Footer";
import MainRecentDiary from "./MainRecentDiary";
import TopHotDiary from "./TopHotDiary";
import TravelMatzip from "./TravelMatzip";
import TabPanel from "./TabPanel";
// import { useState, useEffect } from "react";
import "../../ui/DiaryViewPage/DiaryViewPage.css";

function DiaryViewPage() {

    // // 날씨와 이미지 경로를 관리하는 상태
    // const [currentWeather, setCurrentWeather] = useState("sunny"); // 테스트용으로 sunny로 설정
    // const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // const [lat, setLat] = useState("");
    // const [lon, setLon] = useState("");

    // // 날씨에 따른 이미지 경로 배열
    // const images = {
    //     sunny: [
    //         'http://localhost:7777/img/Sunny/image1.jpg',
    //         'http://localhost:7777/img/Sunny/image2.jpg',
    //         'http://localhost:7777/img/Sunny/image3.jpg',
    //         'http://localhost:7777/img/Sunny/image4.jpg',
    //         'http://localhost:7777/img/Sunny/image5.jpg',
    //     ],
    // };
    // useEffect(() => {
    //     getCurrentLocation();
    //     // 5초마다 이미지 인덱스 변경
    //     const intervalId = setInterval(() => {
    //         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images[currentWeather].length);
    //     }, 10000);
    //     return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
    // }, []);

    //     // 현재 위치 가져오기
    // const getCurrentLocation = () => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         setLat(position.coords.latitude);
    //         setLon(position.coords.longitude);
    //         console.log("현재 위치", position.coords.latitude, position.coords.longitude);
    //         // 위치를 가져온 후 날씨 API 호출
    //         getWeatherByCurrentLocation(position.coords.latitude, position.coords.longitude);
    //     });
    // };
    // // 현재 위치 날씨 API 가져오기
    // const getWeatherByCurrentLocation = async (latitude, longitude) => {
    //     console.log("전달받은 위치 : " + "lat = "  + latitude + 'lon = ' + longitude);
        
    //     try {
    //         let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6579c5fe59caa6e99be282f39b8d2d3e&units=metric`;
    //         let response = await fetch(url);
    //         if (!response.ok) {
    //             throw new Error('날씨 데이터를 가져오는 데 실패했습니다.');
    //         }
    //         let data = await response.json();
    //         console.log(data);
    //         console.log(data.name);
    //         console.log("현재 날씨는 : " + data.weather[0].description);
    //         console.log("최고 기온 : " + data.main.temp_max);
    //         console.log("최저 기온 : " + data.main.temp_min);
            
            
            
    //         // 날씨 데이터에 따라 currentWeather 업데이트
    //         // setCurrentWeather(data.weather[0].main.toLowerCase()); // 예: "Clear", "Clouds", "Rain" 등을 "clear", "clouds", "rain"으로 변환
    //     } catch (error) {
    //         console.error("오류:", error);
    //     }
    // };

    return (
        <div>
            <MainHeader />
            {/* PostMain에있는 상단 이미지와 카테고리 검색 바(TabPanel) */}
            <div
                className="background"
                style={{
                    backgroundImage: `url(http://localhost:7777/img/Sunny/image4.jpg)`,
                }}
            >
                <div className="diary-page-title-container">
                    <div className="page-title">지역별 HOT PIN 맛집</div>
                    <div className="page-subject">
                        <div className="text-subject-1">제일 HOT한</div>
                        <div className="text-subject-2">맛집을 찾아보세요</div>
                    </div>
                </div>
                <div className="diary-tabpanel-container">
                    <TabPanel />
                </div>
            </div>
            <MainRecentDiary />
            <TopHotDiary />
            <TravelMatzip />
            <Footer />
        </div>
    );
}
export default DiaryViewPage;
