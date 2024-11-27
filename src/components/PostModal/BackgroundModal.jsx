import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './backgroundmodal.css';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const BackgroundModal = ({ open, handleClose, post, pinColors, restaurant }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [reply, setReply] = useState('');
  const [replyIndex, setReplyIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // 댓글 hover 상태 관리
  const [hoveredCommentId, setHoveredCommentId] = useState(null);
  const [userId, setUserId] = useState(null);  // JWT에서 가져온 사용자 ID
  const [hoveredReplyId, setHoveredReplyId] = useState(null);  // 답글에 대한 hover 상태 추가
  const navigate = useNavigate();

  // API 기본 URL을 상수로 정의
  const API_BASE_URL = 'http://localhost:7777/api/restaurants';

  // JWT 토큰을 디코딩하는 함수
  const parseJwt = useCallback((token) => {
    try {
      const base64Url = token.split('.')[1];  // JWT 토큰은 "header.payload.signature" 형태
      const base64 = base64Url.replace('-', '+').replace('_', '/');  // Base64 URL encoding을 일반 Base64로 변경
      const decodedPayload = JSON.parse(window.atob(base64));  // base64 디코딩 후 JSON 파싱
      return decodedPayload;  // 디코딩된 payload 반환
    } catch (e) {
      console.error('JWT 디코딩 실패:', e);
      return null;
    }
  }, []);


  // 날짜 포맷팅 함수
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

  // 댓글 불러오기
  const getComment = useCallback(() => {
    if (!post?.postId) return;

    axios.get(`${API_BASE_URL}/posts/${post.postId}/comments`)
      .then((response) => {
        // 댓글 데이터를 최신순으로 정렬
        const sortedComments = response.data.sort((a, b) => {
          return new Date(b.createTime) - new Date(a.createTime);  // createTime 기준 내림차순 정렬
        });
        setComments(sortedComments);  // 정렬된 댓글 데이터 상태 업데이트
      })
      .catch((error) => {
        console.error('댓글 불러오기 실패:', error.response ? error.response.data : error.message);
      });
  }, [post?.postId]);

  // 댓글의 답글을 가져오는 함수
  const getReplies = useCallback((commentId) => {
    axios.get(`${API_BASE_URL}/comments/${commentId}/replies`)
      .then((response) => {
        // 답글 데이터를 시간순으로 내림차순 정렬
        const sortedReplies = response.data.sort((a, b) => {
          return new Date(b.replyCreateTime) - new Date(a.replyCreateTime);
        });

        setComments(prevComments => prevComments.map(comment => {
          if (comment.commentId === commentId) {
            return { ...comment, replies: sortedReplies };
          }
          return comment;
        }));
      })
      .catch((error) => {
        console.error('답글 불러오기 실패:', error.response ? error.response.data : error.message);
      });
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    if (open && post?.postId) {
      getComment();
      setCurrentImageIndex(0);
    }
  }, [open, post, getComment]);

  // JWT에서 userId를 추출
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const decodedJwt = parseJwt(jwt);
      setUserId(decodedJwt?.userId || null);
    }
  }, [parseJwt]);

  // 핀 색상 계산
  const getPinColor = useMemo(() => {
    if (!post?.restaurant?.totalPost) return 'black';
    const totalPost = post.restaurant.totalPost;
    if (totalPost < 50) return 'black';
    if (totalPost < 100) return 'red';
    if (totalPost < 200) return 'orange';
    if (totalPost < 300) return 'blue';
    if (totalPost < 400) return 'yellow';
    return 'purple';
  }, [post?.restaurant?.totalPost]);

  // 댓글 삭제 함수
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

  // 답글 삭제 함수
  const handleDeleteReply = useCallback((commentId, replyIndex) => {
    const replyId = comments[commentId].replies[replyIndex].replyId;
    axios.delete(`${API_BASE_URL}/replies/${replyId}`)
      .then(() => {
        setComments(prevComments => {
          const updatedComments = [...prevComments];
          updatedComments[commentId].replies.splice(replyIndex, 1);
          return updatedComments;
        });
        getReplies(commentId);
        alert('답글이 삭제되었습니다.');
      })
      .catch((error) => {
        console.error('답글 삭제 실패:', error);
        alert('답글 삭제 오류발생.');
      });
  }, [comments, getReplies]);

  // 댓글 제출 함수
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

  // 답글 제출 함수
  const handleReplySubmit = useCallback((e, commentId) => {
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

    axios.post(`${API_BASE_URL}/comments/${commentId}/replies?${params}`)
      .then(() => {
        getReplies(commentId);
        setReply('');
      })
      .catch((error) => {
        console.error('답글 등록 실패:', error);
      });
  }, [reply, parseJwt, getReplies, navigate]);

  // 이벤트 핸들러들
  const handleReplyClick = useCallback((commentId) => {
    setReplyIndex(prevIndex => (prevIndex === commentId ? null : commentId));
    if (!comments.some(comment => comment.commentId === commentId && comment.replies)) {
      getReplies(commentId);
    }
  }, [comments, getReplies]);

  const handleImageClick = useCallback(() => {
    if (combinedImages.length > 0) {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % combinedImages.length);
    }
  }, [post?.foodImageUrls]);

  // Hover 이벤트 핸들러
  const handleMouseEnter = useCallback((id) => setHoveredCommentId(id), []);
  const handleMouseLeave = useCallback(() => setHoveredCommentId(null), []);
  const handleMouseEnterReply = useCallback((id) => setHoveredReplyId(id), []);
  const handleMouseLeaveReply = useCallback(() => setHoveredReplyId(null), []);

    // 이미지 배열 생성
    const combinedImages = post?.themeDiaryImg
    ? [post.themeDiaryImg, ...(post.foodImageUrls || [])]
    : post?.foodImageUrls || [];

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

        {/* 포스트 정보 섹션 */}
        <div className="post-info">
          <div className="text-post-title-pin">
            <div className="text-post-title">{post.postTitle}</div>
            <div className="text-pin-color" style={{ color: getPinColor }}>
              Pin-Color
            </div>
          </div>
          <div className="text-restaurant-name">{post.restaurant.restaurantName}</div>
          <div className="text-user-name">{post.userNickname}</div>
          <div className="text-post-date">{formatDateToMinutes(post.postDate)}</div>
          <div className="text-receipt">
            {post.receiptVerification
              ? '영수증 인증을 통한 신뢰성 검사가 된 게시글입니다.'
              : '영수증 인증을 하지 않은 게시글입니다.'}
          </div>

          {/* 태그 섹션 */}
          <div className="hash-tag-border">
            <div className="hash-tag-text">
              {post.tagNames?.length > 0 ? (
                post.tagNames.slice(0, 5).map((tag, index) => (
                  <div key={index} className="text-hash-tag">
                    #{tag}
                  </div>
                ))
              ) : (
                <div className='no-tag'>태그가 없습니다.</div>
              )}
            </div>
          </div>

          {/* 배지 섹션 */}
          <div className="badge-border">
            <div className="badge-text">
              {post.badgeImages?.length > 0 ? (
                post.badgeImages.slice(0, 5).map((badge, index) => (
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

          {/* 포스트 내용 섹션 */}
          <div className='post-content-modal-border'>
            <div className='modal-content-text'>
              {post.postContent}
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="comment-border">
            {comments?.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={comment.commentId}
                  className="comment-header"
                  onMouseEnter={() => handleMouseEnter(comment.commentId)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* 삭제 버튼 */}
                  {(userId === comment.user?.userId || userId === post.user?.userId) &&
                    hoveredCommentId === comment.commentId && (
                      <DeleteIcon
                        className="comment-delete-button"
                        onClick={() => handleDeleteComment(comment.commentId)}
                      />
                    )}

                  {/* 프로필 이미지 */}
                  <img
                    className="user-profile-image"
                    alt="User profile"
                    src={comment.user?.profileImage || 'default-profile-image-url'}
                  />
                  {/* 댓글 사용자 정보 */}
                  <div className="comment-user-info">
                    <div className="comment-user-info-name">
                      <div className="user-name-text">
                        {comment.user?.userNickname || '알 수 없는 사용자'}
                      </div>
                      <div className="write-date-time-text">
                        {comment.createTime
                          ? formatDateToMinutes(comment.createTime)
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

                  {/* 답글 섹션 */}
                  {replyIndex === comment.commentId && (
                    <div className="reply-container">
                      {/* 답글 입력 폼 */}
                      <form
                        onSubmit={(e) => handleReplySubmit(e, comment.commentId)}
                        className="reply-form"
                      >
                        <input
                          type="text"
                          className="reply-input-box"
                          placeholder="답글 달기..."
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                        />
                        <button type="submit" className="reply-submit-button">
                          등록
                        </button>
                      </form>

                      {/* 답글 목록 */}
                      {comment.replies?.length > 0 ? (
                        comment.replies.map((reply, replyIndex) => (
                          <div
                            key={reply.replyId || replyIndex}
                            className="reply-item"
                            onMouseEnter={() => handleMouseEnterReply(reply.replyId)}
                            onMouseLeave={handleMouseLeaveReply}
                          >
                            {/* 답글 삭제 버튼 */}
                            {(userId === reply.user?.userId || userId === post.user?.userId) &&
                              hoveredReplyId === reply.replyId && (
                                <DeleteIcon
                                  className="reply-delete-button"
                                  onClick={() => handleDeleteReply(index, replyIndex)}
                                />
                              )}

                            {/* 답글 작성자 프로필 이미지 */}
                            <img
                              className="user-profile-reply-image"
                              alt="User profile"
                              src={reply.user?.profileImage || 'default-profile-image-url'}
                            />

                            {/* 답글 작성자 정보 */}
                            <div className="reply-user-info">
                              <div className="reply-user-name">
                                {reply.user?.userNickname || '알 수 없는 사용자'}
                              </div>
                              <div className="reply-time">
                                {reply.replyCreateTime
                                  ? formatDateToMinutes(reply.replyCreateTime)
                                  : '알 수 없는 시간'}
                              </div>
                            </div>

                            {/* 답글 내용 */}
                            <div className="reply-text">{reply.replyContent}</div>
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

          {/* 댓글 작성 폼 */}
          <div className="comment-write">
            <form
              onSubmit={handleCommentSubmit}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <input
                type="text"
                className="comment-input-box"
                placeholder="댓글 달기..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit" className="comment-btn">등록</button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BackgroundModal;