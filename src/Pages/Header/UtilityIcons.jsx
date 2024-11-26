import React from "react";

import LinearArrowActionLogin21 from "../../assets/icons/LinearArrowActionLogin21/LinearArrowActionLogin21";
import LinearMessagesConversationChatRoundMoney1 from "../../assets/icons/LinearMessagesConversationChatRoundMoney1/LinearMessagesConversationChatRoundMoney1";
import LinearNotificationsBell from "../../assets/icons/LinearNotificationsBell/LinearNotificationsBell";
import LinearUsersUserRounded1 from "../../assets/icons/LinearUserUserRounded1/LinearUsersUserRounded1";

function UtilityIcons({ loggedIn, handleLoginPageClick, handleLogout, handleCoinPaymentClick, handleMyPageClick }) {
  return (
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
  );
}

export default UtilityIcons;