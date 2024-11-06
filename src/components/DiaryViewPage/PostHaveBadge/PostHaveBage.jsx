import "../PostHaveBadge/posthavebadge.css";
import PostBadge from "../PostBadge/PostBadge";
import { useState, useEffect } from "react";
import api from "../../../api/axios";

import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { LinearMessagesConversationCheckRead } from "../../../assets/icons/LinearMessagesConversationCheckRead";

function PostHaveBage(props) {
    const { post } = props;
    const [userNickName, setUserNickName] = useState("");
    const [userImg, setUserImg] = useState([]);
    const [currentImgIndex, setCurrentImgIndex] = useState(0); // 현재 이미지 인덱스 상태 추가



    useEffect(() => {
        // post.user_id에 실제로 닉네임을 가져오고 싶은 사용자 ID가 있는지 확인
        if (post.user_id) {
            getRecentDiary(post.user_id);
        }

    }, [post.user_id]); // post.user_id가 변경될 때마다 재실행하도록 설정

    useEffect(() => {
        // post_id가 가지고있는 이미지 리스트를 가져오는 함수
        if (post.post_id) {
            getPostImg(post.post_id);
        }
    }, [post.post_id])

    // user_id를 기반으로 사용자의 닉네임을 가져오는 함수
    const getRecentDiary = async (userId) => { // 매개변수를 userId로 변경
        console.log("전달받은 데이터에 있는 user_id로 해당 유저의 닉네임 가져오기");

        try {
            const response = await api.get('/amadda/usernickname', {
                params: { userId }
            });
            console.log("debug >>> axios get response data : ", response.data);
            setUserNickName(response.data);

        } catch (err) {
            console.log("최근 일기를 가져오는 중 오류 발생:", err);
        }
    };

    // post_id를 기반으로 해당 게시물의 이미지를 가져오는 함수
    const getPostImg = async (postId) => {
        console.log("전달받은 게시물 id로 이미지를 불러오기");

        try {
            const response = await api.get('/amadda/postImg', { params: { postId } });
            console.log("debug >>> axios get response data : ", response.data);
            setUserImg(response.data);

        } catch (e) {
            console.log("이미지 불러오는 중 오류 발생", e);

        }

    }

    // 이미지 클릭 핸들러
    const handleImageClick = () => {
        // 다음 이미지 인덱스 계산 (리스트의 길이를 초과하지 않도록)
        setCurrentImgIndex((prevIndex) => (prevIndex + 1) % userImg.length);
    };

    return (
        <div className="posthavebadge-container">
            <div className="img-container">
                <div className="pin-color">RED PIN</div>
                <img className="diary-post-img" src={userImg[currentImgIndex]?.imgLink} // imgLink가 실제 이미지 URL이라고 가정
                    alt="게시물 이미지"
                    onClick={handleImageClick} // 이미지 클릭 시 핸들러 호출 
                />
                <p>{post.post_content}</p>
            </div>

            <div className="post-info">
                <div className="user-name">
                    <p className="text-name">{userNickName}</p>
                </div>

                <div className="post-title">
                    <div className="text-post-title">{post.post_title}</div>
                </div>

                <div className="hashtag">#해시태그</div>

                <div className="diary-badge">
                    <PostBadge />
                    <PostBadge />
                    <PostBadge />
                    <PostBadge />
                </div>

                {/* receipt_verification이 true일 때만 표시 */}
                {post.receipt_verification && (
                    <div className="receipt-mark">
                        영수증 인증 게시글
                        <LinearMessagesConversationCheckRead className="check-icon" icon={faCheckDouble} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostHaveBage;
