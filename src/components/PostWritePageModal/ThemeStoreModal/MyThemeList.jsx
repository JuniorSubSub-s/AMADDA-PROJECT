import React, { useState, useEffect } from "react";
import MyThemeItem from "./MyThemeItem";
import './ThemeStore.css';

function MyThemeList({ data = [], onThemeSelect, selectedThemeId, themeContentData }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedId, setSelectedId] = useState(selectedThemeId); // 선택된 항목 ID
    const itemsPerPage = 4;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // 첫 번째 아이템을 디폴트로 선택
    useEffect(() => {
        setSelectedId(selectedThemeId); // 부모로부터 전달받은 themeId로 기본 선택
    }, [data, selectedThemeId]);

    const handleNext = () => {
        setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
    };

    const handleBack = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
    };

    const startIndex = currentPage * itemsPerPage;
    const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

    const handleSelect = (theme) => {
        setSelectedId(theme.themeId);
        onThemeSelect(theme); // 선택된 테마 데이터를 부모로 전달
    };

    return (
        <div className="item-list">
            <div className="circle-button" onClick={handleBack}>
                <div className="icon-area">
                    <img
                        className="back-next-img"
                        alt="Frame"
                        src="/img/ThemeModalImg/back-icon.png"
                    />
                </div>
            </div>

            {currentItems.map((item) => (
                <MyThemeItem
                    key={item.id}
                    data={item}
                    isSelected={selectedId === item.themeId} // 선택 상태 확인
                    onSelect={() => handleSelect(item)} // 클릭 시 선택
                    themeContentData={themeContentData}
                />
            ))}

            <div className="circle-button" onClick={handleNext}>
                <div className="icon-area">
                    <img
                        className="back-next-img"
                        alt="Frame"
                        src="/img/ThemeModalImg/next-icon.png"
                    />
                </div>
            </div>
        </div>
    );
}

export default MyThemeList;
