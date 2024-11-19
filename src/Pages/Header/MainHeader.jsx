import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinearArrowActionLogin21 from "../../assets/icons/LinearArrowActionLogin21/LinearArrowActionLogin21";
import LinearMessagesConversationChatRoundMoney1 from "../../assets/icons/LinearMessagesConversationChatRoundMoney1/LinearMessagesConversationChatRoundMoney1";
import LinearNotificationsBell from "../../assets/icons/LinearNotificationsBell/LinearNotificationsBell";
import LinearUsersUserRounded1 from "../../assets/icons/LinearUserUserRounded1/LinearUsersUserRounded1";
import "../../ui/Header/MainHeader.css";
import { isLoggedIn, logout } from "../../utils/auth";
import PaymentInfoModal from "../PaymentPage/PaymentInfoModal";
import getUserId from "../../utils/getUserId";



function Header() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // userId 상태 추가

  useEffect(() => {
    const loggedIn = isLoggedIn();
    setLoggedIn(loggedIn);

    // 로그인 상태일 때만 userId 가져오기
    if (loggedIn) {
      const jwt = localStorage.getItem("jwt"); // JWT 가져오기
      const userId = getUserId(jwt); // getUserId 함수로 userId 추출
      console.log("유저아이디 : ", userId);
      setUserId(userId);
    }
  }, []);

  const handleMainPageClick = () => {
    navigate("/amadda");
  };

  const handleFindBestResPageClick = () => {
    navigate("/amadda/postWrite");
  };

  const handleLoginPageClick = () => {
    navigate("/amadda/loginPage")
  };

  const handleDiaryViewPageClick = () => {
    navigate("/amadda/diary-view")
  };

  const hadleCateResPageClick = () => {
    navigate("/amadda/bestRes")
  };

  const handleMyPageClick = () => {
    if (userId) {
      navigate(`/amadda/myPage/${userId}`); // userId를 경로에 포함하여 마이페이지로 이동
    } else {
      console.error("유저 ID가 없습니다.");
      navigate("/amadda/loginPage")
    }
  };

  const handleCoinPaymentClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setUserId(null); // 로그아웃 시 userId 초기화
  };

  return (
    <div className="navbar">
      <div className="amadda-logo" onClick={handleMainPageClick}>
        <div className="amadda-img" />
        <div className="logo-title">
          <div className="logo_title">AMADDA!</div>
          <div className="subtitle">FOOD &amp; DIARY</div>
        </div>
      </div>

      <div className="navbtn">
        <div className="btn-matzip" onClick={handleFindBestResPageClick}>
          <div className="text-matzip">일기 작성</div>
        </div>

        <div className="btn-diary" onClick={handleDiaryViewPageClick}>
          <div className="text-diary">일기 보기</div>
        </div>

        <div className="btn-category" onClick={hadleCateResPageClick}>
          <div className="text-category">날씨 메뉴 추천</div>
        </div>
      </div>
      
      <div className="form">
        <div className="form-container">
          <div className="form-input-container">
            <input type="text" className="text-form" placeholder="검색어를 입력해 주세요." />
          </div>

          <img className="search-img" alt="Svg" src="/img/svg.svg" />
        </div>
      </div>

      <div className="navemoji">
        {!loggedIn ? (
          <div className="loginicon" onClick={handleLoginPageClick}>
            <LinearArrowActionLogin21 className="linear-arrows-action" />
            <p className="text-login">로그인</p>
          </div>
        ) : (
          <div className="loginicon" onClick={handleLogout}>
            <LinearArrowActionLogin21 className="linear-arrows-action" />
            <p className="text-login">로그아웃</p>
          </div>
        )}

        <div className="coinicon" onClick={handleCoinPaymentClick}>
          <LinearMessagesConversationChatRoundMoney1 className="linear-coin" />
          <p className="text-coin">코인결제</p>
        </div>

        <div className="noticeIcon">
          <LinearNotificationsBell className="linear-notifications" />
          <p className="text-notice">알림</p>
        </div>

        <div className="myicon" onClick={handleMyPageClick}>
          <LinearUsersUserRounded1 className="linear-users-user" />
          <p className="text-my">마이</p>
        </div>
      </div>

      <PaymentInfoModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Header;
