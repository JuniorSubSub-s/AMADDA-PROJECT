import { useEffect, useState, useRef } from "react";
import axios from "axios";
import './Kakao.css';
import BackgroundModal from '../PostModal/BackgroundModal';
const { kakao } = window;
function Kakao({ restaurants, pinColors, filters }) {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [useDefaultLocation, setUseDefaultLocation] = useState(false);
  const [openModal, setOpenModal] = useState(false); // 모달 열기/닫기 상태 추가
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시물 정보
  const mapRef = useRef(null); // map 객체를 useRef로 저장
  const currentOverlayRef = useRef(null); // 현재 오버레이 상태를 추적
  const markersRef = useRef([]); // 마커를 관리하기 위한 ref


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
  const getPostCountForPinColor = (pinColor) => {
    switch (pinColor) {
      case 'Black': return 50; // 검정색은 50미만
      case 'Red': return 50;
      case 'Orange': return 100;
      case 'Blue': return 200;
      case 'Yellow': return 300;
      case 'Purple': return 400;
      default: return 0;
    }
  };
  // 레스토랑을 필터링하는 부분
  const isHashtagSearch = filters.searchText && filters.searchText.startsWith("#");

  const filteredRestaurants = isHashtagSearch
    ? restaurants // #이 포함된 경우, 필터링을 건너뛰고 모든 레스토랑을 반환
    : restaurants.filter((restaurant) => {
      // 레스토랑 이름 필터링
      const searchTextMatch = filters.searchText
        ? restaurant.restaurantName.toLowerCase().includes(filters.searchText.toLowerCase())
        : true;

      // 핀 컬러 필터링
      const pinColorMatch = filters.pinColor
        ? (filters.pinColor === "Black" ? restaurant.totalPost < 50 : restaurant.totalPost >= getPostCountForPinColor(filters.pinColor))
        : true;

      return searchTextMatch && pinColorMatch;
    });

  // 레스토랑 아이디와 색상을 매칭하는 함수
  const getRestaurantPinColor = (restaurantId) => {
    // 검정색 마커는 totalPost가 50 미만일 때만 적용되므로 검정색 마커를 항상 적용
    const index = restaurants.findIndex(restaurant => restaurant.restaurantId === restaurantId);
    const pinColor = pinColors[index];
    // "검정" 필터가 활성화되어 있으면 totalPost가 50미만인 레스토랑에만 검정색을 강제 적용
    if (filters.pinColor === "Black" && restaurants[index].totalPost < 50) {
      return "black"; // 검정색 강제 적용
    }
    // 나머지 경우에는 pinColors에서 설정된 색상을 사용
    return pinColor || "black";
  };
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

    // 기존 마커를 모두 삭제
    const removeMarkers = () => {
      markersRef.current.forEach((marker) => {
        marker.setMap(null); // 지도에서 마커 제거
      });
      markersRef.current = []; // 배열 초기화
    };
    removeMarkers(); // 필터링 전 마커를 모두 제거


    // 필터링된 레스토랑만 지도에 마커 추가
    filteredRestaurants.forEach((restaurant) => {
      const position = new kakao.maps.LatLng(restaurant.locationLatitude, restaurant.locationLongitude);
      const marker = new kakao.maps.Marker({
        position: position,
        title: restaurant.restaurantName,
      });

      // 핀 색상 고정 (검정색일 경우 강제 적용)
      const pinColor = getRestaurantPinColor(restaurant.restaurantId);
      const markerImage = new kakao.maps.MarkerImage(
        getPinImageUrl(pinColor), // 핀 색상에 맞는 이미지 URL을 반환
        new kakao.maps.Size(25, 30),
        {
          offset: new kakao.maps.Point(12, 35),
        }
      );
      marker.setImage(markerImage);
      marker.setMap(map); // 지도에 마커 추가
      // 마커를 markersRef 배열에 저장
      markersRef.current.push(marker);

      // 포스트 데이터를 로드하고 커스텀 오버레이 내용 생성
      const loadPostData = async (restaurantId) => {
        try {
          const response = await axios.get(`http://localhost:7777/api/restaurants/${restaurantId}/posts`);
          const data = response.data;
          console.log(response.data);
          // 포스트 데이터를 날짜를 기준으로 내림차순으로 정렬
          const sortedPosts = data.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
          return sortedPosts; // 포스트 데이터를 반환
        } catch (error) {
          console.error("포스트 데이터를 가져오는 데 실패했습니다.", error);
          return []; // 오류가 나면 빈 배열을 반환
        }
      };
      // 새로운 오버레이 생성
      // 새로운 오버레이 생성
      const createOverlay = async () => {
        const posts = await loadPostData(restaurant.restaurantId); // 게시물 데이터 불러오기

        // 해시태그 검색일 경우 해당 태그 필터링
        const hashtagSearchText = filters.searchText.slice(1).trim().toLowerCase(); // # 뒤의 텍스트

        // 여러 해시태그 검색을 위해 공백을 기준으로 태그 분리
        const searchTags = hashtagSearchText.split(/\s+/).map(tag => tag.toLowerCase());

        const filteredPosts = posts.filter(post => {
          // 오버레이 포스트 필터링 로직
          const moodMatch = (filters.mood || []).length > 0
            ? filters.mood.includes('전체') || (post.mood && filters.mood.includes(post.mood))
            : true;

          const topicMatch = (filters.topic || []).length > 0
            ? filters.topic.includes('전체') || (post.topicNames && post.topicNames.some(topic => filters.topic.includes(topic)))
            : true;

          const receiptVerificationMatch = (filters.verification || []).length > 0
            ? filters.verification.includes(post.receiptVerification ? '인증' : '미인증')
            : true;

          // 해시태그 검색 조건
          const hashtagMatch = filters.searchText && filters.searchText.startsWith("#")
            ? searchTags.some(tag => post.tagNames && post.tagNames.some(postTag => postTag.toLowerCase().includes(tag)))
            : true;

          // 핀 컬러 필터링
          const pinColorMatch = filters.pinColor
            ? (filters.pinColor === "Black" ? restaurant.totalPost < 50 : restaurant.totalPost >= getPostCountForPinColor(filters.pinColor))
            : true;


          // 모든 필터 조건이 맞을 경우만 true를 반환
          return moodMatch && topicMatch && receiptVerificationMatch && hashtagMatch && pinColorMatch
        });

        // 필터링된 게시물이 없다면 해당 마커를 제거
        if (filteredPosts.length === 0) {
          marker.setMap(null); // 마커 제거
        } else {


          // 커스텀 오버레이 내용
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
                  `).join('')
              : '<div>필터에 맞는 게시물이 없습니다.</div>'
            }
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
          // DOM 요소로 변환하기
          const contentDiv = document.createElement('div');
          contentDiv.innerHTML = content;
          // 휠 이벤트 처리 (지도 확대/축소 차단)
          contentDiv.addEventListener('wheel', function (e) {
            e.stopPropagation();
          });
          // 게시물 클릭 시 모달 열기
          contentDiv.addEventListener('click', function (e) {
            const postId = e.target.closest('.overlay-post-item')?.getAttribute('data-post-id');
            if (postId) {
              const post = filteredPosts.find(p => p.postId.toString() === postId.toString());
              if (post) {
                setSelectedPost(post); // 선택된 포스트 설정
                setOpenModal(true); // 모달 열기
              }
            }
          });
          // 커스텀 오버레이에 DOM 요소 추가
          customOverlay.setContent(contentDiv);
        };
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
  }, [lat, lon, useDefaultLocation, filteredRestaurants, pinColors, filters]); // filteredRestaurants가 바뀔 때마다 지도 업데이트
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