import "../PostHaveBadge/posthavebadge.css"
import PostBadge from "../PostBadge/PostBadge";

import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

import { LinearMessagesConversationCheckRead } from "../../../assets/icons/LinearMessagesConversationCheckRead";

function PostHaveBage (props) {
    return (
        <div className="posthavebadge-container">
            <div className="img-container">
                <div className="pin-color">
                    RED PIN
                </div>
                <img className="diary-post-img" src="/img/DiaryViewPageImg/trans-ssg-9.png" alt="게시물 이미지"/>
                <p>원래 여기에는 props로 넘겨받은 게시물의 id로 데이터를 불러올거임원래 여기에는 props로 넘겨받은 게시물의 id로 데이터를 불러올거임원래 여기에는 props로 넘겨받은 게시물의 id로 데이터를 불러올거임</p>
            </div>

            <div className="post-info">
                <div className="user-name">
                    <p className="text-name">이원준</p>
                </div>

                <div className="post-title">
                    <div className="text-post-title">Reading Title</div>
                </div>

                <div className="hashtag">#해시태그</div>

                <div className="receipt-mark">영수증 인증 게시글<LinearMessagesConversationCheckRead  className="check-icon" icon={faCheckDouble} /></div>
                

                <div className="diary-badge">
                    <PostBadge/>
                    <PostBadge/>
                    <PostBadge/>
                    <PostBadge/>
                </div>
            </div>

        </div>
    )
}

export default PostHaveBage;