import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Box, Typography, TextField, IconButton, Button } from '@mui/material';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import SearchIcon from '@mui/icons-material/Search';

import './MapModal.css';

// 상수 정의
const CUSTOM_CLICK_IMAGE_URL = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
const DEFAULT_IMAGE_URL = 'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png';
const DEFAULT_CENTER = { lat: 37.5665, lng: 126.9780 };
const IMAGE_SIZE = { width: 25, height: 35 };
const IMAGE_OFFSET = { x: 12, y: 35 };

function MapModal({ open, handleClose, addressHandler }) {
  const { kakao } = window;

  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [selectedMarker, setSelectedMarker] = useState(null);

  // 현재 위치 설정
  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        setCenter({ lat: latitude, lng: longitude }),
      () => console.error('위치 정보를 가져올 수 없습니다.')
    );
  }, []);

  // 검색
  const handleSearch = () => {
    if (!map) return;

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        const newMarkers = data.map((item) => {
          bounds.extend(new kakao.maps.LatLng(item.y, item.x));
          return {
            position: { lat: item.y, lng: item.x },
            content: item.place_name,
            address: item.address_name,
          };
        });
        // 새로운 마커 데이터를 설정합니다.
        setMarkers(newMarkers);
        map.setBounds(bounds);
      } else {
        console.error('검색 결과가 없습니다.');
      }
    });
  };

  // 마커 클릭
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  // 저장 버튼 클릭
  const handleSave = () => {
    if (selectedMarker && window.confirm(`선택한 가게가 ${selectedMarker.content}(이)가 맞습니까?`)) {
      addressHandler(
        selectedMarker.content,
        selectedMarker.address,
        selectedMarker.position.lat,
        selectedMarker.position.lng
      );
      handleClose();
    }
  };

  // 지도 초기화 시 현재 위치 설정
  useEffect(() => {
    if (open) getCurrentLocation();
  }, [open, getCurrentLocation]);

  // 마커 렌더링 함수
  const renderMarkers = () =>
    markers.map((marker) => (
      <MapMarker
        key={`${marker.content}-${marker.position.lat},${marker.position.lng}`}
        position={marker.position}
        clickable
        image={{
          src: selectedMarker?.content === marker.content ? CUSTOM_CLICK_IMAGE_URL : DEFAULT_IMAGE_URL,
          size: IMAGE_SIZE,
          options: { offset: IMAGE_OFFSET },
        }}
        onClick={() => handleMarkerClick(marker)}
      >
        {selectedMarker?.content === marker.content && (
          <div style={{ fontFamily: 'font-notosansKR-medium', minWidth: '200px', minHeight: '30px', textAlign: 'center', paddingTop: '2px' }}>
            {marker.content}
          </div>
        )}
      </MapMarker>
    ));

  return (
    <Modal
      open={open}
      onClose={(_, reason) => reason !== 'backdropClick' && handleClose()}
      aria-labelledby="modal-map-title"
      aria-describedby="modal-map-description"
      BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
    >
      <Box className="modal-box">
        <div className="close-button" onClick={handleClose}></div>

        <Typography id="modal-map-title" className="modal-title">
          지도에서 나만의 맛집 위치를 설정해주세요✅
        </Typography>

        <Box className="search-box">
          <TextField
            variant="standard"
            placeholder="검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
              disableUnderline: true,
              style: { fontFamily: 'font-notosansKR-medium', fontSize: '16px', color: '#999' },
            }}
            className="search-input"
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box className="map-container">
          <Map
            center={center}
            style={{ width: '100%', height: '90%' }}
            level={3}
            onCreate={(mapInstance) => !map && setMap(mapInstance)}
          >
            {renderMarkers()}
          </Map>
          <Box className="OK-button-container">
            <Button className="OK-button" variant="contained" onClick={handleSave}>
              저장
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default MapModal;
