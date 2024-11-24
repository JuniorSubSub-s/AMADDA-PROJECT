import { Box, Container, Divider } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import "../../../ui/MyPage/MainMyPage/MyPage.css";
// Header와 개별 컴포넌트 import
import BottomButtonSection from "../../../components/MyPage/MyPageMain/BottomButtonSection/BottomButtonSection";
import IntroSection from "../../../components/MyPage/MyPageMain/IntroSection/IntroSection";
import MenuSection from "../../../components/MyPage/MyPageMain/MenuSection/MenuSection";
import PaymentSection from "../../../components/MyPage/MyPageMain/PaymentSection/PaymentSection";
import PostSection from "../../../components/MyPage/MyPageMain/PostSection/PostSection";
import ProfileSection from "../../../components/MyPage/MyPageMain/ProfileSection/ProfileSection";
import MainHeader from "../../Header/MainHeader";

function MyPage() {
  const { userId } = useParams();
  const location = useLocation();

  // 각 섹션에 대한 Ref 생성
  const postSectionRef = useRef(null);

  useEffect(() => {
    // 페이지 이동 시 전달받은 scrollTo 값을 확인
    if (location.state?.scrollTo === "postSection") {
      postSectionRef.current?.scrollIntoView({
        behavior: "smooth", // 부드러운 스크롤
        block: "start", // 시작 위치로 스크롤
      });
    }
  }, [location]);

  return (
    <div>
      <MainHeader />
      <Container maxWidth="lg" className="mainPage-Container" sx={{ padding: { xs: 2, md: 4 } }}>
        <Box className="mainPage-profile-section" sx={{ marginBottom: 2 }}>
          {/* 프로필 섹션 */}
          <ProfileSection userId={userId} />

          <Divider sx={{ marginY: 2 }} />

          {/* 소개 섹션 */}
          <div ref={postSectionRef}>
            <IntroSection userId={userId} />
          </div>

          {/* 게시물 섹션 */}
          <PostSection userId={userId} />
          
          {/* 메뉴 섹션 */}
          <MenuSection userId={userId} />
        </Box>

        {/* 결제 내용 섹션 */}
        <PaymentSection userId={userId} />

        {/* 버튼 내용 섹션 */}
        <BottomButtonSection userId={userId} />
      </Container>
    </div>
  );
}

export default MyPage;
