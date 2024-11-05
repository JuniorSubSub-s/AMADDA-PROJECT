import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from './Pages/MainPage/MainPage';

import PostWritePage from './Pages/PostWritePage/PostWritePage';

import MyPageMain from './Pages/MyPage/MainMyPage/MyPageMain';
import UserInfoMyPage from './Pages/MyPage/UserInfoMyPage/ProfileEdit';
import UserImageListPage from './Pages/MyPage/UserImgListPage/UserImageListPage';

import FindDiaryByCate from './Pages/FindDiaryByCate/FindDiaryByCate';

import DatePage from './Pages/TravelViewPage/DatePage';
import Jeju from './Pages/TravelViewPage/Jeju';
import Netflix from './Pages/TravelViewPage/Netflix';
import Camping from './Pages/TravelViewPage/Camping';

import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/JoinPage/SignUpPage';
import SubscribePage from './Pages/SubscribePage/SubscribePage';

import DiaryViewPage from './Pages/DiaryViewPage/DiaryViewPage';
import PinMapPage from './Pages/PinMapPage/PinMapPage';

import { ElementLight } from './Pages/FindByCate/ElementLight';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/amadda" element={<MainPage />}></Route>
        <Route path="/amadda/postWrite" element={<PostWritePage />}></Route>
        
        <Route path="/l2" element={<Jeju />}></Route>
        <Route path="/l4" element={<Camping />}></Route>

        <Route path="/amadda/loginPage" element={<LoginPage />}></Route>
        <Route path="/amadda/signUpPage" element={<SignUpPage />}></Route>

        <Route path="/amadda/myPage" element={<MyPageMain />}></Route>
        <Route path="/amadda/myPage/user-info" element={<UserInfoMyPage />}></Route>
        <Route path="/amadda/myPage/user-imgList" element={<UserImageListPage />}></Route>
        <Route path="/amadda/myPage/subscribe" element={<SubscribePage />}></Route>

        <Route path="/amadda/bestRes" element={<ElementLight />}></Route>
        <Route path="/amadda/bestRes/date" element={<DatePage />}></Route>
        <Route path="/amadda/bestRes/netflix" element={<Netflix />}></Route>

        <Route path="/amadda/diary-view" element={<DiaryViewPage />}></Route>
        <Route path="/amadda/diary-view/map" element={<PinMapPage />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
