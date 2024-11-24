import React from 'react';
import './ThemeStore.css';

function MyThemeItem({ data, isSelected, onSelect, themeContentData }) {
    
    const isDisabled = !themeContentData || !themeContentData.previewImages  || data.imageNumber > themeContentData.previewImages .length;

    return (
        <div
            className={`theme-item ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`} // 조건부 클래스 추가
            onClick={!isDisabled ? onSelect : undefined} // 비활성화 상태일 경우 클릭 무효화
        >
            <div className="item-image-container">
                <img
                    src={data.themeImage}
                    alt={data.themeName}
                    style={{
                        width: '175px',
                        height: '250px',
                        objectFit: 'contain',
                    }}
                />
            </div>

            <div className="info-area">
                <div className="theme-name">{data.themeName}</div>
                <div className="theme-description">{data.themeDescription}</div>
            </div>

            {/* 조건부 메시지 렌더링 */}
            {isDisabled && (
                <div className="overlay-message">
                    <p>{`최소 ${data.imageNumber}장의 이미지를 등록해야 사용 가능합니다.`}</p>
                </div>
            )}
        </div>
    );
}

export default MyThemeItem;
