import { useEffect, useState, useRef } from "react";
import axios from "axios"; // Axios import
import './Kakao.css';

const { kakao } = window;

function Kakao({ restaurants, pinColors }) {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [useDefaultLocation, setUseDefaultLocation] = useState(false);

  const currentOverlayRef = useRef(null); // useRef를 사용하여 오버레이 상태 추적

  // 카카오 본사의 위도, 경도 (위치 권한을 거부하거나 위치를 못 찾으면 기본 값으로 사용)
  const kakaoHeadquarters = {
    lat: 33.450701,
    lon: 126.570667,
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setUseDefaultLocation(false); // 위치 권한이 허용되었으므로 기본 위치를 사용하지 않음
      },
      (error) => {
        console.error("위치 정보를 가져올 수 없습니다.", error);
        setUseDefaultLocation(true);
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    // 지도 생성 시 실행되는 함수
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(lat || kakaoHeadquarters.lat, lon || kakaoHeadquarters.lon),
      level: 3,
    };

    // 카카오 맵 객체 생성
    const map = new kakao.maps.Map(container, options);

    // 레스토랑 데이터를 이용하여 지도에 마커 추가
    restaurants.forEach((restaurant, index) => {
      const position = new kakao.maps.LatLng(restaurant.locationLatitude, restaurant.locationLongitude);
      const marker = new kakao.maps.Marker({
        position: position,
        title: restaurant.restaurantName,
      });

      const pinColor = pinColors[index] || "black";
      const markerImage = new kakao.maps.MarkerImage(
        getPinImageUrl(pinColor),
        new kakao.maps.Size(25, 30), // 핀의 크기 (가로 25px, 세로 30px)
        {
          offset: new kakao.maps.Point(12, 35),
        }
      );
      marker.setImage(markerImage);
      marker.setMap(map);

      // 포스트 데이터를 로드하고 커스텀 오버레이 내용 생성
      const loadPostData = async (restaurantId) => {
        try {
          const response = await axios.get(`http://localhost:7777/api/restaurants/${restaurantId}/posts`);
          const data = response.data;

          return `
            <div class="overlay-wrap">
              <div class="overlay-info">
                  <div class="overlay-title">${restaurant.restaurantName}</div>
              </div>
              <div class="overlay-body">
                ${data.map(post => ` 
                  <div class="overlay-post-item">
                    <div class="overlay-img">
                      <img src="${post.foodImageUrl}" width="100%" height="100%">
                    </div>
                    <div class="overlay-post-text-container">
                      <div class="overlay-post-title">
                        <strong>${post.postTitle}</strong>
                      </div>
                      <div class="overlay-post-nickname">${post.userNickname}</div>
                      <div class="overlay-post-date">
                        <span>작성일: ${post.postDate}</span>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        } catch (error) {
          console.error("포스트 데이터를 가져오는 데 실패했습니다.", error);
        }
      };

      // 새로운 오버레이 생성
      const createOverlay = async () => {
        const content = await loadPostData(restaurant.restaurantId);

        // 커스텀 오버레이 생성
        const customOverlay = new kakao.maps.CustomOverlay({
          content: content,
          map: null, // 기본적으로 보이지 않게 설정
          position: marker.getPosition(),
          yAnchor: 1.15, // 마커 위로 오버레이 위치 조정
          xAnchor: -0.05, // 가로 기준을 오른쪽으로 설정
        });

        // 마커에 이벤트 리스너 추가 
        kakao.maps.event.addListener(marker, 'mouseover', function () {
          // 기존에 보였던 오버레이가 있으면 제거
          if (currentOverlayRef.current) {
            currentOverlayRef.current.setMap(null);
          }
          // 현재 오버레이를 새로운 오버레이로 업데이트하고 보이게 함
          customOverlay.setMap(map);
          currentOverlayRef.current = customOverlay; // 오버레이 상태를 useRef로 업데이트
        });

        kakao.maps.event.addListener(marker, 'mouseout', function () {
          // 마우스를 떼면 오버레이 숨기기
          setTimeout(() => {
            customOverlay.setMap(null);
          }, 10000); // 10초 후에 오버레이 숨기기
        });

        // 오버레이 콘텐츠를 DOM 요소로 변환 후 wheel 이벤트 추가
        const contentDiv = customOverlay.getContent();
        const contentElement = document.createElement('div');
        contentElement.innerHTML = contentDiv; // 문자열을 DOM 요소로 변환

        // 휠 이벤트 처리 (지도 확대/축소 차단)
        contentElement.addEventListener('wheel', function (e) {
          // 기본적으로 지도 확대/축소 차단
          e.stopPropagation(); // 오버레이 내 휠 이벤트가 지도 이벤트로 전달되지 않게 막음
        });

        customOverlay.setContent(contentElement); // 콘텐츠 설정
      };

      // 오버레이 생성
      createOverlay();

      // 지도에 마커를 설정
      marker.setMap(map);
    });

    // 지도 중심을 현재 위치나 기본 위치로 설정
    map.setCenter(new kakao.maps.LatLng(lat || kakaoHeadquarters.lat, lon || kakaoHeadquarters.lon));

    // 위치 권한을 거부하거나 위치를 못 찾은 경우, 카카오 본사의 위치로 마커 추가
    if (useDefaultLocation) {
      const kakaoHQPosition = new kakao.maps.LatLng(kakaoHeadquarters.lat, kakaoHeadquarters.lon);
      const kakaoHQMarker = new kakao.maps.Marker({
        position: kakaoHQPosition,
        title: "카카오 본사",
      });

      kakaoHQMarker.setMap(map);
    }
  }, [lat, lon, useDefaultLocation, restaurants, pinColors]);

  // 핀 색상에 맞는 마커 이미지를 반환하는 함수
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

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}

export default Kakao;
