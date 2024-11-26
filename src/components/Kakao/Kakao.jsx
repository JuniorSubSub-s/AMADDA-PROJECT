import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import axios from "axios";
import './Kakao.css';
import BackgroundModal from '../PostModal/BackgroundModal';

const { kakao } = window;

// 카카오 본사의 위도, 경도를 상수로 분리
const KAKAO_HEADQUARTERS = {
  lat: 33.450701,
  lon: 126.570667,
};

// 핀 색상별 게시물 수 범위를 상수로 분리
const PIN_COLOR_RANGES = {
  Black: { min: 0, max: 50 },
  Red: { min: 50, max: 100 },
  Orange: { min: 100, max: 200 },
  Blue: { min: 200, max: 300 },
  Yellow: { min: 300, max: 400 },
  Purple: { min: 400, max: Infinity },
};

// 핀 이미지 URL을 상수로 분리
const PIN_IMAGES = {
  red: "https://i.ibb.co/mRNcwJS/Redpin.png",
  orange: "https://i.ibb.co/ydLwcmm/Orangepin.png",
  blue: "https://i.ibb.co/1vmz4xS/Bluepin.png",
  yellow: "https://i.ibb.co/WNXXnxb/Yellowpin.png",
  purple: "https://i.ibb.co/sWMbNYN/Peoplepin.png",
  black: "https://i.ibb.co/NVvQnJg/Blackpin.png",
};

