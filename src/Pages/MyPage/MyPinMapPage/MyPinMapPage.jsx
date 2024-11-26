import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Box, Typography, Container } from "@mui/material";

import MainHeader from "../../Header/MainHeader";
import PostSection2 from "../../../components/MyPage/MyPinMap/PostSection2/PostSection2";
import "../../../ui/MyPage/MyPinMapPage/MyPinMapPage.css";
import api from "../../../api/axios";

const { kakao } = window;

const MyPinMapPage = () => {
    const { userId } = useParams();
    const mapRef = useRef(null); // 지도 객체 저장
    const [lat, setLat] = useState(null); // 현재 위도
    const [lon, setLon] = useState(null); // 현재 경도
    const [pinColors, setPinColors] = useState([]); // 핀 색상
    const [restaurants, setRestaurants] = useState([]); // 레스토랑 정보

    // 사용자 위치 가져오기
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude);
                setLon(position.coords.longitude);
            },
            () => {
                // 기본 위치 (대한민국 전체를 포함하는 중심 좌표)
                setLat(37.5);   // 대한민국 중심 위도
                setLon(128.0);  // 대한민국 중심 경도
            }
        );
    };

    // 핀 색상 가져오기
    const fetchPinColors = async () => {
        try {
            const pinColorsResponse = await api.get("https://amadda.kr:7777/api/restaurants/pins");
            setPinColors(pinColorsResponse.data);
        } catch (error) {
            console.error("핀 색상 정보를 가져오는 데 실패했습니다:", error);
        }
    };

     // 레스토랑 게시물 가져오기
     const fetchRestaurants = async (restaurantId) => {
        console.log( "레스토랑 아이디 :" , restaurantId);
        try {
            if (!restaurantId) {
                console.error("restaurantId가 유효하지 않습니다.");
                return;
            }
            const response = await api.get(`https://amadda.kr:7777/api/restaurants/${restaurantId}/posts`);
            setRestaurants(response.data); // 레스토랑 게시물 정보 저장
        } catch (error) {
            console.error("레스토랑 정보를 가져오는 데 실패했습니다:", error);
        }
    };

    // 지도 초기화
    useEffect(() => {
        getCurrentLocation();
        fetchPinColors();
        fetchRestaurants();
    }, []);


    useEffect(() => {
        if (lat && lon) {
            const container = document.getElementById("kakao-map"); // 지도 표시 영역
            const options = {
                center: new kakao.maps.LatLng(lat, lon), // 초기 중심 좌표
                level: 13, // 확대 레벨
            };

            // 지도 생성
            const map = new kakao.maps.Map(container, options);
            mapRef.current = map;

            // 레스토랑 핀을 지도에 표시
            if (restaurants.length > 0) {
                restaurants.forEach((restaurant) => {
                    const { locationLatitude, locationLongitude, pinColor } = restaurant;
                    const moveLatLon = new kakao.maps.LatLng(locationLatitude, locationLongitude);

                    // 핀 색상에 맞는 이미지 URL을 가져옵니다.
                    const pinImageUrl = getPinImageUrl(pinColor);

                    // 마커 이미지 설정
                    const markerImage = new kakao.maps.MarkerImage(
                        pinImageUrl,
                        new kakao.maps.Size(40, 40) // 마커 크기 설정
                    );

                    const marker = new kakao.maps.Marker({
                        position: moveLatLon,
                        image: markerImage, // 마커에 이미지 적용
                    });

                    marker.setMap(mapRef.current); // 지도에 마커 표시
                });
            }
        }
    }, [lat, lon, restaurants]);

    // 핀 색상에 맞는 이미지 URL 반환
    const getPinImageUrl = (color) => {
        switch (color) {
            case "red":
                return "https://i.ibb.co/mRNcwJS/Redpin.png";
            case "orange":
                return "https://i.ibb.co/ydLwcmm/Orangepin.png";
            case "blue":
                return "https://i.ibb.co/1vmz4xS/Bluepin.png";
            case "yellow":
                return "https://i.ibb.co/WNXXnxb/Yellowpin.png";
            case "purple":
                return "https://i.ibb.co/sWMbNYN/Peoplepin.png";
            case "black":
            default:
                return "https://i.ibb.co/NVvQnJg/Blackpin.png";
        }
    };

    // 게시물에서 클릭한 핀 위치로 지도 이동
    const handleMarkerClick = (restaurant) => {
        const { locationLatitude, locationLongitude, pinColor } = restaurant;
        if (mapRef.current) {
            const moveLatLon = new kakao.maps.LatLng(locationLatitude, locationLongitude);
            mapRef.current.setCenter(moveLatLon);
            mapRef.current.setLevel(1);

            // 핀 색상에 맞는 이미지 URL을 가져옵니다.
            const pinImageUrl = getPinImageUrl(pinColor);

            // 마커 이미지 설정
            const markerImage = new kakao.maps.MarkerImage(
                pinImageUrl,
                new kakao.maps.Size(40, 40) // 마커 크기 설정
            );
            const marker = new kakao.maps.Marker({
                position: moveLatLon,
                image: markerImage, // 마커에 이미지 적용
            });
            marker.setMap(mapRef.current); // 지도에 마커 표시
        }
    };

    return (
        <div>
            <MainHeader />

            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Box
                    className="mypinmap-page"
                    sx={{ p: 3, backgroundColor: "#f8f8f8", borderRadius: 2 }}
                >
                    <Typography
                        variant="h5"
                        className="mypinmap-title"
                        sx={{ mb: 2 }}
                    >
                        나의 핀 맵
                    </Typography>

                    <Grid container spacing={3}>
                        {/* 좌측 지도 영역 */}
                        <Grid item xs={12} md={6}>
                            <Box
                                className="map-container"
                                sx={{
                                    width: "95%",
                                    height: "550px",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                {/* 카카오맵 표시 영역 */}
                                <div
                                    id="kakao-map"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                ></div>
                            </Box>
                        </Grid>

                        {/* 우측 게시물 영역 */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ height: "550px", overflowY: "auto" }}>
                                <PostSection2 userId={userId} handleMarkerClick={handleMarkerClick} pinColors={pinColors} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default MyPinMapPage;
