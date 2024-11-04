import React, { useState } from 'react';
import './backgroundmodal.css';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const BackgroundModal = ({ open, handleClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [reply, setReply] = useState('');
  const [replyIndex, setReplyIndex] = useState(null);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        userName: 'user1',
        text: newComment,
        time: '방금 전',
        replies: []
      };
      setComments((prevComments) => [newCommentObj, ...prevComments]); // 위로 추가
      setNewComment('');
    }
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = (e, index) => {
    e.preventDefault();
    if (reply.trim()) {
      const newReply = {
        userName: 'user1',
        text: reply,
        time: '방금 전'
      };
      const updatedComments = [...comments];
      updatedComments[index].replies.push(newReply);
      setComments(updatedComments);
      setReply('');

    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal">
        <div className="close-modal">
          <IconButton className="close-button"
                      onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className="post-image" />
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
              {comments.map((comment, index) => (
                <div key={index} className="comment-header">
                  {/* 사용자 프로필 이미지 */}
                  <img
                    className="user-profile-image"
                    alt="User profile image"
                    src="/img/userprofileimage.png"
                  />
                  <div className="comment-user-info">
                    <div className='comment-user-info-name'>
                      {/* 사용자 이름과 작성 시간 표시 */}
                      <div className="user-name-text">{comment.userName}</div>
                      <div className="write-date-time-text">{comment.time}</div>
                    </div>
                    {/* 댓글 내용 표시 */}
                    <div className="comment-text">{comment.text}</div>
                    {/* 답글 달기 버튼 클릭 시 답글 입력란 표시 */}
                    <div
                      className="reply-push"
                      onClick={() => setReplyIndex(replyIndex === index ? null : index)} // 답글 입력란을 토글
                    >
                      답글달기
                    </div>
                  </div>
                  {replyIndex === index && (
                    <div className="reply-container">
                      <form onSubmit={(e) => handleReplySubmit(e, index)} className="reply-form">
                        <input
                          type="text"
                          className="reply-input-box"
                          placeholder="답글 달기..."
                          value={reply}
                          onChange={handleReplyChange}
                        />
                        <button type="submit" className="reply-submit-button">등록</button> {/* 등록 버튼 */}
                      </form>
                      {comment.replies.map((reply, replyIndex) => (
                        <div key={replyIndex} className="reply-item">
                          <img
                              className="user-profile-reply-image"
                              alt="User profile image"
                              src="/img/userprofileimage.png"
                            />
                          <div className='reply-user-info'>
                            <div className="reply-user-name">{reply.userName}</div>
                            <div className="reply-time">{reply.time}</div>
                          </div>
                                                      <div className="reply-text">{reply.text}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          <div className="comment-write">
            <form onSubmit={handleCommentSubmit} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                className="comment-input-box"
                placeholder="댓글 달기..."
                value={newComment}
                onChange={handleCommentChange}
            />
              <button className='comment-btn'>등록</button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BackgroundModal;