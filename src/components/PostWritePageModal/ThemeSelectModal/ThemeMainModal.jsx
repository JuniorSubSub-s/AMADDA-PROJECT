import React, { useEffect, useState } from 'react';

import ThemeStoreModal from '../ThemeStoreModal/ThemeStoreModal';

import MyThemeList from '../ThemeStoreModal/MyThemeList';
import './thememodal.css';

import api from '../../../api/axios';

function ThemeMainModal({ open, handleClose, themeId, onThemeSelect, themeContentData }) {

    const [themeContentDataa, setThemeContentData] = useState(null);

    useEffect(() => {
        setThemeContentData(themeContentData);
        // console.log('Updated themeContentData:', themeContentDataa);
      }, []);

    const [showThemeStore, setShowThemeStore] = useState(false);
    const [myThemes, setMyThemes] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState(themeId);

    useEffect(() => {
        setSelectedTheme(themeId); // 부모에서 전달받은 themeId로 선택 상태 초기화
    }, [themeId]);

    const handleConfirmSelection = () => {
        onThemeSelect(selectedTheme); // 선택된 themeId를 부모로 전달
        handleClose();
    };

    const openThemeStoreModal = () => {
        setShowThemeStore(true);
    };

    const closeThemeStoreModal = () => {
        setShowThemeStore(false);
    };

    // open이 true일 때만 데이터를 요청하도록 변경
    useEffect(() => {
        if (open) {
            api.get("/api/amadda/myTheme", { params: { userId: themeContentData.userId } })
                .then(response => {
                    const themes = response.data.map(item => item.theme); // 각 항목에서 'theme'만 추출
                    setMyThemes(themes); // 추출한 'theme' 객체들을 myThemes에 저장
                })
                .catch(error => {
                    console.error("Error fetching themes:", error);
                });
        }
    }, [open]);


    if (!open) return null; // 모달이 열리지 않으면 컴포넌트를 렌더링하지 않음
    if (showThemeStore) {
        return <ThemeStoreModal open={showThemeStore} handleClose={closeThemeStoreModal} />;
    }

    return (
        <div>
            <div className="modal-overlay" />
            <div className="modal-content">
                {/* 닫기 버튼 */}
                <div className="close-button" onClick={handleClose}></div>
                <div className="title-container">
                    <p className="thememodal-title">원하시는 테마를 선택해주세요</p>
                </div>

                <div className="themelist-container">
                    <div className="themelist">
                        <p>나의 테마 목록</p>
                    </div>
                    <MyThemeList
                        data={myThemes}
                        selectedThemeId={themeId} // 부모에서 전달받은 themeId
                        onThemeSelect={(theme) => setSelectedTheme(theme.themeId)} // 선택된 테마 설정
                        themeContentData={themeContentData}
                    />
                </div>

                <div className="theme-btn-container-2">
                    <button className="theme-store-btn" onClick={openThemeStoreModal}>
                        테마 상점
                    </button>
                    <button className="theme-choice" onClick={handleConfirmSelection}>
                        선택 완료
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ThemeMainModal;
