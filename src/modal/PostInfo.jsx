import React from 'react';
import '../css/postinfomodal.css';

const PostInfo = ({ post }) => {
  return (
        <div className="post-info">
            <div className="text-post-title">Post Title</div>
            <div className="text-user-name">User Name</div>
            <p className="text-receipt">
              영수증 인증을 통한 신뢰성 검사가 된 게시글입니다.
            </p>
            <div className="text-post-date">Post Date</div>
            <div className="text-pin-color">Pin Color</div>
            {/* postinfo가운데 맵쪽 보더 */}
            <div className="map-border">
              <div className="map-presentation">
                <div className="map-position">OO 부근에 위치</div>
                <div className="address-position">주소 제공 위치.</div>
                  <div className="staticmap" /> { /*여기가 모달안에 있는 이미지*/ }
              </div>
            </div>
            <div className="hash-tag-border">
              <div className="hash-tag-text">
                <div className="text-hash-tag-1">HashTag1</div>
                <div className="text-hash-tag-2">HashTag2</div>
                <div className="text-hash-tag-3">HashTag3</div>
                <div className="text-hash-tag-4">HashTag4</div>
                <div className="text-hash-tag-5">HashTag5</div>
                <div className="text-hash-tag-6">HashTag6</div>
                <div className="text-hash-tag-7">HashTag7</div>
                <div className="text-hash-tag-8">HashTag8</div>
                <div className="text-hash-tag-9">HashTag9</div>
                <div className="text-hash-tag-10">HashTag10</div>
              </div>
            </div>
            <div className="badge-border">
              <div className="badge-text">
                <div className="badge-text-wrapper">Badge1</div>
                <div className="badge-text-wrapper">Badge2</div>
                <div className="badge-text-wrapper">Badge3</div>
                <div className="badge-text-wrapper">Badge4</div>
                <div className="badge-text-wrapper">Badge5</div>
              </div>
            </div>
            <div className="comment-border">
              <div className="comment-header">
                <div className="user-name-text">user1</div>
                <div className="comment-text">저도 한번 가봐야겠어요!</div>
                <img
                  className="user-profile-image"
                  alt="User profile image"
                  src="/img/userprofileimage.png"
                />
                <div className="write-date-time-text">20시간 전</div>
                <div className="write-date-time-text-2">답글달기</div>
              </div>
              <div className="comment-header-2">
                <div className="user-name-text">Poster</div>
                <div className="comment-text">꼭 한번 와보세요~</div>
                <div className="overlap-group">
                <img
                    className="img"
                    alt="User profile image"
                    src="/img/userprofileimage.png"
                  />
                </div>
                <div className="write-date-time-text-3">18시간 전</div>
              </div>
              <div className="comment-header-3">
                <div className="user-name-text">user1</div>
                <div className="comment-text">저도 한번 가봐야겠어요!</div>
                <img
                  className="user-profile-image"
                  alt="User profile image"
                  src="/img/userprofileimage.png"
                />
                <div className="write-date-time-text">20시간 전</div>
                <div className="write-date-time-text-2">답글달기</div>
              </div>
            </div>
            <div className="comment-write">
              <img className="line" alt="Line" src="/img/line-35.png" />
              <div className="text-wrapper-18">댓글 달기...</div>
              <img
                className="user-profile-image-2"
                alt="User profile image"
                src="/img/userprofileimage.png"
              />
            </div>
        </div>
  )
}
export default PostInfo;