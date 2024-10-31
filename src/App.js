import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from './Pages/MainPage/MainPage';

import PostWritePage from './Pages/PostWritePage/PostWritePage';

import MyPageMain from './Pages/MyPage/MainMyPage/MyPageMain';
import UserInfoMyPage from './Pages/MyPage/UserInfoMyPage/ProfileEdit';
import UserImageListPage from './Pages/MyPage/UserImgListPage/UserImageListPage';

import FindBestResPage from './Pages/FindBestRes/FindBestResPage';
import FindDiaryByCate from './Pages/FindDiaryByCate/FindDiaryByCate';

import DatePage from './Pages/TravelViewPage/DatePage';
import Jeju from './Pages/TravelViewPage/Jeju';
import Netflix from './Pages/TravelViewPage/Netflix';
import Camping from './Pages/TravelViewPage/Camping';

import LoginPage from './Pages/LoginPage/LoginPage';

import DiaryViewPage from './Pages/DiaryViewPage/DiaryViewPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/amadda" element={<MainPage />}></Route>
        <Route path="/amadda/postWrite" element={<PostWritePage />}></Route>
        
        <Route path="/l2" element={<Jeju />}></Route>
        <Route path="/l4" element={<Camping />}></Route>

        <Route path="/amadda/loginPage" element={<LoginPage />}></Route>

        <Route path="/myPage" element={<MyPageMain />}></Route>
        <Route path="/myPage/user-info" element={<UserInfoMyPage />}></Route>
        <Route path="/myPage/user-imgList" element={<UserImageListPage />}></Route>

        <Route path="/amadda/findRes" element={<FindBestResPage />}></Route>
        <Route path="/amadda/bestRes" element={<FindDiaryByCate />}></Route>
        <Route path="/amadda/bestRes/date" element={<DatePage />}></Route>
        <Route path="/amadda/bestRes/netflix" element={<Netflix />}></Route>

        <Route path="/amadda/diary-view" element={<DiaryViewPage />}></Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
