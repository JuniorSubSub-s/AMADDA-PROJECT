import MainHeader from "../Header/MainHeader";
import Footer from "../Foorter/Footer";

import MainRecentDiary from "./MainRecentDiary";
import TopHotDiary from "./TopHotDiary";
import TravelMatzip from "./TravelMatzip";
import TabPanel from "./TabPanel";

import "../../ui/DiaryViewPage/DiaryViewPage.css";

function DiaryViewPage() {
    return (
        <div>
            <MainHeader />

            {/* PostMain에있는 상단 이미지와 카테고리 검색 바(TabPanel) */}
            <div className="background">
                <div className="page-title-container">
                    <div className="page-title">지역별 HOT PIN 맛집</div>
                    <div className="page-subject">
                        <div className="text-subject-1">제일 HOT한</div>
                        <div className="text-subject-2">맛집을 찾아보세요</div>
                    </div>
                </div>

                <div className="tabpanel-container">
                    <TabPanel />
                </div>
            </div>

            <MainRecentDiary />
            <TopHotDiary />
            <TravelMatzip />

            <Footer />
        </div>
    );
}

export default DiaryViewPage;