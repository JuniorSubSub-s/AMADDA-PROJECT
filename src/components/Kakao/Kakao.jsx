import { useEffect, useState, useRef } from "react";
import axios from "axios";
import './Kakao.css';
import BackgroundModal from '../PostModal/BackgroundModal';

const { kakao } = window;

function Kakao({ restaurants, pinColors }) {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [useDefaultLocation, setUseDefaultLocation] = useState(false);
  const [openModal, setOpenModal] = useState(false); // 모달 열기/닫기 상태 추가
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시물 정보
  const mapRef = useRef(null); // map 객체를 useRef로 저장
  const currentOverlayRef = useRef(null); // 현재 오버레이 상태를 추적

  // 카카오 본사의 위도, 경도
  const kakaoHeadquarters = {
    lat: 33.450701,
    lon: 126.570667,
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setUseDefaultLocation(false); // 위치 정보가 성공적으로 가져와졌을 때
      },
      (error) => {
        console.error("위치 정보를 가져올 수 없습니다.", error);
        setUseDefaultLocation(true); // 위치 정보가 실패했을 때 기본 위치로 설정
      }
    );
  };

  useEffect(() => {
    getCurrentLocation(); // 위치 정보 가져오기
  }, []);

  useEffect(() => {
    // 지도 객체가 아직 없으면 생성하고, 있으면 재사용
    if (!mapRef.current) {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(
          lat !== null ? lat : kakaoHeadquarters.lat, // 위치 정보가 있다면 그 위치로
          lon !== null ? lon : kakaoHeadquarters.lon  // 위치 정보가 없다면 기본값 사용
        ),
        level: 3,
      };
      mapRef.current = new kakao.maps.Map(container, options);
    }

    const map = mapRef.current;

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
        new kakao.maps.Size(25, 30),
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

          // 포스트 데이터를 날짜를 기준으로 내림차순으로 정렬
          const sortedPosts = data.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

          return sortedPosts; // 포스트 데이터를 반환
        } catch (error) {
          console.error("포스트 데이터를 가져오는 데 실패했습니다.", error);
          return []; // 오류가 나면 빈 배열을 반환
        }
      };

      // 새로운 오버레이 생성
      const createOverlay = async () => {
        const posts = await loadPostData(restaurant.restaurantId);
      
        // 커스텀 오버레이 내용
        const content = `
          <div class="overlay-wrap">
            <div class="overlay-info">
                <div class="overlay-title">${restaurant.restaurantName}</div>
            </div>
            <div class="overlay-body">
              ${Array.isArray(posts) && posts.length > 0 ? posts.map(post => `
                <div class="overlay-post-item" data-post-id="${post.postId}">
                  <div class="overlay-img">
                    <!-- 첫 번째 이미지 URL을 사용 -->
                    <img src="${post.foodImageUrls && post.foodImageUrls[0] ? post.foodImageUrls[0] : ''}" width="100%" height="100%">
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
              `).join('') : '<div>게시물이 없습니다.</div>'}
            </div>
          </div>
        `;
      
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
          if (currentOverlayRef.current) {
            currentOverlayRef.current.setMap(null);
          }
          customOverlay.setMap(map);
          currentOverlayRef.current = customOverlay;
        });
      
        kakao.maps.event.addListener(marker, 'mouseout', function () {
          setTimeout(() => {
            customOverlay.setMap(null);
          }, 10000);
        });
      
        // 오버레이 콘텐츠를 DOM 요소로 변환 후 wheel 이벤트 추가
        const contentDiv = customOverlay.getContent();
        const contentElement = document.createElement('div');
        contentElement.innerHTML = contentDiv; // 문자열을 DOM 요소로 변환
      
        // 휠 이벤트 처리 (지도 확대/축소 차단)
        contentElement.addEventListener('wheel', function (e) {
          e.stopPropagation(); // 오버레이 내 휠 이벤트가 지도 이벤트로 전달되지 않게 막음
        });
      
        // 게시물 클릭 시 모달 열기
        contentElement.addEventListener('click', function (e) {
          const postId = e.target.closest('.overlay-post-item')?.getAttribute('data-post-id');
          console.log("postId:", postId);  // postId가 제대로 출력되는지 확인
          if (postId) {
            const post = posts.find(p => p.postId.toString() === postId.toString());  // 데이터 타입 일치 여부 확인
            console.log("Found post:", post); // 찾은 포스트가 출력되는지 확인
            if (post) {
              setSelectedPost(post); // 선택된 포스트 설정
              setOpenModal(true); // 모달 열기
            }
          }
        });
      
        customOverlay.setContent(contentElement); // 콘텐츠 설정
      };

      // 오버레이 생성
      createOverlay();
    });

    // 위치 권한을 거부하거나 위치를 못 찾은 경우, 카카오 본사의 위치로 마커 추가
    if (useDefaultLocation) {
      const kakaoHQPosition = new kakao.maps.LatLng(kakaoHeadquarters.lat, kakaoHeadquarters.lon);
      const kakaoHQMarker = new kakao.maps.Marker({
        position: kakaoHQPosition,
        title: "카카오 본사",
      });
      kakaoHQMarker.setMap(map);
    }

    // 위치 정보가 업데이트되면 지도의 중심을 다시 설정
    if (lat !== null && lon !== null) {
      const newCenter = new kakao.maps.LatLng(lat, lon);
      map.setCenter(newCenter); // 지도 중심 변경
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

  // 날짜 포맷팅 함수 (분까지 출력)
  const formatDateToMinutes = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleString('ko-KR', options); // 한국어 형식으로 'yyyy-MM-dd HH:mm' 형식으로 변환
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPost(null); // 모달 닫을 때 선택된 게시물 초기화
  };

  return (
    <>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
      <BackgroundModal open={openModal} handleClose={handleCloseModal} post={selectedPost} />
    </>
  );
}

export default Kakao;
