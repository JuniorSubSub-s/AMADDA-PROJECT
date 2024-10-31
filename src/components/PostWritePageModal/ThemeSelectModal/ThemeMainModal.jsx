import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import ThemeInfo from '../ThemeInfo/ThemeInfo';
import ThemeStoreModal from '../ThemeStoreModal/ThemeStoreModal';

import './thememodal.css';

function ThemeMainModal({ open, handleClose }) {

    const [selectBtn, setSelectBtn] = useState("");
    const [showThemeStore, setShowThemeStore] = useState(false);

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

    if (!open) return null;
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
                    <div className="theme-btn-container">
                        <button className={` ${selectBtn == '가을' ? "select-btn" : ''}`} onClick={() => btnHandler("가을")}>1. 가을</button>
                        <button className={` ${selectBtn == '편지' ? "select-btn" : ''}`} onClick={() => btnHandler("편지")}>2. 편지</button>
                        <button className={` ${selectBtn == '기억' ? "select-btn" : ''}`} onClick={() => btnHandler("기억")}>3. 기억</button>
                        <button className={` ${selectBtn == '작별' ? "select-btn" : ''}`} onClick={() => btnHandler("작별")}>4. 작별</button>
                        <button className={` ${selectBtn == '힐링' ? "select-btn" : ''}`} onClick={() => btnHandler("힐링")}>5. 힐링</button>
                    </div>
                    <div className="theme-image-container">
                        <div className='left-arrow'><FontAwesomeIcon icon={faChevronLeft} /></div>
                        <div className='image-list'>
                            <ThemeInfo />
                            <ThemeInfo />
                            <ThemeInfo />
                            <ThemeInfo />
                        </div>
                        <div className='right-arrow'><FontAwesomeIcon icon={faChevronRight} /></div>
                    </div>
                </div>

                <div className='theme-btn-container-2'>
                    <button className="theme-store-btn"
                            onClick={openThemeStoreModal}>
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
