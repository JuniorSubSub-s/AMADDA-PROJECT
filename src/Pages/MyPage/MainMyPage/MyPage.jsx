import { Box, Container, Divider } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
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

  return (
    <div>
      <MainHeader />
      <Container maxWidth="lg" className="mainPage-Container" sx={{ padding: { xs: 2, md: 4 } }}>
        <Box className="mainPage-profile-section" sx={{ marginBottom: 2 }}>
          {/* 프로필 섹션 */}
          <ProfileSection userId={userId} />

          <Divider sx={{ marginY: 2 }} />

          {/* 소개 섹션 */}
          <IntroSection userId={userId} />

          {/* 게시물 섹션 */}
          <PostSection userId={userId} />

          {/* 메뉴 섹션 */}
          <MenuSection userId={userId} />
        </Box>

        {/* 결제 내용 섹션 */}
        <PaymentSection />

        {/* 버튼 내용 섹션 */}
        <BottomButtonSection />
      </Container>
    </div>
  );
}

export default MyPage;
