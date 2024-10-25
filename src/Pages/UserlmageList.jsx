import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  LinearArrowsActionLogin21  from "../asserts/icons/LinearArrowActionLogin21/LinearArrowActionLogin21";
import  LinearMessagesConversationChatRoundMoney1  from "../asserts/icons/LinearMessagesConversationChatRoundMoney1/LinearMessagesConversationChatRoundMoney1";
import  LinearNotificationsBell  from "../asserts/icons/LinearNotificationsBell/LinearNotificationsBell";
import  LinearUsersUserRounded1  from "../asserts/icons/LinearUserUserRounded1/LinearUsersUserRounded1";
import "./Style.css";
import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GmarketSansBold';
    src: url('/fonts/GmarketSansTTFBold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'GmarketSansLight';
    src: url('/fonts/GmarketSansTTFLight.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('/fonts/GmarketSansTTFMedium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }
`;


function UserImageList () {
  const [selectedCategory, setSelectedCategory] = useState(null);
<<<<<<< HEAD
<<<<<<< HEAD
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

=======
=======
  

>>>>>>> feature
  // const [posts, setPosts] = useState([]);
  // const [hoveredDate, setHoveredDate] = useState(null);
  // const [selectedPostDate, setSelectedPostDate] = useState(null);
  // const [datesWithPosts, setDatesWithPosts] = useState([]);

  //이미지 클릭후 파일입력
  const handleImageClick = () => {
    document.getElementById('file-input').click();
  };
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // if (category === "사진") {
    //   fetchPosts();
    // }
  };

  //   const fetchPosts = async () => {
  //     try {
  //       const response = await fetch(`다이어리 api url`);
  //       const data = await response.json();
  //       setPosts(data.post || []);
  //       const uniqueDates = [...new Set(data.posts.map(post => new Date(post.date).toLocaleDateString()))];
  //       setDatesWithPosts(uniqueDates);
  //     } catch (err) {
  //       console.log( err )
  //     }
  //   };

  // const handleDateClick = (date) => {
  //   setSelectedPostDate(date); 
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  // 선택된 날짜의 게시물 이미지 가져오기
  // const selectedPostImages = posts
  //   .filter(post => new Date(post.date).toLocaleDateString() === selectedPostDate)
  //   .map(post => (
  //     <div className="image-frame" key={post.id}>
  //       <img src={post.imageUrl} alt={`Post on ${post.date}`} />
  //     </div>
  //   ));

  
>>>>>>> feature

  return (
    
  <div className="user-image-list">
    <div className="overlap">
    
        <div className="user-back-ground" />
        <div className="category">
          <div className="category-group">
            <img className="category-line" alt="category-Line" src="/img/line-25.svg" />
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
            <div className="name-container">
              <div className="possession-coin">
                <div className="user-info-box">구독중</div>
              </div>
              <div className="user-name">이원준님</div>
            </div>
            <div className="entire-coin-frame">
              <div className="possession-coin">
                <div className="user-info-box">보유코인</div>
              </div>
              <div className="user-coin">2000AC</div>
            </div>
          </div>
          <div className="profile-card">
            <div className="profile" />
            <img className="male-user" alt="Male user" src="/img/male-user.png" />
            <div className="ellipse-2" />
            <img className="camera-button" src='/img/camera.png' onClick={handleImageClick}/>
              <input type="file"
                id="file-input"
                accept="image/*" 
                style={{ display: 'none' }} 
            />
          </div>
        </div>
      </div>
      <div className="main">
        <div className="user-profile">
          <div className="calender">
<<<<<<< HEAD
            <div className="date">
              {/* /달력 api 사용할 것 그리고 거기에 해당 게시글 날짜 hover사용해서 이벤트*/} 
=======
            <div className="dates">
              {/* {datesWithPosts.map((date) => ( */}
              {/* <div
                  key={date}
                  className={`date-item ${hoveredDate === date ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredDate(date)}
                  onMouseLeave={() => setHoveredDate(null)}
                  onClick={() => handleDateClick(date)}
                >
                  {date}*/}
                {/* </div> */}
