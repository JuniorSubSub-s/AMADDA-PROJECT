import React from "react";
import { useNavigate } from "react-router-dom";
import  LinearArrowActionLogin21 from "../../assets/icons/LinearArrowActionLogin21/LinearArrowActionLogin21"
import  LinearMessagesConversationChatRoundMoney1  from "../../assets/icons/LinearMessagesConversationChatRoundMoney1/LinearMessagesConversationChatRoundMoney1";
import  LinearNotificationsBell  from "../../assets/icons/LinearNotificationsBell/LinearNotificationsBell";
import  LinearUsersUserRounded1  from "../../assets/icons/LinearUserUserRounded1/LinearUsersUserRounded1";
import "../../ui/Header/MainHeader.css";

function Header () {

  const navigate = useNavigate();

  const handleMainPageClick = () => {
    navigate("/amadda");
  };

  const handleFindBestResPageClick = () => {
    navigate("/amadda/findRes");
  };

  const handleLoginPageClick = () => {
    navigate("/amadda/loginPage")
  }

  const handleDiaryViewPageClick = () => {
    navigate("/amadda/diary-view")
  }

  const hadleCateResPageClick = () => {
    navigate("/amadda/bestRes")
  }

  const handleMyPageClick = () => {
    navigate("/amadda/myPage")
  }

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
          <div className="text-matzip">맛집 찾기</div>
        </div>

        <div className="btn-diary" onClick={handleDiaryViewPageClick}>
          <div className="text-diary">일기 보기</div>
        </div>

        <div className="btn-category" onClick={hadleCateResPageClick}>
          <div className="text-category">카테고리별 일기 찾기</div>
        </div>
      </div>
      <div className="form">
        <div className="form-container">
          <div className="form-input-container">
            <input type="text" className="text-form" placeholder="검색어를 입력해 주세요."/>
          </div>

          <img className="search-img" alt="Svg" src="/img/svg.svg" />
        </div>
      </div>
      <div className="navemoji">
        <div className="loginicon" onClick={handleLoginPageClick}>
          <LinearArrowActionLogin21 className="linear-arrows-action" />
          <p className="text-login">로그인</p>
        </div>

        <div className="coinicon">
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

  </div>
  );
};

export default Header;