function NavigationButtons({ handleFindBestResPageClick, handleDiaryViewPageClick, hadleCateResPageClick }) {
    return (
        <div className="navbtn">
            <div className="btn-matzip" onClick={handleFindBestResPageClick}>
                <div className="text-matzip">일기 작성</div>
            </div>
            <div className="btn-diary" onClick={handleDiaryViewPageClick}>
                <div className="text-diary">일기 보기</div>
            </div>
            <div className="btn-category" onClick={hadleCateResPageClick}>
                <div className="text-category">날씨 메뉴 추천</div>
            </div>
        </div>
    );
}

export default NavigationButtons;