>>>>>>> feature
            </div>
          </div>
          {/* 아래 싹지우고 */}
          <img className="calender-line-top" alt="Line" src="/img/line-25.svg" />
          <img className="calender-line-bottom" alt="Line" src="/img/line-25.svg" />
          <div className="title">
<<<<<<< HEAD
            <div className="text-wrapper-42">{selectedCategory || "카테고리를 선택하세요"}</div>
          </div>
          <div className="overlap-3">
=======
            {/* 이거빼고 */}
            <div className="posts-image1">{selectedCategory || ""}</div>
          </div>  
          <div className="image-card">
            {/* {selectedCategory === "사진" && selectedPostDate && selectedPostImages} 이아래로 navbar전까지 다지움 */}
>>>>>>> feature
            {selectedCategory === "사진" && (
              <div className="image-frame">
                <div className="overlap-group-2">
                  <div className="text-wrapper-43">UserImg1</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <div className="navbar">
        <div className="container">
          <div className="text-wrapper-44" onClick={() => navigate("/saerch-food")}>맛집 찾기</div>
        </div>
        <div className="container-2">
          <div className="text-wrapper-45" onClick={() => navigate("/view-diary")}>일기 보기</div>
        </div>
        <div className="container-3">
            <div className="text-wrapper-46" onClick={() => navigate("/cate")}>카테고리별 일기 찾기</div>
          </div>
        <div className="form">
          <div className="overlap-group-3">
            <div className="input">
<<<<<<< HEAD
              <div className="container-3">
                <div className="text-wrapper-46" onClick={() => navigate("/search")}>검색어를 입력해 주세요.</div>
=======
              <div className="container-4">
                <div className="text-wrapper-47" onClick={() => navigate("/search")}>검색어를 입력해 주세요.</div>
>>>>>>> feature
              </div>
            </div>
            <img className="SVG" alt="Svg" src="/img/svg.svg" />
          </div>
        </div>
<<<<<<< HEAD
        <div className="text-wrapper-47" onClick={() => navigate("/login")}>로그인</div>
        <div className="text-wrapper-48" onClick={() => navigate("/payment-coin")}>코인결제</div>
        <div className="text-wrapper-49" onClick={() => navigate("/subscribe")}>구독신청</div>
        <div className="text-wrapper-50" onClick={() => navigate("/mypage")}>마이</div>
=======
        <div className="text-wrapper-48" onClick={() => navigate("/login")}>로그인</div>
        <div className="text-wrapper-49" onClick={() => navigate("/payment-coin")}>코인결제</div>
        <div className="text-wrapper-50" onClick={() => navigate("/subscribe")}>구독신청</div>
        <div className="text-wrapper-51" onClick={() => navigate("/username")}>마이</div>
>>>>>>> feature
        <div className="clip-path-group-wrapper">
          <div className="clip-path-group">
            <div className="group">
              <div className="overlap-group-4">
                <div className="element" />
                <div className="text-wrapper-52">AMADDA!</div>
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
=======
      
    <footer className="footer">
            <div className="footer-container">
                <div className="footerlist">
                    <div className="footer-text-4letters">
                        매체소개
                    </div>
                    <div className="footer-text-4letters">
                        고객센터
                    </div>
                    <div className="footer-text-5letters">
                        포인트정책
                    </div>
                    <div className="footer-text-8letters">
                        개인정보처리방침
                    </div>
                    <div className="footer-text-4letters">
                        이용약관
                    </div>
                    <div className="footer-text-9letters">
                        이메일무단수집금지
                    </div>
                    <div className="footer-text-7letters">
                        광고·제휴문의
                    </div>
                    <div className="footer-text-4letters">
                        윤리경영
                    </div>
                </div>
                <div className="footerimage">
                    <img className="img" alt="List" src="/img/list.svg" />
                </div>
            </div>
      </footer>
  </div>
>>>>>>> feature
  );
};

export default UserImageList;
