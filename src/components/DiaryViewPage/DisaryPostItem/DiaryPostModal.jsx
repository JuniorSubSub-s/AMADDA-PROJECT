import React, { useState, useEffect } from 'react';
import '../../PostModal/backgroundmodal.css';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const DiaryPostModal = ({ open, handleClose, post, image, tags }) => {
  console.log(post);
  console.log("받은 이미지" + image);
  console.log("받은 태그" + tags);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [reply, setReply] = useState('');
  const [replyIndex, setReplyIndex] = useState(null);

  // 이미지 인덱스 상태 추가
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 모달이 열릴 때마다 이미지 인덱스를 초기화
  useEffect(() => {
    if (open) {
      setCurrentImageIndex(0); // 모달이 열릴 때 첫 번째 이미지로 설정
    }
  }, [open]);  // `open` 값이 변경될 때마다 실행

  // 핀 색상 로직을 수정하여 post.restaurant.totalPost를 기준으로 색상을 결정
  const getPinColor = () => {
    if (!post || !post.restaurant || post.restaurant.totalPost === undefined) return "black"; // 기본값은 black
    const totalPost = post.restaurant.totalPost;

    if (totalPost < 50) return "black";
    if (totalPost < 100) return "red";
    if (totalPost < 200) return "orange";
    if (totalPost < 300) return "blue";
    if (totalPost < 400) return "yellow";
    return "purple";  // 400 이상은 purple
  };

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

  if (!post) {
    return null;  // post가 null이면 모달을 렌더링하지 않음
  }

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

  const formatDateToMinutes = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleString('ko-KR', options);
  };

  // 이미지 클릭 시 다음 이미지로 변경하는 함수
  const handleImageClick = () => {
    if (image && image.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % image.length);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="overlay-modal">
        <div className="close-modal">
          <IconButton className="close-button" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className="post-image-container">
          {image && image.length > 0 && (
            <div className={`post-image ${image.length > 1 ? 'multi-image' : ''}`} 
              onClick={image.length > 1 ? handleImageClick : null}
              style={image.length <= 1 ? { cursor: 'default' } : { cursor: 'pointer' }}
            >
              <img
                src={image[currentImageIndex]}
                alt="Post Image"
                width="100%"
                height="100%"
                style= {{width: '100%',  // Box 너비에 맞춤
                          height: '100%', // Box 높이에 맞춤
                          objectFit: 'cover', // 크롭하며 비율 유지
                }}
              />
              {image.length > 1 && (
                <div className="hover-text">
                  <p>다음 사진을 보고 싶다면 클릭해주세요</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="post-info">
          <div className="text-post-title-pin">
            <div className="text-post-title">{post.postTitle}</div>
            <div className="text-pin-color" style={{ color: getPinColor() }}>
              Pin-Color
            </div>
          </div>
          <div className="text-user-name">{post.userName}</div>
          <div className="text-post-date">{formatDateToMinutes(post.postDate)}</div>
          <div className="text-receipt">
            {post.receiptVerification
              ? '영수증 인증을 통한 신뢰성 검사가 된 게시글입니다.'
              : '영수증 인증을 하지 않은 게시글입니다.'}
          </div>

          {/* 태그 출력 부분 */}
          <div className="hash-tag-border">
            <div className="hash-tag-text">
              {tags && tags.length > 0 && tags.map((tag, index) => (
                <span key={index} className="text-hash-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="badge-border">
            <div className="badge-text">
              <div className="badge-text-wrapper">Badge1</div>
            </div>
          </div>

          <div className="comment-border">
            {comments.map((comment, index) => (
              <div key={index} className="comment-header">
                <img
                  className="user-profile-image"
                  alt="User profile image"
                  src="/img/userprofileimage.png"
                />
                <div className="comment-user-info">
                  <div className="comment-user-info-name">
                    <div className="user-name-text">{comment.userName}</div>
                    <div className="write-date-time-text">{comment.time}</div>
                  </div>
                  <div className="comment-text">{comment.text}</div>
                  <div
                    className="reply-push"
                    onClick={() => setReplyIndex(replyIndex === index ? null : index)}
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
                      <button type="submit" className="reply-submit-button">등록</button>
                    </form>
                    {comment.replies.map((reply, replyIndex) => (
                      <div key={replyIndex} className="reply-item">
                        <img
                          className="user-profile-reply-image"
                          alt="User profile image"
                          src="/img/userprofileimage.png"
                        />
                        <div className="reply-user-info">
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

export default DiaryPostModal;