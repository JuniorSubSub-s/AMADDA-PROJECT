// 맛잘알 회원들의 Top Hot 맛집 일기 page
import PostNotBadge from "../../components/DiaryViewPage/PostNotBadge/PostNotBadge";

import "../../ui/DiaryViewPage/tophotdiary.css"

function TopHotDiary () {
    return (
        <div className="hotTopDiary-container">
            <p className="main-title-1">맛잘알 회원들의 Top Hot 맛집 일기</p>
            <div className="main-title-underbar" />

            <div className="tophot-post-group">
                <PostNotBadge/>
                <PostNotBadge/>
                <PostNotBadge/>
                <PostNotBadge/>
            </div>
            <div className="topHot-btn-container">
                <button className="post-btn">더 보기</button>
                <button className="post-btn">되돌리기</button>
            </div>
        </div>
    )
}

export default TopHotDiary;