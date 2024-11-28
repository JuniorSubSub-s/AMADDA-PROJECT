import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";

import "../../../ui/MyPage/UserCalender/MyCalendar.css";

import MainHeader from "../../Header/MainHeader";
import PageContent from "../../../components/MyPage/UserCalendar/PageContent";
import Calendar from "../../CalendarPage/Calendar";
import PageContent3 from "../../../components/MyPage/UserCalendar/PageContent3";


const MyCalendar = () => {
  const { userId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => { setCurrentPage(page) };

  const renderPageContent = useMemo(() => {
    switch (currentPage) {
      case 1:
        return <PageContent />;
      case 2:
        return <Calendar userId={userId} />;
      case 3:
        return <PageContent3 />;
    }
  }, [currentPage, userId]);

  return (
    <div>
      <MainHeader />

      {/* 타이틀 섹션 */}
      <Typography align="center" className="calendar-title">
        나의 맛캘린더
      </Typography>

      {/* 버튼 섹션 */}
      <Grid container justifyContent="center" spacing={2}>
        {["캘린더 작성법", "내 캘린더 작성", "내가 찾던 맛집"].map((label, index) => (
          <Grid item key={index}>
            <Button
              variant="contained"
              className="calendar-btn"
              onClick={() => handlePageChange(index + 1)}
            >
              {label}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* 소개 섹션 */}
      <Grid container direction="column" alignItems="center" className="calendar-introduce">
        <div className="calendar-image" />
        <Typography variant="body1" className="calendar-text1">
          시간이 흘러 내가 찾던 맛집이 기억에서 희미해질까 두렵나요?
        </Typography>
        <Typography variant="body1" className="calendar-text2">
          아맛따에서 제공하는 캘린더를 사용해 나만의 맛집을 기억하세요!
        </Typography>
      </Grid>

      {/* 동적 페이지 렌더링 */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>{renderPageContent}</div>
    </div>
  );
}

export default MyCalendar;
