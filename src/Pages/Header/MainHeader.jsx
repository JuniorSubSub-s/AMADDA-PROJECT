import React, { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../../utils/auth";

import "../../ui/Header/MainHeader.css";
import getUserId from "../../utils/getUserId";

// Lazy-loaded components
const UtilityIcons = lazy(() => import("./UtilityIcons"));
const NavigationButtons = lazy(() => import("./NavigationButtons"));
const SearchBar = lazy(() => import("./SearchBar"));
const PaymentInfoModal = lazy(() => import("../PaymentPage/PaymentInfoModal"));

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
      setUserId(userId);
    }
  }, []);

  // enum처럼 객체를 정의
  const ROUTES = {
    MAIN: "/amadda",
    POST_WRITE: "/amadda/postWrite",
    LOGIN: "/amadda/loginPage",
    DIARY_VIEW: "/amadda/diary-view",
    BEST_RES: "/amadda/bestRes",
    MY_PAGE: (userId) => `/amadda/myPage/${userId}`,
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setUserId(null); // 로그아웃 시 userId 초기화
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="navbar">
        <div className="amadda-logo" onClick={() => navigate(ROUTES.MAIN)}>
          <div className="amadda-img" />
          <div className="logo-title">
            <div className="logo_title">AMADDA!</div>
            <div className="subtitle">FOOD &amp; DIARY</div>
          </div>
        </div>

        <NavigationButtons
          handleFindBestResPageClick={() => navigate(ROUTES.POST_WRITE)}
          handleDiaryViewPageClick={() => navigate(ROUTES.DIARY_VIEW)}
          hadleCateResPageClick={() => navigate(ROUTES.BEST_RES)}
        />

        <SearchBar />

        <UtilityIcons
          loggedIn={loggedIn}
          handleLoginPageClick={() => navigate(ROUTES.LOGIN)}
          handleLogout={handleLogout}
          handleCoinPaymentClick={() => setIsModalOpen(true)}
          handleMyPageClick={() => navigate(ROUTES.MY_PAGE(userId))}
        />

        <PaymentInfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </Suspense>
  );
}

export default Header;
