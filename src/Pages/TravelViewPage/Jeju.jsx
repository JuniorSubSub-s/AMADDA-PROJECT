import React from "react";
import { LinearMessagesConversationCheckRead } from "../../assets/icons/LinearMessagesConversationCheckRead";
import { Container } from '@mui/material';
import Header from "../Header/MainHeader";
import Footer from "../Foorter/Footer";
import "../../ui/TravelViewPage/style4.css";

const UserPostItem = ({ imageSrc, postTitle, hashTag, isReceiptVerified }) => {
  return (

    <div className="item">                {/* User 포스트 부분 */}
      <div className="user-background">   {/* Post 유저 이미지 부분 */}
        <div className="text-wrapper-6">User Post</div>
      </div>
      <img className="image" alt="Post" src={imageSrc} />  {/* user post 이미지 */}

      <div className="emphasis-2">{postTitle}</div>
      {isReceiptVerified && (
        <LinearMessagesConversationCheckRead className="linear-messages-conversation-check-read" />)}   {/* check표시 */}

      <div className="text-wrapper-7">{hashTag}</div>

      <div className="badge">Badge Frame</div>

      <div className="text-wrapper-8">Pin Color</div>

      <div className="text-wrapper-9"
        style={{ color: isReceiptVerified ? "#00B058" : "black", }}>
        {isReceiptVerified ? "영수증 인증 게시글" : "영수증 미인증 게시글"}
      </div>
    </div>    // item
  );
};

export const Jeju = () => {
  const posts = [
    {
      imageSrc: "/img/TravelViewPageImg/image.svg",
      postTitle: "게시물 제목 1",
      hashTag: "[영주] 해시 태그 1",
      isReceiptVerified: true,
    },
    {
      imageSrc: "/img/TravelViewPageImg/image-1.svg",
      postTitle: "게시물 제목 2",
      hashTag: "[경주] 해시 태그 2",
      isReceiptVerified: true,
    },
    {
      imageSrc: "/img/TravelViewPageImg/image-2.svg",
      postTitle: "게시물 제목 3",
      hashTag: "[남이섬] 해시 태그 3",
      isReceiptVerified: false,
    },
    {
      imageSrc: "/img/TravelViewPageImg/image-3.svg",
      postTitle: "게시물 제목 4",
      hashTag: "[영주] 해시 태그 4",
      isReceiptVerified: false,
    },
    {
      imageSrc: "/img/TravelViewPageImg/image-4.svg",
      postTitle: "게시물 제목 5",
      hashTag: "[춘천] 해시 태그 5",
      isReceiptVerified: true,
    },
    {
      imageSrc: "/img/TravelViewPageImg/image-5.svg",
      postTitle: "게시물 제목 6",
      hashTag: "[춘천] 해시 태그 6",
      isReceiptVerified: true,
    },
    {
      imageSrc: "/img/TravelViewPageImg/image-6.svg",
      postTitle: "게시물 제목 7",
      hashTag: "[강릉] 해시 태그 7",
      isReceiptVerified: false,
    },
    {
      imageSrc: "/img/TravelViewPageImg/image-7.svg",
      postTitle: "게시물 제목 8",
      hashTag: "[경주] 해시 태그 8",
      isReceiptVerified: false,
    },
    {
      imageSrc: "/img/TravelViewPageImg/image-8.svg",
      postTitle: "게시물 제목 9",
      hashTag: "[남이섬] 해시 태그 9",
      isReceiptVerified: true,
    },
    {
      imageSrc: "/img/TravelViewPageImg/image-9.svg",
      postTitle: "게시물 제목 10",
      hashTag: "[강릉] 해시 태그 10",
      isReceiptVerified: false,
    },
    {
      imageSrc: "/img/TravelViewPageImg/image-10.svg",
      postTitle: "게시물 제목 11",
      hashTag: "[영주] 해시 태그 11",
      isReceiptVerified: false,
    },
    {
      imageSrc: "/img/TravelViewPageImg/image-11.svg",
      postTitle: "게시물 제목 12",
      hashTag: "[영주] 해시 태그 12",
      isReceiptVerified: false,
    },
  ];

  return (
    <div>
      <Header />
      <div className="travel-view-page">

        <Container className="main">
          <div className="main-background">    {/* 배경색 변경 */}

            <div className="main-photo"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/img/TravelViewPageImg/jeju.png)`,
              }} />

            <div className="main-textcontent">
              <div className="emphasis">제주가 온다</div>
              <div className="p">제주 대표 맛집 다 모여라</div>
            </div>
          </div>

          <div className="heading-wrapper"> {/*맛집일기 헤더 */}

            <div className="text-wrapper-12">맛집 일기</div>
          </div>

          <div className="list-2">    {/* user post에 입력받는 값 */}
            {posts.map((post, index) => (
              <UserPostItem
                key={index}
                imageSrc={post.imageSrc}
                postTitle={post.postTitle}
                hashTag={post.hashTag}
                isReceiptVerified={post.isReceiptVerified} />))}
          </div> {/* list-2 */}

          <div className="button-2">
            <div className="text-wrapper-10"> 되돌리기 </div>
          </div>

          <div className="button-3">
            <div className="text-wrapper-11"> 더보기 </div>
          </div>


        </Container> {/*main */}

      </div>
      <Footer />
    </div>
  );
};

export default Jeju;
