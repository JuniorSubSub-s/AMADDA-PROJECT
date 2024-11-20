import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import ThemeInfo from '../ThemeInfo/ThemeInfo';
import ThemeStoreModal from '../ThemeStoreModal/ThemeStoreModal';
import ThemeList from "../ThemeStoreModal/ThemeList";

import './thememodal.css';
import MyThemeList from '../ThemeStoreModal/MyThemeList';

import api from '../../../api/axios';

function ThemeMainModal({ open, handleClose }) {
    const [selectBtn, setSelectBtn] = useState("");
    const [showThemeStore, setShowThemeStore] = useState(false);
    const [myThemes, setMyThemes] = useState([]);

    const btnHandler = (theme) => {
        setSelectBtn(theme);
        console.log(selectBtn);
    }

    const openThemeStoreModal = () => {
        setShowThemeStore(true);
    }

    const closeThemeStoreModal = () => {
        setShowThemeStore(false);
    }

    // open이 true일 때만 데이터를 요청하도록 변경
    useEffect(() => {
        if (open) {
            api.get("/api/amadda/myTheme", { params: { userId: 1 } })
                .then(response => {
                    const themes = response.data.map(item => item.theme); // 각 항목에서 'theme'만 추출
                    setMyThemes(themes); // 추출한 'theme' 객체들을 myThemes에 저장
                })
                .catch(error => {
                    console.error("Error fetching themes:", error);
                });
        }
    }, [open]);  // open 상태가 변경될 때마다 호출됨
    

    if (!open) return null; // 모달이 열리지 않으면 컴포넌트를 렌더링하지 않음
    if (showThemeStore) {
        return <ThemeStoreModal open={showThemeStore} handleClose={closeThemeStoreModal} />;
    }

    return (
        <div>
            <div className="modal-overlay" />

            <div className="modal-content" >

                {/* 닫기 버튼 */}
                <div className="close-button" onClick={handleClose}></div>

                <div className="title-container">
                    <p className="thememodal-title">원하시는 테마를 선택해주세요</p>
                </div>

                <div className="themelist-container">
                    <div className="themelist">
                        <p>나의 테마 목록</p>
                    </div>
                    <MyThemeList data={myThemes} />
                </div>

                <div className='theme-btn-container-2'>
                    <button className="theme-store-btn" onClick={openThemeStoreModal}>
                        테마 상점
                    </button>
                    <button className="theme-choice" >선택 완료</button>
                </div>
            </div>

            {/* ThemeStoreModal을 조건부로 렌더링 */}
            {showThemeStore && <ThemeStoreModal open={showThemeStore} handleClose={closeThemeStoreModal} />}
        </div>
    );
}

export default ThemeMainModal;
