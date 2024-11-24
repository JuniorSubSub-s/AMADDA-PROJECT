import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './PreviewModal.css';
import BasicDiary from '../../AmaddaTheme/BasicDiary/BasicDiary';
import SimpleDiary from '../../AmaddaTheme/SimpleDiary/SimpleDiary'; 
import FlowerDiary from '../../AmaddaTheme/FlowerDiary/FlowerDiary';
import NoteDiary from '../../AmaddaTheme/NoteDiary/NoteDiary';
import AmaDDiary from '../../AmaddaTheme/AmaDDiary/AmaDDiary';
import AlbumDiary from '../../AmaddaTheme/AlbumDiary/AlbumDiary';

function PreviewModal({ open, handleClose, themeId, themeContentData }) {
    // 항상 useEffect는 조건문 외부에서 호출
    useEffect(() => {
        if (open) {
            console.log(themeContentData); // open이 true일 때만 로그 실행
        }
    }, [open, themeContentData]); // open과 themeContentData가 변경될 때 실행

    // open 상태에 따라 다른 JSX 렌더링
    const renderDiaryComponent = () => {
        switch (themeId) {
            case 1:
                return <BasicDiary themeContentData={themeContentData} />;
            case 2:
                return <SimpleDiary themeContentData={themeContentData} />;
            case 3:
                return <FlowerDiary themeContentData={themeContentData} />;
            case 4:
                return <NoteDiary themeContentData={themeContentData} />;
            case 5:
                return <AmaDDiary themeContentData={themeContentData} />;
            case 6:
                return <AlbumDiary themeContentData={themeContentData} />;
            default:
                return null; // themeId가 다른 경우 처리 (예: 기본값이나 예외 처리)
        }
    };

    return open ? (
        <div>
            <div className="preview-modal-overlay" onClick={handleClose} />
            <div className="preview-modal-content">
                {/* 닫기 버튼 */}
                <div className="preview-close-button" onClick={handleClose}></div>
                <div className="preview-title-container">
                    <p className="preview-thememodal-title">일기 미리보기</p>
                </div>

                {renderDiaryComponent()} {/* 조건에 맞는 다이어리 컴포넌트 렌더링 */}
            </div>
        </div>
    ) : null;
}

export default PreviewModal;
