import { Box, Container, Divider } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [forceUpdate, setForceUpdate] = useState(false);

  // 각 섹션에 대한 Ref 생성
  const postSectionRef = useRef(null);

  // 스크롤 처리 로직을 별도로 분리
  const scrollToSection = useCallback(() => {
    if (location.state?.scrollTo === "postSection") {
      postSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location]);

  useEffect(() => {
    scrollToSection();
  }, [scrollToSection]);

  const sections = [
    { component: <ProfileSection userId={userId} />, divider: true },
    { component: <IntroSection userId={userId} forceUpdate={forceUpdate} />, ref: postSectionRef },
    { component: <PostSection userId={userId} /> },
    { component: <MenuSection userId={userId} /> },
    { component: <PaymentSection userId={userId} /> },
    { component: <BottomButtonSection userId={userId} /> },
  ];

  return (
    <div>
      <MainHeader />
      <Container
        maxWidth="lg"
        sx={{ padding: { xs: 2, md: 4 }, className: "mainPage-Container" }}
      >
        {sections.map((section, index) => (
          <Box
            key={index}
            sx={{ marginBottom: 2, ...(section.ref && { ref: section.ref }) }}
          >
            {section.component}
            {section.divider && <Divider sx={{ marginY: 2 }} />}
          </Box>
        ))}
      </Container>
    </div>
  );
}

export default MyPage;