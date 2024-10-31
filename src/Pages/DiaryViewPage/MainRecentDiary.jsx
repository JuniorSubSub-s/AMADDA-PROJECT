// 가장 최근에 올라온 맛집 일기 page
import PostHaveBage from "../../components/DiaryViewPage/PostHaveBadge/PostHaveBage";
import "../../ui/DiaryViewPage/mainrecentdiary.css"

function MainRecentDiary () {
    return (
        <div className="recentDiary-container">
            <p className="main-title-1">가장 최근에 올라온 맛집 일기</p>
            <div className="main-title-underbar" />

            <div className="post-group">
                <PostHaveBage/>
                <PostHaveBage/>
                <PostHaveBage/>
                <PostHaveBage/>
            </div>
            
            <div className="diary-btn-container">
                <button className="post-btn">더 보기</button>
                <button className="post-btn">되돌리기</button>
            </div>
        </div>
    )
}

export default MainRecentDiary;