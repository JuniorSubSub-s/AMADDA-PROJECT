import React, { useState } from "react";
import ThemeItem from "./ThemeItem";
import './ThemeStore.css';

function ThemeList({ data = [] }) { // 기본값 설정
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(0); 
        }
    };
    
    const handleBack = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(totalPages - 1); 
        }
    };

    const startIndex = currentPage * itemsPerPage;
    const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="item-list">
            <div className="button" onClick={handleBack} disabled={currentPage === 0}>
                <div className="icon-area">
                    <img
                        className="img"
                        alt="Frame"
                        src="/img/ThemeModalImg/back-icon.png"
                    />
                </div>
            </div>

            {currentItems.map((item) => (
                <ThemeItem key={item.id} data={item} />
            ))}
            <div className="button" onClick={handleNext} disabled={currentPage === totalPages - 1}>
                <div className="icon-area">
                    <img
                        className="img"
                        alt="Frame"
                        src="/img/ThemeModalImg/next-icon.png"
                    />
                </div>
            </div>
        </div>
    );
}

export default ThemeList;
