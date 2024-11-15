import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import './MapModal.css';

function MapModal({ open, handleClose, addressHandler }) {
  const { kakao } = window;

  const [lat, setLat] = useState(37.5665);
  const [lon, setLon] = useState(126.9780);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [selectedMarker, setSelectedMarker] = useState(null);

  // 원하는 클릭 이미지 URL 설정
  const CUSTOM_CLICK_IMAGE_URL = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
  const DEFAULT_IMAGE_URL = 'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png';

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    console.log(selectedMarker);
  }, [selectedMarker]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  };

  const handleSearch = () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
            address: data[i].address_name
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);
        map.setBounds(bounds);
      } else {
        console.error('검색 결과가 없습니다.');
      }
    });
  };

  useEffect(() => {
    if (map) {
      map.setCenter(new kakao.maps.LatLng(lat, lon));
    }
  }, [lat, lon, map]);

  return (
    <Modal
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
      aria-labelledby="modal-map-title"
      aria-describedby="modal-map-description"
      BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
    >
      <Box className="modal-box">
        <div className="close-button" onClick={handleClose}></div>

        <div className='title'>
          <Typography
            id="modal-map-title"
            className="modal-title"
            style={{ textDecoration: 'none', padding: 0 }}
          >
            지도
          </Typography>
        </div>

        <Box className="search-box">
          <TextField
            variant="standard"
            placeholder="검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();  // Enter 키가 눌리면 검색 실행
              }
            }}
            InputProps={{ disableUnderline: true }}
            className="search-input"
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box className="map-container">
          <Map
            center={{ lat: lat, lng: lon }}
            style={{ width: '100%', height: '90%' }}
            level={3}
            onCreate={setMap}
          >
            {markers.map((marker) => (
              <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng},${marker.address_name}`}
                position={marker.position}
                clickable={true}
                image={{
                  src: selectedMarker && selectedMarker.content === marker.content
                    ? CUSTOM_CLICK_IMAGE_URL
                    : DEFAULT_IMAGE_URL,
                  size: {
                    width: 24,
                    height: 35,
                  },
                  options: {
                    offset: {
                      x: 12,
                      y: 35,
                    },
                  },
                }}
                onClick={() => {
                  setInfo(marker);
                  // 클릭된 마커를 선택된 마커로 설정
                  setSelectedMarker(marker);
                }}
              >
                {selectedMarker && selectedMarker.content === marker.content && (
                  <div style={{ minWidth: "150px" }}>
                    {info && info.content === marker.content && (
                      <div style={{ fontFamily: 'Gmarket Sans TTF-Medium', display: 'flex', justifyContent: 'center', paddingTop: '4px' }}>{marker.content}</div>
                    )}
                  </div>
                )}
              </MapMarker>
            ))}
          </Map>
          <Box className="OK-button-container">
            <Button
              className="OK-button"
              variant="contained"
              onClick={() => {
                if (window.confirm(`선택한 가게가 ${info?.content || "없음"} (이)가 맞습니까?`)) {
                  // 선택한 가게를 저장하거나 처리하는 로직 추가
                  handleClose();
                  console.log(info);

                  addressHandler(info.content, info.address, info.position.lat, info.position.lng);

                }
              }}
            >
              저장
            </Button>
          </Box>
        </Box>

      </Box>
    </Modal>
  );
}

export default MapModal;
