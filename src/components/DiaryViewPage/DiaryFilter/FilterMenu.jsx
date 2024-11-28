import React, { useState, useEffect } from "react";
import { Box, Typography, Slider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckBoxGroup from "./CheckBoxGroup";
import { LinearMapLocationPointOnMap } from "../../../assets/icons/LinearMapLocationPointOnMap";
import './FilterMenu.css';

const FilterMenu = ({ onSearch }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isMapPage = location.pathname === "/amadda/diary-view/map";
    const buttonText = isMapPage ? "리스트로 보기" : "지도로 보기";
    const navigateTo = isMapPage ? "/amadda/diary-view" : "/amadda/diary-view/map";

    const handleMapButtonClick = () => {
        navigate(navigateTo);
    };

    const [pinColorValueLocal, setPinColorValueLocal] = useState(0);
    const pinColors = [
        { value: 0, color: 'Total', label: '전체', hex: '#A4A4A4' },
        { value: 1, color: 'Black', label: '50회 미만', hex: '#000000' },
        { value: 2, color: 'Red', label: '50회 이상', hex: '#ff0000' },
        { value: 3, color: 'Orange', label: '100회 이상', hex: '#ff5d00' },
        { value: 4, color: 'Blue', label: '200회 이상', hex: '#003dff' },
        { value: 5, color: 'Yellow', label: '300회 이상', hex: '#f1dd00' },
        { value: 6, color: 'Purple', label: '400회 이상', hex: '#d400ff' },
    ];

    const [selectedMoods, setSelectedMoods] = useState([]); 
    const [searchText, setSearchText] = useState(''); 
    const [verification, setVerification] = useState([]); 
    const [selectedTopics, setSelectedTopics] = useState([]); 

    const [filters, setFilters] = useState({
        searchText: "", 
        mood: [], 
        verification: [], 
        pinColor: [], 
        topic: [] 
    });

    useEffect(() => {
        // 필터 상태가 변경되면 부모에게 알리기
        onSearch(filters);
    }, [filters, onSearch]);

    // pinColor 슬라이더 값 변경 시
    const handleSliderChange = (event, newValue) => {
        setPinColorValueLocal(newValue);
        const updatedFilters = {
            ...filters,
            pinColor: pinColors[newValue].color,
        };
        setFilters(updatedFilters);
    };

    // 감정 체크박스 상태 변경 시
    const handleMoodChange = (newCheckedItems) => {
        const selected = Object.keys(newCheckedItems).filter((key) => newCheckedItems[key]);

        // '전체'를 제외한 값만 필터링
        const updatedFilters = {
            ...filters,
            mood: selected.includes('전체') ? [] : selected,
        };

        setSelectedMoods(selected); // 상태 유지
        setFilters(updatedFilters);
    };

    // 인증 체크박스 상태 변경 시
    const handleVerificationChange = (newCheckedItems) => {
        const selected = Object.keys(newCheckedItems).filter((key) => newCheckedItems[key]);

        // '전체'를 제외한 값만 필터링
        const updatedFilters = {
            ...filters,
            verification: selected.includes('전체') ? [] : selected,
        };

        setVerification(selected); // 상태 유지
        setFilters(updatedFilters);
    };

    // 검색 텍스트 변경 시
    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    // 검색 버튼 클릭 시
    const handleSearchSubmit = () => {
        const updatedFilters = {
            ...filters,
            searchText: searchText,
        };
        setFilters(updatedFilters);
    };

    // 토픽 체크박스 상태 변경 시
    const handleTopicChange = (newCheckedItems) => {
        const selected = Object.keys(newCheckedItems).filter((key) => newCheckedItems[key]);

        // '전체'를 제외한 값만 필터링
        const updatedFilters = {
            ...filters,
            topic: selected.includes('전체') ? [] : selected,
        };

        setSelectedTopics(selected); // 상태 유지
        setFilters(updatedFilters);
    };

    // 필터 초기화
    const handleResetFilters = () => {
        setFilters({
            searchText: "",
            mood: [],
            verification: [],
            pinColor: [],
            topic: [],
        });
        setSearchText('');
        setPinColorValueLocal(0);
        setSelectedMoods([]);
        setVerification([]);
        setSelectedTopics([]);
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
                <button className="filter-reset-btn" onClick={handleResetFilters}>필터초기화</button>
            </div>

            <input 
                type="text"
                className="search-bar" 
                placeholder="제목/맛집명 검색"
                value={searchText} 
                onChange={handleSearchTextChange} 
            />

            <div onClick={handleSearchSubmit} className="filter-search-button">검색</div>

            <Box mt={3}>
                <Typography className="filter-title">인증</Typography>
                <CheckBoxGroup 
                    labels={['전체', '인증', '미인증']} 
                    onChange={handleVerificationChange} 
                    value={verification} 
                />
            </Box>

            <div className="divider" />
            <Box mt={2}>
                <Typography className="filter-title">pin 색상</Typography>
                <Slider
                    value={pinColorValueLocal}
                    onChange={handleSliderChange}
                    min={0}
                    max={6}
                    step={1}
                    marks
                    sx={{
                        color: pinColors[pinColorValueLocal].hex,
                        '& .MuiSlider-thumb': {
                            width: 14,
                            height: 14,
                        },
                        '& .MuiSlider-markLabel': { color: '#666' },
                    }}
                />
                <Box display="flex" flexDirection="column" alignItems="center" mt={1}>
                    <Typography variant="h6" sx={{ color: pinColors[pinColorValueLocal].hex }}>
                        {pinColors[pinColorValueLocal].color}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {pinColors[pinColorValueLocal].label}
                    </Typography>
                </Box>
            </Box>

            <div className="divider" />
            <Box mt={2}>
                <Typography className="filter-title">나의 감정</Typography>
                <CheckBoxGroup 
                    labels={['전체', '평온', '행복', '사랑', '호기심', '스트레스', '귀찮음']} 
                    onChange={handleMoodChange} 
                    value={selectedMoods} 
                />
            </Box>

            <div className="divider" />
            <Box mt={2}>
                <Typography className="filter-title">찾는 주제</Typography>
                <CheckBoxGroup 
                    labels={['전체', '가을', '제주', '데이트', '캠핑', '가성비', '미슐랭']} 
                    onChange={handleTopicChange} 
                    value={selectedTopics} 
                />
            </Box>

        </div>
    );
};

export default FilterMenu;
