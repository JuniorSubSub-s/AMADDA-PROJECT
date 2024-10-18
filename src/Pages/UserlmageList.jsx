import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  LinearArrowsActionLogin21  from "../Icons/LinearArrowActionLogin21/LinearArrowActionLogin21";
import  LinearMessagesConversationChatRoundMoney1  from "../Icons/LinearMessagesConversationChatRoundMoney1/LinearMessagesConversationChatRoundMoney1";
import  LinearNotificationsBell  from "../Icons/LinearNotificationsBell/LinearNotificationsBell";
import  LinearUsersUserRounded1  from "../Icons/LinearUserUserRounded1/LinearUsersUserRounded1";
import "./Style.css";

function UserImageList () {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };


  return (
    <div className="user-image-list">
      <div className="overlap">
        <div className="user-back-ground" />
        <div className="category">
          <div className="overlap-group">
            <img className="line" alt="Line" src="/img/line-24.svg" />
            {["게시물", "정보", "친구", "사진", "열람 관리"].map((category) => (
              <div
                key={category}
                className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
                onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
              >
                <div className="text-wrapper">{category}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="user-header">
          <div className="user-info">
            <div className="user-name">
              <div className="frame-4">
                <div className="text-wrapper-2">구독중</div>
              </div>
              <div className="text-wrapper-3">이원준님</div>
            </div>
            <div className="frame-5">
              <div className="frame-4">
                <div className="text-wrapper-2">보유코인</div>
              </div>
              <div className="text-wrapper-3">2000AC</div>
            </div>
          </div>
          <div className="overlap-2">
            <div className="ellipse" />
            <img className="male-user" alt="Male user" src="/img/male-user.png" />
            <div className="ellipse-2" />
            <img className="camera" alt="Camera" src="/img/camera.png" />
          </div>
        </div>
      </div>
      <div className="main">
        <div className="user-profile">
          <div className="calender">
            <div className="date">
              {/* /달력 api 사용할 것 그리고 거기에 해당 게시글 날짜 hover사용해서 이벤트*/} 
            </div>
          </div>
          <img className="line-2" alt="Line" src="/img/line-25.svg" />
          <img className="line-3" alt="Line" src="/img/line-26.svg" />
          <div className="title">
            <div className="text-wrapper-42">{selectedCategory || "카테고리를 선택하세요"}</div>
          </div>
          <div className="overlap-3">
            {selectedCategory === "사진" && (
              <div className="image-frame">
                <div className="overlap-group-2">
                  <div className="text-wrapper-43">UserImg1</div>
                </div>
              </div>
            )}
            <div className="overlap-wrapper">
              <div className="overlap-group-2">
                <div className="text-wrapper-43">UserImg1</div>
              </div>
            </div>
            <div className="overlap-group-wrapper">
              <div className="overlap-group-2">
                <div className="text-wrapper-43">UserImg1</div>
              </div>
            </div>
            <div className="image-frame-2">
              <div className="overlap-group-2">
                <div className="text-wrapper-43">UserImg1</div>
              </div>
            </div>
            <div className="image-frame-3">
              <div className="overlap-group-2">
                <div className="text-wrapper-43">UserImg1</div>
              </div>
            </div>
            <div className="image-frame-4">
              <div className="overlap-group-2">
                <div className="text-wrapper-43">UserImg1</div>
              </div>
            </div>
            <div className="image-frame-5">
              <div className="overlap-group-2">
                <div className="text-wrapper-43">UserImg1</div>
              </div>
            </div>
            <div className="image-frame-6">
              <div className="overlap-group-2">
                <div className="text-wrapper-43">UserImg1</div>
              </div>
            </div>
            <div className="image-frame-7">
              <div className="overlap-group-2">
                <div className="text-wrapper-43">UserImg1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar">
        <div className="container">
          <div className="text-wrapper-44" onClick={() => navigate("/saerch-food")}>맛집 찾기</div>
        </div>
        <div className="container-2">
          <div className="text-wrapper-45" onClick={() => navigate("/view-diary")}>일기 보기</div>
        </div>
        <div className="form">
          <div className="overlap-group-3">
            <div className="input">
              <div className="container-3">
                <div className="text-wrapper-46" onClick={() => navigate("/search")}>검색어를 입력해 주세요.</div>
              </div>
            </div>
            <img className="SVG" alt="Svg" src="/img/svg.svg" />
          </div>
        </div>
        <div className="text-wrapper-47" onClick={() => navigate("/login")}>로그인</div>
        <div className="text-wrapper-48" onClick={() => navigate("/payment-coin")}>코인결제</div>
        <div className="text-wrapper-49" onClick={() => navigate("/subscribe")}>구독신청</div>
        <div className="text-wrapper-50" onClick={() => navigate("/mypage")}>마이</div>
        <div className="clip-path-group-wrapper">
          <div className="clip-path-group">
            <div className="group">
              <div className="overlap-group-4">
                <div className="element" />
                <div className="text-wrapper-51">AMADDA!</div>
                <div className="FOOD-DIARY">FOOD &amp; DIARY</div>
              </div>
            </div>
          </div>
        </div>
        <LinearArrowsActionLogin21 className="linear-arrows-action" />
        <LinearUsersUserRounded1 className="linear-users-user" />
        <LinearNotificationsBell className="linear-notifications" />
        <LinearMessagesConversationChatRoundMoney1 className="linear-messages" />
      </div>
    </div>
  );
};

export default UserImageList;