function Kakao({ restaurants, pinColors, filters }) {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [useDefaultLocation, setUseDefaultLocation] = useState(false);
  const [openModal, setOpenModal] = useState(false); // 모달 열기/닫기 상태 추가
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시물 정보
  
  const mapRef = useRef(null); // map 객체를 useRef로 저장
  const currentOverlayRef = useRef(null); // 현재 오버레이 상태를 추적
  const markersRef = useRef([]); // 마커를 관리하기 위한 ref

  // 위치 정보 가져오기 함수를 useCallback으로 메모이제이션
  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setUseDefaultLocation(false);
      },
      (error) => {
        console.error("위치 정보를 가져올 수 없습니다.", error);
        setUseDefaultLocation(true);
      }
    );
  }, []);

  // 핀 이미지 URL을 반환하는 함수
  const getPinImageUrl = useCallback((color) => {
    return PIN_IMAGES[color] || PIN_IMAGES.black;
  }, []);

  // 핀 색상에 따른 게시물 수 범위 반환 함수
  const getPostCountForPinColor = useCallback((pinColor) => {
    return PIN_COLOR_RANGES[pinColor] || { min: 0, max: Infinity };
  }, []);

  // 레스토랑 필터링 로직
  const filteredRestaurants = useMemo(() => {
    const isHashtagSearch = filters.searchText?.startsWith("#");
    
    if (isHashtagSearch) return restaurants;

    return restaurants.filter((restaurant) => {
      const searchTextMatch = !filters.searchText || 
        restaurant.restaurantName.toLowerCase().includes(filters.searchText.toLowerCase());

      const pinColorMatch = !filters.pinColor || (() => {
        const { min, max } = getPostCountForPinColor(filters.pinColor);
        return restaurant.totalPost >= min && restaurant.totalPost < max;
      })();

      return searchTextMatch && pinColorMatch;
    });
  }, [restaurants, filters, getPostCountForPinColor]);

  // 레스토랑 핀 색상 매칭 함수
  const getRestaurantPinColor = useCallback((restaurantId) => {
    const index = restaurants.findIndex(restaurant => restaurant.restaurantId === restaurantId);
    const pinColor = pinColors[index];
    
    if (filters.pinColor === "Black" && restaurants[index]?.totalPost < 50) {
      return "black";
    }
    return pinColor || "black";
  }, [restaurants, pinColors, filters.pinColor]);

  // 게시물 데이터 로드 함수
  const loadPostData = useCallback(async (restaurantId) => {
    try {
      const response = await axios.get(`http://localhost:7777/api/restaurants/${restaurantId}/posts`);
      return response.data.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
    } catch (error) {
      console.error("포스트 데이터를 가져오는 데 실패했습니다.", error);
      return [];
    }
  }, []);

  // 날짜 포맷팅 함수
  const formatDateToMinutes = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  // 오버레이 생성 함수
  const createOverlay = useCallback(async (restaurant, marker, map) => {
    const posts = await loadPostData(restaurant.restaurantId);
    const hashtagSearchText = filters.searchText?.slice(1).trim().toLowerCase() || '';
    const searchTags = hashtagSearchText.split(/\s+/);

    const filteredPosts = posts.filter(post => {
      const moodMatch = !filters.mood?.length || 
        filters.mood.includes('전체') || 
        (post.mood && filters.mood.includes(post.mood));

      const topicMatch = !filters.topic?.length || 
        filters.topic.includes('전체') || 
        (post.topicNames?.some(topic => filters.topic.includes(topic)));

      const receiptVerificationMatch = !filters.verification?.length || 
        filters.verification.includes(post.receiptVerification ? '인증' : '미인증');

      const hashtagMatch = !filters.searchText?.startsWith("#") || 
        searchTags.some(tag => post.tagNames?.some(postTag => 
          postTag.toLowerCase().includes(tag)));

      const pinColorMatch = !filters.pinColor || (() => {
        const { min, max } = getPostCountForPinColor(filters.pinColor);
        return restaurant.totalPost >= min && restaurant.totalPost < max;
      })();

      return moodMatch && topicMatch && receiptVerificationMatch && 
             hashtagMatch && pinColorMatch;
    });

    if (filteredPosts.length === 0) {
      marker.setMap(null);
      return;
    }

    const content = `
      <div class="overlay-wrap">
        <div class="overlay-info">
          <div class="overlay-title">${restaurant.restaurantName}</div>
        </div>
        <div class="overlay-body">
          ${filteredPosts.length > 0
            ? filteredPosts.map(post => `
                <div class="overlay-post-item" data-post-id="${post.postId}">
                  <div class="overlay-img">
                    <img src="${post.foodImageUrls?.[0] || ''}" width="100%" height="100%">
                  </div>
                  <div class="overlay-post-text-container">
                    <div class="overlay-post-title">
                      <strong>${post.postTitle}</strong>
                    </div>
                    <div class="overlay-post-nickname">${post.userNickname}</div>
                    <div class="overlay-post-date">
                      <span>작성일: ${formatDateToMinutes(post.postDate)}</span>
                    </div>
                  </div>
                </div>
              `).join('')
            : '<div>필터에 맞는 게시물이 없습니다.</div>'
          }
        </div>
      </div>
    `;

    const customOverlay = new kakao.maps.CustomOverlay({
      content: content,
      map: null,
      position: marker.getPosition(),
      yAnchor: 1.15,
      xAnchor: -0.05,
    });

    // DOM 요소 생성 및 이벤트 처리
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;

    // 휠 이벤트 처리
    contentDiv.addEventListener('wheel', (e) => {
      e.stopPropagation();
    });

    // 게시물 클릭 이벤트
    contentDiv.addEventListener('click', (e) => {
      const postItem = e.target.closest('.overlay-post-item');
      if (postItem) {
        const postId = postItem.getAttribute('data-post-id');
        const post = filteredPosts.find(p => p.postId.toString() === postId);
        if (post) {
          setSelectedPost(post);
          setOpenModal(true);
        }
      }
    });

    // 마커 이벤트 리스너
    kakao.maps.event.addListener(marker, 'mouseover', () => {
      if (currentOverlayRef.current) {
        currentOverlayRef.current.setMap(null);
      }
      customOverlay.setMap(map);
      currentOverlayRef.current = customOverlay;
    });

    kakao.maps.event.addListener(marker, 'mouseout', () => {
      setTimeout(() => {
        customOverlay.setMap(null);
      }, 10000);
    });

    customOverlay.setContent(contentDiv);
  }, [filters, loadPostData, getPostCountForPinColor, formatDateToMinutes]);

  // 모달 관련 핸들러
  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setSelectedPost(null);
  }, []);

  // 초기 위치 정보 가져오기
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  // 지도 및 마커 관리
  useEffect(() => {
    // 지도 객체 초기화
    if (!mapRef.current) {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(
          location.lat || KAKAO_HEADQUARTERS.lat,
          location.lon || KAKAO_HEADQUARTERS.lon
        ),
        level: 3,
      };
      mapRef.current = new kakao.maps.Map(container, options);
    }

    const map = mapRef.current;

    // 기존 마커 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // 필터링된 레스토랑에 대한 마커 생성
    filteredRestaurants.forEach(restaurant => {
      const position = new kakao.maps.LatLng(
        restaurant.locationLatitude,
        restaurant.locationLongitude
      );

      const marker = new kakao.maps.Marker({
        position: position,
        title: restaurant.restaurantName,
      });

      const pinColor = getRestaurantPinColor(restaurant.restaurantId);
      const markerImage = new kakao.maps.MarkerImage(
        getPinImageUrl(pinColor),
        new kakao.maps.Size(25, 30),
        { offset: new kakao.maps.Point(12, 35) }
      );

      marker.setImage(markerImage);
      marker.setMap(map);
      markersRef.current.push(marker);

      createOverlay(restaurant, marker, map);
    });

    // 기본 위치 마커 (필요한 경우)
    if (useDefaultLocation) {
      const kakaoHQPosition = new kakao.maps.LatLng(
        KAKAO_HEADQUARTERS.lat,
        KAKAO_HEADQUARTERS.lon
      );
      const kakaoHQMarker = new kakao.maps.Marker({
        position: kakaoHQPosition,
        title: "카카오 본사",
      });
      kakaoHQMarker.setMap(map);
    }

    // 위치 업데이트 시 지도 중심 변경
    if (location.lat !== null && location.lon !== null) {
      const newCenter = new kakao.maps.LatLng(location.lat, location.lon);
      map.setCenter(newCenter);
    }

  }, [
    location,
    useDefaultLocation,
    filteredRestaurants,
    getRestaurantPinColor,
    getPinImageUrl,
    createOverlay
  ]);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
      <BackgroundModal 
        open={openModal} 
        handleClose={handleCloseModal} 
        post={selectedPost} 
      />
    </>
  );
}

export default Kakao;