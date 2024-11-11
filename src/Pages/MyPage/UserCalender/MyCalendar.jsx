import React, { useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import MainHeader from "../../Header/MainHeader";
import "../../../ui/MyPage/UserCalender/MyCalendar.css";

import PageContent from "../../../components/MyPage/UserCalendar/PageContent";
import PageContent2 from "../../../components/MyPage/UserCalendar/PageContent2";
import PageContent3 from "../../../components/MyPage/UserCalendar/PageContent3";

const MyCalendar = () => {

  const [currentPage, setCurrentPage] = useState(1);

  const handleCalendarWriteRuleClick = () => {
    setCurrentPage(1);
  }

  const handleCalendarWriteClick = () => {
    setCurrentPage(2);
  }

  const handleFindRestClick = () => {
    setCurrentPage(3);
  }

  return (
    <div>
      <MainHeader />

      {/* 타이틀 섹션 */}
      <Grid item xs={12}>
        <Typography variant="h4" align="center" className="calendar-title">
          나의 맛캘린더
        </Typography>
      </Grid>

      {/* 버튼 섹션 */}
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Button variant="contained"
            className="calendar-btn"
            onClick={handleCalendarWriteRuleClick}>
            캘린더 작성법
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained"
            className="calendar-btn"
            onClick={handleCalendarWriteClick}>
            내 캘린더 작성
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained"
            className="calendar-btn"
            onClick={handleFindRestClick}>
            내가 찾던 맛집
          </Button>
        </Grid>
      </Grid>

      {/* 소개 섹션 */}
      <Grid container direction="column" className="calendar-introduce">
        <Grid item>
          <div className="calendar-image" />
        </Grid>
        <Grid item>
          <Typography variant="body1" className="calendar-text1">
            시간이 흘러 내가 찾던 맛집이 기억에서 희미해질까 두렵나요?
          </Typography>
          <Typography variant="body1" className="calendar-text2">
            아맛따에서 제공하는 캘린더를 사용해 나만의 맛집을 기억하세요!
          </Typography>
        </Grid>
      </Grid>

      {/* PageContent, PageContent2 또는 PageContent3 렌더링 */}
      {currentPage === 1 && <PageContent />}
      {currentPage === 2 && <PageContent2 />}
      {currentPage === 3 && <PageContent3 />}

    </div>
  );
}

export default MyCalendar;
