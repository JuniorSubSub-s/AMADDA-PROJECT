import React, { useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import MainPage from './Pages/MainPage/MainPage';
import BadgeListPage from './Pages/BadgeListiPage/BadgeListPage';

// 마이페이지
import MyPage from './Pages/MyPage/MainMyPage/MyPage';
import UserInfoMyPage from './Pages/MyPage/UserInfoMyPage/UserInfoMyPage';
import UserImageListPage from './Pages/MyPage/UserImgListPage/UserImageListPage';
import MyPinMapPage from './Pages/MyPage/MyPinMapPage/MyPinMapPage';
import  MyCalendar  from './Pages/MyPage/UserCalender/MyCalendar';

// 게시글 작성 페이지
import PostWritePage from './Pages/PostWritePage/PostWritePage';


// 이벤트성 페이지
import DatePage from './Pages/TravelViewPage/DatePage';
import Jeju from './Pages/TravelViewPage/Jeju';
import Netflix from './Pages/TravelViewPage/Netflix';
import Camping from './Pages/TravelViewPage/Camping';

// 로그인, 회원가입, 구독
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/JoinPage/SignUpPage';
import SubscribePage from './Pages/SubscribePage/SubscribePage';


// 일기 찾기
import DiaryViewPage from './Pages/DiaryViewPage/DiaryViewPage';
import PinMapPage from './Pages/PinMapPage/PinMapPage';

// 날씨 API 사용 페이지
import DiaryByAPIPage from './Pages/DiaryByAPIPage/DiaryByAPIPage';
import Calendar from './Pages/CalendarPage/Calendar';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/amadda" element={<MainPage />}></Route>
        <Route path="/amadda/badgeList" element={<BadgeListPage />}></Route>
        
        {/* 일기작성 */}
        <Route path="/amadda/postWrite" element={<PostWritePage />}></Route>
        
        <Route path="/l2" element={<Jeju />}></Route>
        <Route path="/l4" element={<Camping />}></Route>

        <Route path="/amadda/loginPage" element={<LoginPage />}></Route>
        <Route path="/amadda/signUpPage" element={<SignUpPage />}></Route>

        <Route path="/amadda/myPage" element={<MyPage />}></Route>
        <Route path="/amadda/myPage/user-info" element={<UserInfoMyPage />}></Route>
        <Route path="/amadda/myPage/user-pinMap" element={<MyPinMapPage />}></Route>
        <Route path="/amadda/myPage/myCalendar" element={<MyCalendar />}></Route>

        <Route path="/amadda/myPage/user-imgList" element={<UserImageListPage />}></Route>
        <Route path="/amadda/myPage/subscribe" element={<SubscribePage />}></Route>
        

        <Route path="/amadda/bestRes" element={<DiaryByAPIPage />}></Route>
        <Route path="/amadda/bestRes/date" element={<DatePage />}></Route>
        <Route path="/amadda/bestRes/netflix" element={<Netflix />}></Route>

        {/* 일기보기 */}
        <Route path="/amadda/diary-view" element={<DiaryViewPage />}></Route>
        <Route path="/amadda/diary-view/map" element={<PinMapPage />}></Route>
        <Route path="/amadda/cal" element={<Calendar />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
