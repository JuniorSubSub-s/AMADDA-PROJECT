import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../../PostModal/backgroundmodal.css';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


const DiaryPostModal = ({ open, handleClose, post, image, tags, badgeImages }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [reply, setReply] = useState('');
  const [replyIndex, setReplyIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredCommentId, setHoveredCommentId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [hoveredReplyId, setHoveredReplyId] = useState(null);
  const navigate = useNavigate();




  // API 기본 URL 상수 정의
  const API_BASE_URL = 'http://localhost:7777/api/restaurants';

  // 이미지 배열 생성
  const combinedImages = post.themeDiaryImg
    ? [post.themeDiaryImg, ...image] // post.themeDiaryImg가 있을 경우 배열에 추가
    : image; // 없으면 기존 image 배열만 사용


  // JWT 토큰을 디코딩하는 함수 (useCallback으로 메모이제이션)
  const parseJwt = useCallback((token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const decodedPayload = JSON.parse(window.atob(base64));
      return decodedPayload;
    } catch (e) {
      console.error('JWT 디코딩 실패:', e);
      return null;
    }
  }, []);

  // 날짜 포맷팅 함수 (useCallback으로 메모이제이션)
  const formatDateToMinutes = useCallback((dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleString('ko-KR', options);
  }, []);

  // 핀 색상 계산 함수 (useMemo로 최적화)
  const getPinColor = useMemo(() => {
    if (!post || !post.restaurant || post.restaurant.totalPost === undefined) return 'black';
    const totalPost = post.restaurant.totalPost;
    if (totalPost < 50) return 'black';
    if (totalPost < 100) return 'red';
    if (totalPost < 200) return 'orange';
    if (totalPost < 300) return 'blue';
    if (totalPost < 400) return 'yellow';
    return 'purple';
  }, [post]);

  // 댓글 불러오기 함수 (useCallback으로 메모이제이션)
  const getComment = useCallback(() => {
    if (!post?.postId) return;

    axios.get(`${API_BASE_URL}/posts/${post.postId}/comments`)
      .then((response) => {
        const sortedComments = response.data.sort((a, b) =>
          new Date(b.createTime) - new Date(a.createTime)
        );
        setComments(sortedComments);
      })
      .catch((error) => {
        console.error('댓글 불러오기 실패:', error.response ? error.response.data : error.message);
      });
  }, [post?.postId]);

  // 답글 불러오기 함수 (useCallback으로 메모이제이션)
  const getReplies = useCallback((commentId) => {
    axios.get(`${API_BASE_URL}/comments/${commentId}/replies`)
      .then((response) => {
        const sortedReplies = response.data.sort((a, b) =>
          new Date(b.replyCreateTime) - new Date(a.replyCreateTime)
        );

        setComments(prevComments => prevComments.map(comment =>
          comment.commentId === commentId ? { ...comment, replies: sortedReplies } : comment
        ));
      })
      .catch((error) => {
        console.error('답글 불러오기 실패:', error.response ? error.response.data : error.message);
      });
  }, []);

  // 댓글 변경 핸들러 (원본 코드에서 누락된 부분 복원)
  const handleCommentChange = useCallback((e) => {
    setNewComment(e.target.value);
  }, []);

  // 답글 변경 핸들러 (원본 코드에서 누락된 부분 복원)
  const handleReplyChange = useCallback((e) => {
    setReply(e.target.value);
  }, []);

  // 이펙트 훅들 최적화
  useEffect(() => {
    if (open && post?.postId) {
      getComment();
      setCurrentImageIndex(0);
    }
  }, [open, post, getComment]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const decodedJwt = parseJwt(jwt);
      setUserId(decodedJwt?.userId || null);
    }
  }, [parseJwt]);

  // 댓글 삭제 핸들러 (useCallback으로 메모이제이션)
  const handleDeleteComment = useCallback((commentId) => {
    axios.delete(`${API_BASE_URL}/comments/${commentId}`)
      .then(() => {
        setComments(prevComments => prevComments.filter(comment => comment.commentId !== commentId));
        alert('댓글이 삭제되었습니다.');
      })
      .catch((error) => {
        console.error('댓글 삭제 실패:', error.response ? error.response.data : error.message);
        alert('오류가 발생했습니다.');
      });
  }, []);

  // 답글 삭제 핸들러 (useCallback으로 메모이제이션)
  const handleDeleteReply = useCallback((commentId, replyIndex) => {
    const replyId = comments[commentId].replies[replyIndex].replyId;
    axios.delete(`${API_BASE_URL}/replies/${replyId}`)
      .then(() => {
        setComments(prevComments => {
          const updatedComments = [...prevComments];
          updatedComments[commentId].replies.splice(replyIndex, 1);
          return updatedComments;
        });
        getReplies(comments[commentId].commentId);
        alert('답글이 삭제되었습니다.');
      })
      .catch((error) => {
        console.error('답글 삭제 실패:', error);
        alert('답글 삭제 오류발생.');
      });
  }, [comments, getReplies]);

  // 댓글 제출 핸들러 (useCallback으로 메모이제이션)
  const handleCommentSubmit = useCallback((e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      console.error('로그인된 사용자가 없습니다.');
      alert("로그인된 사용자가 없습니다")
      navigate('/amadda/loginPage'); // 로그인 페이지로 리디렉션
      return;
    }

    const decodedJwt = parseJwt(jwt);
    if (!decodedJwt?.userId) return;

    const params = new URLSearchParams({
      userId: decodedJwt.userId,
      postId: post.postId,
      commentContent: newComment
    });

    axios.post(`${API_BASE_URL}/comments?${params}`)
      .then(() => {
        getComment();
        setNewComment('');
      })
      .catch((error) => {
        console.error('댓글 등록 실패:', error.response ? error.response.data : error.message);
      });
  }, [newComment, post?.postId, parseJwt, getComment, navigate]);

  // 답글 제출 핸들러 (useCallback으로 메모이제이션)
  const handleReplySubmit = useCallback((e, index) => {
    e.preventDefault();
    if (!reply.trim()) return;

    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      console.error('로그인된 사용자가 없습니다.');
      alert("로그인된 사용자가 없습니다")
      navigate('/amadda/loginPage'); // 로그인 페이지로 리디렉션
      return;
    }

    const decodedJwt = parseJwt(jwt);
    if (!decodedJwt?.userId) return;

    const params = new URLSearchParams({
      userId: decodedJwt.userId,
      replyContent: reply
    });

    axios.post(`${API_BASE_URL}/comments/${comments[index].commentId}/replies?${params}`)
      .then(() => {
        getReplies(comments[index].commentId);
        setReply('');
      })
      .catch((error) => {
        console.error('답글 등록 실패:', error);
      });
  }, [reply, comments, parseJwt, getReplies, navigate]);

  // 이벤트 핸들러들 (useCallback으로 메모이제이션)
  const handleReplyClick = useCallback((commentId) => {
    setReplyIndex(prevIndex => (prevIndex === commentId ? null : commentId));
    if (!comments.some(comment => comment.commentId === commentId && comment.replies)) {
      getReplies(commentId);
    }
  }, [comments, getReplies]);

  const handleImageClick = useCallback(() => {
    if (combinedImages && combinedImages.length > 0) {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % combinedImages.length);
    }
  }, [combinedImages]);

  const handleMouseEnter = useCallback((id) => setHoveredCommentId(id), []);
  const handleMouseLeave = useCallback(() => setHoveredCommentId(null), []);
  const handleMouseEnterReply = useCallback((id) => setHoveredReplyId(id), []);
  const handleMouseLeaveReply = useCallback(() => setHoveredReplyId(null), []);

  if (!post) return null;

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
          {combinedImages && combinedImages.length > 0 && (
            <div
              className={`post-image ${combinedImages.length > 1 ? 'multi-image' : ''}`}
              onClick={combinedImages.length > 1 ? handleImageClick : null}
              style={combinedImages.length <= 1 ? { cursor: 'default' } : { cursor: 'pointer' }}
            >
              <img
                src={combinedImages[currentImageIndex]}
                alt="Post Image"
                width="100%"
                height="100%"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {combinedImages.length > 1 && (
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
            <div className="text-pin-color" style={{ color: getPinColor }}>
              Pin-Color
            </div>
          </div>
          <div className="text-restaurant-name">{post.restaurant.restaurantName}</div>
          <div className="text-user-name">{post && post.user ? post.user.userNickname : "익명 사용자"}</div>
          <div className="text-post-date">{formatDateToMinutes(post.postDate)}</div>
          <div className="text-receipt">
            {post.receiptVerification
              ? '영수증 인증을 통한 신뢰성 검사가 된 게시글입니다.'
              : '영수증 인증을 하지 않은 게시글입니다.'}
          </div>

          <div className="hash-tag-border">
            <div className="hash-tag-text">
              {tags && tags.length > 0 ? (
                tags.slice(0, 5).map((tag, index) => (
                  <div key={index} className="text-hash-tag">
                    #{tag.length > 7 ? `${tag.slice(0, 5)}..` : tag}
                  </div>
                ))
              ) : (
                <div className='no-tag'>태그가 없습니다.</div>
              )}
            </div>
          </div>

          <div className="badge-border">
            <div className="badge-text">
              {badgeImages && badgeImages.length > 0 ? (
                badgeImages.slice(0, 5).map((badge, index) => (
                  <div key={index} className="badge-item-modal">
                    <div className="badge-image-container">
                      <img
                        src={badge}
                        className="badge-image"
                        alt={`Badge ${index}`}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className='no-badge'>뱃지가 없습니다.</div>
              )}
            </div>
          </div>
          <div className='post-content-modal-border'>
            <div className='modal-content-text'>
              {post.postContent}
            </div>
          </div>

          <div className="comment-border">
            {comments && comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={index}
                  className="comment-header"
                  onMouseEnter={() => handleMouseEnter(comment.commentId)}
                  onMouseLeave={handleMouseLeave}
                >
                  {(userId === comment.user?.userId || userId === post.user?.userId) && hoveredCommentId === comment.commentId && (
                    <DeleteIcon
                      className="comment-delete-button"
                      onClick={() => handleDeleteComment(comment.commentId)}
                    />
                  )}
                  <img
                    className="user-profile-image"
                    alt="User profile image"
                    src={comment.user?.profileImage || 'default-profile-image-url'}
                  />
                  <div className="comment-user-info">
                    <div className="comment-user-info-name">
                      <div className="user-name-text">{comment.user?.userNickname || '알 수 없는 사용자'}</div>
                      <div className="write-date-time-text">
                        {/* 작성 시간 포맷 */}
                        {comment.createTime
                          ? formatDateToMinutes(comment.createTime).toLocaleString()
                          : '알 수 없는 시간'}
                      </div>
                    </div>
                    {/* 댓글 내용 */}
                    <div className="comment-text">{comment.commentContent}</div>

                    {/* 답글 달기 버튼 */}
                    <div
                      className="reply-push"
                      onClick={() => handleReplyClick(comment.commentId)}
                    >
                      답글달기
                    </div>
                  </div>

                  {replyIndex === comment.commentId && (
                    <div className="reply-container">
                      <form onSubmit={(e) => handleReplySubmit(e, index)} className="reply-form">
                        <input
                          type="text"
                          className="reply-input-box"
                          placeholder="답글 달기..."
                          value={reply}
                          onChange={handleReplyChange}
                        />
                        <button type="submit" className="reply-submit-button">
                          등록
                        </button>
                      </form>

                      {comment.replies && comment.replies.length > 0 ? (
                        comment.replies.map((reply, replyIndex) => (
                          <div
                            key={replyIndex}
                            className="reply-item"
                            onMouseEnter={() => handleMouseEnterReply(reply.replyId)}
                            onMouseLeave={handleMouseLeaveReply}
                          >
                            {(userId === reply.user?.userId || userId === post.user?.userId) && hoveredReplyId === reply.replyId && (
                              <DeleteIcon
                                className="reply-delete-button"
                                onClick={() => handleDeleteReply(index, replyIndex)}
                              />
                            )}
                            <img
                              className="user-profile-reply-image"
                              alt="User profile image"
                              src={reply.user?.profileImage || 'default-profile-image-url'}
                            />
                            <div className="reply-user-info">
                              <div className="reply-user-name">{reply.user?.userNickname || '알 수 없는 사용자'}</div>
                              <div className="reply-time">
                                {reply.replyCreateTime ? formatDateToMinutes(reply.replyCreateTime).toLocaleString() : '알 수 없는 시간'}
                              </div>
                            </div>
                            <div className="reply-text">{reply.replyContent}</div>
                            {(userId === reply.userId || userId === post.user.userId) && (
                              <DeleteIcon
                                className="reply-delete-button"
                                onClick={() => handleDeleteReply(index, replyIndex)}
                              />
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="no-replies"></div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>댓글이 없습니다.</p>
            )}
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
              <button className="comment-btn">등록</button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DiaryPostModal;