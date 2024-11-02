import "../../ui/DiaryViewPage/tabpanel.css";

function TabPanel() {
    return (
        <div className="tabpanel">
            <div className="randmark-container">
                <p className="tab-text">도시명/랜드마크</p>
                <button className="tab-btn">도시명/랜드마크 선택</button>
            </div>

            <div className="divcontainer">
                <div className="hashtag-container">
                    <p className="tab-text">해시태그</p>
                    <button className="tab-btn">해시태그 선택</button>
                </div>
                <div className="money-check-container">
                    <p className="tab-text">열람비 비율 조절</p>
                    <button className="tab-btn">열람비 비율 조절</button>
                </div>
                <div className="pin-color-container">
                    <p className="tab-text">Pin Color 조절</p>
                    <button className="tab-btn">Pin Color 조절</button>
                </div>
            </div>

            <div className="tab-search-icon">
                <button className="tab-btn">검색</button>
            </div>
        </div>
    )
}

export default TabPanel;