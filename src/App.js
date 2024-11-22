import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BadgeListPage from './Pages/BadgeListiPage/BadgeListPage';
import MainPage from './Pages/MainPage/MainPage';
// 헤더에서 동작

import MyPage from './Pages/MyPage/MainMyPage/MyPage';
import MyPinMapPage from './Pages/MyPage/MyPinMapPage/MyPinMapPage';
import MyCalendar from './Pages/MyPage/UserCalender/MyCalendar';
import UserImageListPage from './Pages/MyPage/UserImgListPage/UserImageListPage';
import UserInfoMyPage from './Pages/MyPage/UserInfoMyPage/UserInfoMyPage';
import PostWritePage from './Pages/PostWritePage/PostWritePage';


// 이벤트성 페이지

import CampingPage from './Pages/TravelViewPage/Camping';
import DatePage from './Pages/TravelViewPage/DatePage';
import FallPage from './Pages/TravelViewPage/Fall';
import JejuPage from './Pages/TravelViewPage/Jeju';
import NetflixPage from './Pages/TravelViewPage/Netflix';
import SaveMoenyPage from './Pages/TravelViewPage/SaveMoneyPage';

// 로그인, 회원가입, 구독
import SignUpPage from './Pages/JoinPage/SignUpPage';
import KakaoCallback from './Pages/LoginPage/KakaoCallback';
import LoginPage from './Pages/LoginPage/LoginPage';
import SubscribePage from './Pages/SubscribePage/SubscribePage';


// 일기 찾기
import DiaryViewPage from './Pages/DiaryViewPage/DiaryViewPage';
import PinMapPage from './Pages/PinMapPage/PinMapPage';

// 날씨 API 사용 페이지
import DiaryByAPIPage from './Pages/DiaryByAPIPage/DiaryByAPIPage';
import TestWeatherPage from './Pages/DiaryByAPIPage/TestWeatherPage';

//privateRoute
import PrivateRoute from './utils/PrivateRoute';



function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/amadda" element={<MainPage />}></Route>
        <Route path="/amadda/badgeList" element={<BadgeListPage />}></Route>
        <Route path="/amadda/postWrite" element={<PrivateRoute><PostWritePage/></PrivateRoute>}></Route>
        
        {/* <Route path="/l2" element={<Jeju />}></Route>
        <Route path="/l4" element={<Camping />}></Route> */}

        <Route path="/amadda/loginPage" element={<LoginPage />}></Route>
        <Route path="/amadda/signUpPage" element={<SignUpPage />}></Route>
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />

        <Route path="/amadda/myPage/:userId" element={<PrivateRoute><MyPage /></PrivateRoute>}></Route>
        <Route path="/amadda/myPage/user-info/:userId" element={<UserInfoMyPage />}></Route>
        <Route path="/amadda/myPage/user-pinMap/:userId" element={<MyPinMapPage />}></Route>
        <Route path="/amadda/myPage/myCalendar/:userId" element={<MyCalendar />}></Route>

        <Route path="/amadda/myPage/user-imgList" element={<UserImageListPage />}></Route>
        <Route path="/amadda/myPage/subscribe" element={<SubscribePage />}></Route>
        

        <Route path="/amadda/bestRes" element={<DiaryByAPIPage />}></Route>
        <Route path="/amadda/bestRes/date" element={<DatePage />}></Route>
        <Route path="/amadda/bestRes/netflix" element={<NetflixPage />}></Route>
        <Route path="/amadda/bestRes/jeju" element={<JejuPage />}></Route>
        <Route path="/amadda/bestRes/camping" element={<CampingPage />}></Route>
        <Route path="/amadda/bestRes/saveMoney" element={<SaveMoenyPage />}></Route>
        <Route path="/amadda/bestRes/fall" element={<FallPage />}></Route>

        {/* 일기보기 */}
        <Route path="/amadda/diary-view" element={<DiaryViewPage />}></Route>
        <Route path="/amadda/diary-view/map" element={<PinMapPage />}></Route>
        <Route path="/weather" element={<TestWeatherPage />}></Route>

        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
