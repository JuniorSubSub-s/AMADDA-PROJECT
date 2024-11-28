import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Box, Typography, Container } from "@mui/material";

import MainHeader from "../../Header/MainHeader";
import PostSection2 from "../../../components/MyPage/MyPinMap/PostSection2/PostSection2";
import "../../../ui/MyPage/MyPinMapPage/MyPinMapPage.css";
import api from "../../../api/axios";
import getUserId from "../../../utils/getUserId";

const { kakao } = window;

const MyPinMapPage = () => {
    const { userId } = useParams();
    const [restaurants, setRestaurants] = useState([]); // 레스토랑 정보
    const mapRef = useRef(null); // 지도 객체 저장
    const markersRef = useRef([]); // 마커 객체 저장
    const initialCenter = { lat: 37.5, lon: 128.0 }; // 초기 중심 좌표

    // 사용자 위치 가져오기
    const getCurrentLocation = async () => {
        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
                },
                () => {
                    resolve(initialCenter);
                }
            );
        });
    };

    // 레스토랑 정보 가져오기
    const fetchRestaurants = async () => {
        try {
            const [restaurants, pinColorsRes] = await Promise.all([
                api.get(`${process.env.REACT_APP_API_BASE_URL}/restaurants/mapPost/${getUserId()}/posts`),
                api.get(`${process.env.REACT_APP_API_BASE_URL}/restaurants/pins`),
            ]);

            const pinColors = pinColorsRes.data;

            // 레스토랑 데이터에 핀 생상 추가
            const updateRestaurants = restaurants.data.map((restaurant) => {
                const pinColor = pinColors.find(
                    (pin) => pin.restaurantId === restaurant.restaurant.restaurantId
                )?.color || "black";
                return { ...restaurant, pinColor };
            });

            setRestaurants(updateRestaurants);
        } catch (error) {
            console.error("레스토랑 정보를 가져오는 데 실패했습니다:", error.response?.data || error.message);
        }
    };

    // 지도 초기화
    const initializeMap = async () => {
        const userLocation = await getCurrentLocation();
        const container = document.getElementById("kakao-map");
        const options = {
            center: new kakao.maps.LatLng(userLocation.lat, userLocation.lon),
            level: 13,
        };

        mapRef.current = new kakao.maps.Map(container, options);
    };

    const updateMarkers = (data) => {
        if (!mapRef.current) return;

        // 기존 마커 제거
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        // 새로운 마커 추가
        data.forEach((restaurant) => {
            const { locationLatitude, locationLongitude, totalPost } = restaurant.restaurant;
            if (locationLatitude && locationLongitude) {
                const position = new kakao.maps.LatLng(locationLatitude, locationLongitude);
                const pinImageUrl = getPinImageUrl(totalPost);

                const markerImage = new kakao.maps.MarkerImage(pinImageUrl, new kakao.maps.Size(40, 40));
                const marker = new kakao.maps.Marker({
                    position,
                    image: markerImage,
                });

                marker.setMap(mapRef.current);
                markersRef.current.push(marker);

                // 마커 클릭 이벤트
                kakao.maps.event.addListener(marker, "click", () => {
                    mapRef.current.setCenter(position);
                    mapRef.current.setLevel(3);
                });
            }
        });
    };

    // 핀 색상에 맞는 이미지 URL 반환
    const getPinImageUrl = (totalPost) => {
        if (totalPost >= 10) return "https://i.ibb.co/mRNcwJS/Redpin.png";
        if (totalPost >= 7) return "https://i.ibb.co/ydLwcmm/Orangepin.png";
        if (totalPost >= 5) return "https://i.ibb.co/1vmz4xS/Bluepin.png";
        if (totalPost >= 3) return "https://i.ibb.co/WNXXnxb/Yellowpin.png";
        if (totalPost >= 1) return "https://i.ibb.co/sWMbNYN/Peoplepin.png";
        return "https://i.ibb.co/NVvQnJg/Blackpin.png";
    };

    // 게시물에서 클릭한 핀 위치로 지도 이동
    const handleMarkerClick = (restaurant) => {
        const { locationLatitude, locationLongitude } = restaurant;

        if (mapRef.current && locationLatitude && locationLongitude) {
            const position = new kakao.maps.LatLng(locationLatitude, locationLongitude);
            mapRef.current.setCenter(position);
            mapRef.current.setLevel(3);
        }
    };

    // 데이터 로드 및 초기화
    useEffect(() => {
        const initialize = async () => {
            await initializeMap();
            await fetchRestaurants();
        };

        initialize();
    }, []);

    // 지도 마커 업데이트
    useEffect(() => {
        if (restaurants.length > 0) {
            updateMarkers(restaurants);
        }
    }, [restaurants]);

    return (
        <div>
            <MainHeader />
            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Box
                    className="mypinmap-page"
                    sx={{ p: 3, backgroundColor: "#f8f8f8", borderRadius: 2 }}
                >
                    <Typography variant="h5" className="mypinmap-title" sx={{ mb: 2 }}>
                        나의 핀 맵 📍
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
                                <div id="kakao-map" style={{ width: "100%", height: "100%" }}></div>
                            </Box>
                        </Grid>

                        {/* 우측 게시물 영역 */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ height: "550px", overflowY: "auto" }}>
                                <PostSection2 userId={userId} handleMarkerClick={handleMarkerClick} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default MyPinMapPage;