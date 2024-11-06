import React, { useState } from "react";
import { Box, Typography, Slider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import CheckBoxGroup from "./CheckBoxGroup";
import { LinearMapLocationPointOnMap } from "../../../assets/icons/LinearMapLocationPointOnMap";

import './FilterMenu.css'; // CSS 파일 임포트

const FilterMenu = ({ onMoodChange, onVerificationChange, onSearch, onPinColorChange, onTopicChange  }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isMapPage = location.pathname === "/amadda/diary-view/map";
    const buttonText = isMapPage ? "리스트로 보기" : "지도로 보기";
    const navigateTo = isMapPage ? "/amadda/diary-view" : "/amadda/diary-view/map";

    const handleMapButtonClick = () => {
        navigate(navigateTo); // 지도로 보기 클릭 시 해당 경로로 이동
    };

    // 슬라이더 관리
    const [pinColorValue, setPinColorValue] = useState(0);

    const pinColors = [
        { value: 0, color: 'Total', label: '전체', hex: '#A4A4A4' },
        { value: 1, color: 'Black', label: '50회 미만', hex: '#000000' },
        { value: 2, color: 'Red', label: '50회 이상', hex: '#ff0000' },
        { value: 3, color: 'Orange', label: '100회 이상', hex: '#ff5d00' },
        { value: 4, color: 'Blue', label: '200회 이상', hex: '#003dff' },
        { value: 5, color: 'Yellow', label: '300회 이상', hex: '#f1dd00' },
        { value: 6, color: 'Purple', label: '400회 이상', hex: '#d400ff' },
    ]

    const handleSliderChange = (event, newValue) => {
        setPinColorValue(newValue);
        onPinColorChange(pinColors[newValue].color); // 변경된 pinColor를 DiaryViewPage로 전달
    };

    // 백엔드 작업
    const [selectedMoods, setSelectedMoods] = useState([]); // 선택된 감정 상태 관리
    const [searchText, setSearchText] = useState(''); // 검색 텍스트 상태 관리
    const [verification, setVerification] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);

    const handleMoodChange = (newCheckedItems) => {
        const selected = Object.keys(newCheckedItems).filter((key) => newCheckedItems[key] && key !== '전체');
        setSelectedMoods(selected);
        console.log('Selected Moods:', selected); 
        onMoodChange(selected); 
    };

    const handleVerificationChange = (newCheckedItems) => {
        const selected = Object.keys(newCheckedItems).filter((key) => newCheckedItems[key] && key !== '전체');
        setVerification(selected);
        console.log('Selected Verifications:', selected); 
        onVerificationChange(selected); // 선택된 verification 배열을 부모 컴포넌트로 전달
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value); // 검색 텍스트 업데이트
    };

    const handleSearchSubmit = () => {
        onSearch(searchText); // 검색 텍스트를 부모 컴포넌트로 전달
    };

    const handleTopicChange = (newCheckedItems) => {
        const selected = Object.keys(newCheckedItems).filter((key) => newCheckedItems[key] && key !== '전체');
        setSelectedTopics(selected);
        console.log('Selected Topics:', selected); 
        onTopicChange(selected); // 선택된 주제 배열을 부모 컴포넌트로 전달
    };

    return (
        <div className="filter-menu">
            <div className="show-map-btn" onClick={handleMapButtonClick} style={{ cursor: 'pointer' }}>
                <LinearMapLocationPointOnMap className="linear-map-location" />
                <div className="show-map-text">{buttonText}</div>
            </div>

            <div className="divider" />

            <div className="filter-header">
                <div className="filter-title">필터</div>
                <button className="filter-reset-btn">필터초기화</button>
            </div>

            <input  type="text"
                    className="search-bar" 
                    placeholder="맛집명/태그 검색"
                    value={searchText} 
                    onChange={handleSearchChange} />

            <button onClick={handleSearchSubmit}>검색</button> {/* 검색 버튼 추가 */}

            <Box mt={3}>
                <Typography className="filter-title">인증</Typography>
                <CheckBoxGroup labels={['전체', '인증', '미인증']} onChange={handleVerificationChange} />
            </Box>

            <div className="divider" />

            <Box mt={2}>
                <Typography className="filter-title">pin 색상</Typography>
                <Slider
                    value={pinColorValue}
                    onChange={handleSliderChange}
                    step={1}
                    marks
                    min={0}
                    max={6}
                    sx={{
                        color: pinColors[pinColorValue].hex,
                        '& .MuiSlider-thumb': { 
                            width: 14,
                            height: 14,
                        },
                        '& .MuiSlider-markLabel': { color: '#666' },
                    }}
                />

                <Box display="flex" flexDirection="column" alignItems="center" mt={1}>
                    <Typography variant="h6" sx={{ color: pinColors[pinColorValue].hex }}>
                        {pinColors[pinColorValue].color}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {pinColors[pinColorValue].label}
                    </Typography>
                </Box>
            </Box>

            <div className="divider" />

            <Box mt={2}>
                <Typography className="filter-title">나의 감정</Typography>
                <CheckBoxGroup labels={['전체', '평온', '행복', '사랑', '호기심', '스트레스', '귀찮음']} onChange={handleMoodChange} />
            </Box>

            <div className="divider" />

            <Box mt={2}>
                <Typography className="filter-title">찾는 주제</Typography>
                <CheckBoxGroup labels={['전체', '가을', '제주', '데이트', '캠핑', '가성비', '미슐랭']} onChange={handleTopicChange} />
            </Box>

            <div className="divider" />

            <div className="pin-info">
                <p className="amadda-pin-color-pin">
                    Amadda pin color는 해당 위치의 맛집에 회원들이 pin을 꽂은 개수로 판단하였습니다.
                </p>
                <div className="pin-color-group">
                    <div className="pin-color-item">
                        <Typography className="pin-color-text-1" style={{ color: '#000000' }}>Black</Typography>
                        <Typography className="pin-color-text-2">50회 미만</Typography>
                    </div>
                    <div className="pin-color-item">
                        <Typography className="pin-color-text-1" style={{ color: '#ff0000' }}>Red</Typography>
                        <Typography className="pin-color-text-2">50회 이상</Typography>
                    </div>
                    <div className="pin-color-item">
                        <Typography className="pin-color-text-1" style={{ color: '#ff5d00' }}>Orange</Typography>
                        <Typography className="pin-color-text-2">100회 이상</Typography>
                    </div>
                    <div className="pin-color-item">
                        <Typography className="pin-color-text-1" style={{ color: '#003dff' }}>Blue</Typography>
                        <Typography className="pin-color-text-2">200회 이상</Typography>
                    </div>
                    <div className="pin-color-item">
                        <Typography className="pin-color-text-1" style={{ color: '#f1dd00' }}>Yellow</Typography>
                        <Typography className="pin-color-text-2">300회 이상</Typography>
                    </div>
                    <div className="pin-color-item">
                        <Typography className="pin-color-text-1" style={{ color: '#d400ff' }}>Purple</Typography>
                        <Typography className="pin-color-text-2">400회 이상</Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterMenu;
