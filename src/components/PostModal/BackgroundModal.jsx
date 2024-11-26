import React, { useState, useEffect } from 'react';
import './backgroundmodal.css';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const BackgroundModal = ({ open, handleClose, post, pinColors }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [reply, setReply] = useState('');
  const [replyIndex, setReplyIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // 댓글 hover 상태 관리
  const [hoveredCommentId, setHoveredCommentId] = useState(null);
  const [userId, setUserId] = useState(null);  // JWT에서 가져온 사용자 ID
  const [hoveredReplyId, setHoveredReplyId] = useState(null);  // 답글에 대한 hover 상태 추가

  // JWT 토큰을 디코딩하는 함수
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];  // JWT 토큰은 "header.payload.signature" 형태
      const base64 = base64Url.replace('-', '+').replace('_', '/');  // Base64 URL encoding을 일반 Base64로 변경
      const decodedPayload = JSON.parse(window.atob(base64));  // base64 디코딩 후 JSON 파싱
      return decodedPayload;  // 디코딩된 payload 반환
    } catch (e) {
      console.error('JWT 디코딩 실패:', e);
      return null;
    }
  };

  // 댓글 불러오기
  useEffect(() => {
    if (open && post && post.postId) {
      getComment();
    }
  }, [open, post]);

  // JWT에서 userId를 추출
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const decodedJwt = parseJwt(jwt);
      setUserId(decodedJwt?.userId || null);
    }
  }, []);

  const getComment = () => {
    axios.get(`https://amadda.kr:7777/api/restaurants/posts/${post.postId}/comments`)
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
  };

  // 댓글의 답글을 가져오는 함수
  const getReplies = (commentId) => {
    // 서버에서 해당 댓글의 답글을 가져옵니다.
    axios.get(`https://amadda.kr:7777/api/restaurants/comments/${commentId}/replies`)
      .then((response) => {
        // 답글 데이터를 시간순으로 내림차순 정렬
        const sortedReplies = response.data.sort((a, b) => {
          // 답글 시간 기준으로 내림차순 정렬 (최신 답글이 위로 오게)
          return new Date(b.replyCreateTime) - new Date(a.replyCreateTime);
        });

        // 댓글의 답글 데이터를 해당 댓글에 추가합니다.
        const updatedComments = comments.map(comment => {
          if (comment.commentId === commentId) {
            comment.replies = sortedReplies;  // 정렬된 답글 데이터를 댓글에 추가
          }
          return comment;
        });
        setComments(updatedComments);  // 상태 업데이트
      })
      .catch((error) => {
        console.error('답글 불러오기 실패:', error.response ? error.response.data : error.message);
      });
  };


  useEffect(() => {
    if (open) {
      setCurrentImageIndex(0); // 모달이 열릴 때 첫 번째 이미지로 설정
    }
  }, [open]);

  // 댓글 삭제 함수
  const handleDeleteComment = (commentId) => {
    axios.delete(`https://amadda.kr:7777/api/restaurants/comments/${commentId}`)
      .then((response) => {
        console.log('댓글 삭제 성공:', response.data);
        setComments(comments.filter((comment) => comment.commentId !== commentId));  // 삭제된 댓글 제외한 리스트로 업데이트
        alert('댓글이 삭제되었습니다.');  // 삭제 성공 시 알림
      })
      .catch((error) => {
        console.error('댓글 삭제 실패:', error.response ? error.response.data : error.message);
        alert('오류가 발생했습니다.');  // 삭제 실패 시 알림
      });
  };

  // 답글 삭제 버튼 hover 상태 처리
  const handleMouseEnterReply = (replyId) => {
    setHoveredReplyId(replyId);
  };

  const handleMouseLeaveReply = () => {
    setHoveredReplyId(null);
  };

  // 댓글 hover 시에만 삭제 버튼 보이도록 상태 설정
  const handleMouseEnter = (commentId) => {
    setHoveredCommentId(commentId);
  };

  const handleMouseLeave = () => {
    setHoveredCommentId(null);
  };

  const getPinColor = () => {
    if (!post || !post.restaurant || post.restaurant.totalPost === undefined) return 'black';
    const totalPost = post.restaurant.totalPost;
    if (totalPost < 50) return 'black';
    if (totalPost < 100) return 'red';
    if (totalPost < 200) return 'orange';
    if (totalPost < 300) return 'blue';
    if (totalPost < 400) return 'yellow';
    return 'purple';
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);

  };

  // 댓글 작성 함수
  const handleCommentSubmit = (e) => {
    e.preventDefault();


    if (newComment.trim()) {
      // JWT 토큰을 localStorage에서 가져오기
      const jwt = localStorage.getItem('jwt');  // 문자열 그대로 가져오기
      if (!jwt) {
        console.error('로그인된 사용자가 없습니다.');
        return; // 로그인되지 않은 경우 처리
      }

      // JWT 문자열을 사용해서 필요한 값 추출 (디코딩 필요)
      const decodedJwt = parseJwt(jwt);  // JWT 토큰을 디코딩하는 함수 호출

      if (!decodedJwt || !decodedJwt.userId || !decodedJwt.sub) {
        console.error('로그인된 사용자가 없습니다.');
        return;
      }

      const userId = decodedJwt.userId;
      const userName = decodedJwt.userName;

      // 새로운 댓글 객체
      const newCommentObj = {
        user: {},
        commentContent: newComment,  // 댓글 내용
        createTime: new Date().toISOString(),  // 댓글 시간
        replies: [],  // 댓글에 대한 답글 (빈 배열)
      };

      setComments((prevComments) => [newCommentObj, ...prevComments]); // 댓글 배열에 새로운 댓글 추가
      setNewComment('');  // 댓글 입력창 초기화

      // 백엔드로 댓글 전송 (쿼리 파라미터로 보내기)
      axios
        .post(`https://amadda.kr:7777/api/restaurants/comments?userId=${userId}&postId=${post.postId}&commentContent=${encodeURIComponent(newComment)}`)
        .then((response) => {
          console.log('댓글 등록 성공:', response.data);
          getComment();
        })
        .catch((error) => {
          console.error('댓글 등록 실패:', error.response ? error.response.data : error.message);
        });
    }
  };
  const handleReplyChange = (e) => {
    setReply(e.target.value);  // 답글 입력값을 상태로 저장
  };
  const handleReplySubmit = (e, index) => {
    e.preventDefault();

    if (reply.trim()) {
      // JWT 토큰을 localStorage에서 가져오기
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        console.error('로그인된 사용자가 없습니다.');
        return; // 로그인되지 않은 경우 처리
      }

      // JWT 문자열을 사용해서 필요한 값 추출 (디코딩 필요)
      const decodedJwt = parseJwt(jwt);  // JWT 토큰을 디코딩하는 함수 호출

      if (!decodedJwt || !decodedJwt.userId) {
        console.error('로그인된 사용자가 없습니다.');
        return;
      }

      const userId = decodedJwt.userId;

      const newReply = {
        userName: decodedJwt.sub,  // 사용자 이름
        text: reply,  // 답글 내용
        time: '방금 전', // 답글 작성 시간 (기본값, 실제 시간으로 수정 필요)
      };

      // 댓글에 답글을 추가
      const updatedComments = [...comments];

      // 해당 댓글에 replies 배열이 없으면 빈 배열로 초기화
      if (!updatedComments[index].replies) {
        updatedComments[index].replies = [];
      }

      // 새로운 답글을 replies 배열에 추가
      updatedComments[index].replies.push(newReply);

      // 최신 답글을 맨 위로 올리기 위해 replies 배열을 시간 기준 내림차순으로 정렬
      updatedComments[index].replies.sort((a, b) => new Date(b.time) - new Date(a.time));

      // 상태 업데이트
      setComments(updatedComments);
      setReply('');

      // 백엔드로 답글 전송
      axios.post(`https://amadda.kr:7777/api/restaurants/comments/${updatedComments[index].commentId}/replies`, null, {
        params: {
          userId: userId,  // JWT에서 얻은 userId 전달
          replyContent: reply,
        }
      })
        .then(() => {
          console.log('답글 등록 성공');
          getReplies(updatedComments[index].commentId);  // 답글 목록 최신화
        })
        .catch((error) => {
          console.error('답글 등록 실패:', error);
        });
    }
  };
  const handleReplyClick = (commentId) => {
    setReplyIndex((prevIndex) => (prevIndex === commentId ? null : commentId));

    // 댓글에 대한 답글을 불러오는 함수 호출
    if (!comments.some((comment) => comment.commentId === commentId && comment.replies)) {
      getReplies(commentId);
    }
  };

  const handleDeleteReply = (commentId, replyIndex) => {
    axios.delete(`https://amadda.kr:7777/api/restaurants/replies/${comments[commentId].replies[replyIndex].replyId}`)
      .then(() => {
        const updatedComments = [...comments];
        updatedComments[commentId].replies.splice(replyIndex, 1);  // 해당 답글 삭제
        setComments(updatedComments);
        getReplies(commentId);  // 답글 목록 최신화
        console.log('답글 삭제 성공');
        alert('답글이 삭제되었습니다.');
      })
      .catch((error) => {
        console.error('답글 삭제 실패:', error);
        alert('답글 삭제 오류발생.');
      });
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

  const handleImageClick = () => {
    if (post.foodImageUrls && post.foodImageUrls.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.foodImageUrls.length);
    }
  };


  if (!post) {
    return null; // post가 없으면 모달을 렌더링하지 않음
  }


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
          {post.foodImageUrls && post.foodImageUrls.length > 0 && (
            <div
              className={`post-image ${post.foodImageUrls.length > 1 ? 'multi-image' : ''}`}
              onClick={post.foodImageUrls.length > 1 ? handleImageClick : null}
              style={post.foodImageUrls.length <= 1 ? { cursor: 'default' } : { cursor: 'pointer' }}
            >
              <img
                src={post.foodImageUrls[currentImageIndex]}
                alt="Post Image"
                width="100%"
                height="100%"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {post.foodImageUrls.length > 1 && (
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
          <div className="text-user-name">{post.userNickname}</div>
          <div className="text-post-date">{formatDateToMinutes(post.postDate)}</div>
          <div className="text-receipt">
            {post.receiptVerification
              ? '영수증 인증을 통한 신뢰성 검사가 된 게시글입니다.'
              : '영수증 인증을 하지 않은 게시글입니다.'}
          </div>

          {/* 태그 부분 수정 */}
          <div className="hash-tag-border">
            <div className="hash-tag-text">
              {post.tagNames && post.tagNames.length > 0 ? (
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

          {/* 배지 이미지 부분 수정 */}
          <div className="badge-border">
            <div className="badge-text">
              {post.badgeImages && post.badgeImages.length > 0 ? (
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
                  {/* 프로필 이미지 출력 */}
                  <img
                    className="user-profile-image"
                    alt="User profile image"
                    src={comment.user?.profileImage || 'default-profile-image-url'} // 기본 이미지 설정
                  />
                  <div className="comment-user-info">
                    <div className="comment-user-info-name">
                      {/* 사용자 이름 및 작성 시간 */}
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

export default BackgroundModal;