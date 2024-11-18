import { useState, useEffect } from "react";
import api from "../../api/axios";  // axios 인스턴스를 import

function TestWeatherPage() {
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    // 처음에 위치 정보를 가져오는 useEffect
    useEffect(() => {
        getCurrentLocation();
    }, []);

    // 위치를 가져오는 함수
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
            fetchWeather(position.coords.latitude, position.coords.longitude);
        });
    };

    // 날씨 데이터를 가져오는 함수
    const fetchWeather = async (latitude, longitude) => {
        try {
            const response = await api.get(`/api/weather?lat=${latitude}&lon=${longitude}`);
            const data = response.data;

            console.log(response.data);

            // 현재 시간과 날짜를 가져옴
            const now = new Date();
            const currentTime = now.getHours();  // 현재 시간을 숫자 형태로 가져오기
            console.log("현재 시간 : " + currentTime);

            // 오늘 날짜를 계산 (현재 날짜의 'YYYY-MM-DD' 형태)
            const todayDate = now.toISOString().split('T')[0];  // "YYYY-MM-DD"
            console.log("현재 날짜 : " + todayDate);

            const filtered = [];
            let closestWeather = null;
            let closestTimeDiff = Number.MAX_SAFE_INTEGER; // 가장 작은 시간 차이를 추적할 변수

            // 데이터에서 오늘 날짜의 시간과 가장 가까운 데이터를 찾음
            data.forEach((weather) => {
                const weatherTime = parseInt(weather.time.split(':')[0]);  // 시간 부분만 정수로 파싱
                console.log("받은 데이터의 시간 : " + weatherTime);

                const weatherDate = weather.date;
                console.log("받은 데이터의 날짜 : " + weatherDate);

                if (weatherDate === todayDate) {
                    // 오늘 날짜일 경우
                    const timeDiff = Math.abs(weatherTime - currentTime); // 현재 시간과의 차이 계산

                    // 현재 시간과 가장 차이가 적은 데이터 추적
                    if (timeDiff < closestTimeDiff) {
                        closestTimeDiff = timeDiff;
                        closestWeather = weather;
                    }
                } else {
                    // 오늘 날짜가 아닌 경우 그대로 저장
                    filtered.push(weather);
                }
            });

            // 오늘 날짜의 가장 가까운 시간 데이터가 있다면 필터링된 리스트에 추가
            if (closestWeather) {
                filtered.unshift(closestWeather);  // 가장 가까운 데이터를 맨 앞에 추가
            }

            // 필터링된 데이터를 상태에 저장
            setFilteredData(filtered);

        } catch (error) {
            console.error("오류:", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>날씨 예보</h1>
            {filteredData.length === 0 ? (
                <p>날씨 데이터를 불러오는 중...</p>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    {filteredData.map((weather, index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                borderRadius: "8px",
                                textAlign: "center",
                                width: "200px",
                            }}
                        >
                            <p><strong>{weather.date}</strong></p>
                            <p><strong>{weather.cityName}</strong></p>
                            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.main} />
                            <p>{weather.main}</p>
                            <p>현재 온도: {weather.temp}°C</p>
                            <p>최저 기온: {weather.tempMin}°C</p>
                            <p>최고 기온: {weather.tempMax}°C</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TestWeatherPage;
