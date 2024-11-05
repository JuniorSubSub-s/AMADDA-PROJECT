
// 가장 최근에 올라온 맛집 일기 page
import PostHaveBage from "../../components/DiaryViewPage/PostHaveBadge/PostHaveBage";
import "../../ui/DiaryViewPage/mainrecentdiary.css"
import { useState, useEffect } from "react";
import api from '../../api/axios'; // api의 예

function MainRecentDiary() {

    const [recentDiary, setRecentDiary] = useState([]);
    const [visibleCount, setVisibleCount] = useState(4); // 현재 보여줄 포스트 수

    useEffect(() => {
        getRecentDiary();

    }, []);
    // spring에 작성한 일기중에 가장 최근 데이터 8개를 불러오는 작업을 요청
    const getRecentDiary = async () => {
        console.log("가장 최근에 올라온 맛집 일기");

        try {
            const response = await api.get('/amadda/recentdiay');
            console.log("debug >>> axios get response data : ", response.data);
            setRecentDiary(response.data);

        } catch (err) {
            console.log("Error fetching recent diaries:", err);
        }
    }

    // 더 보기 버튼 클릭 시 호출되는 함수
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 4); // 4개씩 증가
    };

    // 되돌리기 버튼 클릭시 호출되는 함수
    const handlerReturn = () => {
        setVisibleCount((prevCount) => prevCount - 4);
    };

    return (
        <div className="recentDiary-container">
            <p className="main-title-1">가장 최근에 올라온 맛집 일기</p>
            <div className="main-title-underbar" />
            <div className="post-group">
                {recentDiary.slice(visibleCount-4, visibleCount).map((post) => ( // slice는 배열의 일부를 추출하는 메서드
                    <PostHaveBage key={post.post_id} post={post} />
                ))}
            </div>

            <div className="diary-btn-container">
                <button className="post-btn" onClick={handlerReturn}>되돌리기</button>
                <button className="post-btn" onClick={handleLoadMore}>더 보기</button>
            </div>
        </div>
    )
}
export default MainRecentDiary;
