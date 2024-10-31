import "./postnotbadge.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

function PostNotBadge (props) {
    return (
        <div className="postnotbadge-container">
            <div className="img-container">
                <div className="pin-color">
                    RED PIN
                </div>
                <img className="post-img" src="/img/DiaryViewPageImg/trans-ssg-9.png" alt="게시물 이미지"/>
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

                <div className="receipt-mark">영수증 인증 게시글<FontAwesomeIcon  className="check-icon" icon={faCheckDouble} /></div>

            </div>

        </div>
    )
}

export default PostNotBadge;