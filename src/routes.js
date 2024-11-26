import React, {lazy} from 'react';

//privateRoute
import PrivateRoute from './utils/PrivateRoute';

// 자주 방문하는 페이지는 정적 로드
// 메인페이지
import MainPage from './Pages/MainPage/MainPage';
// 포스트 작성 페이지
import PostWritePage from './Pages/PostWritePage/PostWritePage';
// 일기 찾기
import DiaryViewPage from './Pages/DiaryViewPage/DiaryViewPage';
import PinMapPage from './Pages/PinMapPage/PinMapPage';
// 날씨 API 사용 페이지
import DiaryByAPIPage from './Pages/DiaryByAPIPage/DiaryByAPIPage';
import TestWeatherPage from './Pages/DiaryByAPIPage/TestWeatherPage';

// App.js
const BASE_PATH = process.env.REACT_APP_BASE_PATH || '';

console.log(BASE_PATH);


/////////////////////////////////////////////////////////////////////////////
// 동적 로딩 (Code Splitting)
// React.lazy를 사용하여 페이지를 동적으로 로드

// 뱃지 페이지
const BadgeListPage = lazy(() => import('./Pages/BadgeListiPage/BadgeListPage'));

// 마이페이지
const MyPage = lazy(() => import('./Pages/MyPage/MainMyPage/MyPage'));
const MyPinMapPage = lazy(() => import('./Pages/MyPage/MyPinMapPage/MyPinMapPage'));
const MyCalendar = lazy(() => import('./Pages/MyPage/UserCalender/MyCalendar'));
const UserImageListPage = lazy(() => import('./Pages/MyPage/UserImgListPage/UserImageListPage'));
const UserInfoMyPage = lazy(() => import('./Pages/MyPage/UserInfoMyPage/UserInfoMyPage'));

// 여행 페이지 (이벤트성 페이지)
const CampingPage = lazy(() => import('./Pages/TravelViewPage/Camping.jsx'));
const DatePage = lazy(() => import('./Pages/TravelViewPage/DatePage.jsx'));
const FallPage = lazy(() => import('./Pages/TravelViewPage/Fall.jsx'));
const JejuPage = lazy(() => import('./Pages/TravelViewPage/Jeju.jsx'));
const NetflixPage = lazy(() => import('./Pages/TravelViewPage/Netflix.jsx'));
const SaveMoenyPage = lazy(() => import('./Pages/TravelViewPage/SaveMoneyPage.jsx'));

// 로그인, 회원가입, 구독
const SignUpPage = lazy(() => import('./Pages/JoinPage/SignUpPage'));
const KakaoCallback = lazy(() => import('./Pages/LoginPage/KakaoCallback'));
const LoginPage = lazy(() => import('./Pages/LoginPage/LoginPage'));
const SubscribePage = lazy(() => import('./Pages/SubscribePage/SubscribePage'));


const routes = [
  { path: `${BASE_PATH}`, element: <MainPage /> },
  { path: `${BASE_PATH}/badgeList`, element: <BadgeListPage /> },

  { path: `${BASE_PATH}/postWrite`, element: <PrivateRoute><PostWritePage /></PrivateRoute> },

  { path: `${BASE_PATH}/loginPage`, element: <LoginPage /> },
  { path: `${BASE_PATH}/signUpPage`, element: <SignUpPage /> },
  { path: "/auth/kakao/callback", element: <KakaoCallback /> },

  { path: `${BASE_PATH}/myPage/:userId`, element: <PrivateRoute><MyPage /></PrivateRoute> },
  { path: `${BASE_PATH}/myPage/user-info/:userId`, element: <UserInfoMyPage /> },
  { path: `${BASE_PATH}/myPage/user-pinMap/:userId`, element: <MyPinMapPage /> },
  { path: `${BASE_PATH}/myPage/myCalendar/:userId`, element: <MyCalendar /> },

  { path: `${BASE_PATH}/myPage/user-imgList`, element: <UserImageListPage /> },
  { path: `${BASE_PATH}/myPage/subscribe`, element: <SubscribePage /> },

  { path: `${BASE_PATH}/bestRes`, element: <DiaryByAPIPage /> },
  { path: `${BASE_PATH}/bestRes/date`, element: <DatePage /> },
  { path: `${BASE_PATH}/bestRes/netflix`, element: <NetflixPage /> },
  { path: `${BASE_PATH}/bestRes/jeju`, element: <JejuPage /> },
  { path: `${BASE_PATH}/bestRes/camping`, element: <CampingPage /> },
  { path: `${BASE_PATH}/bestRes/saveMoney`, element: <SaveMoenyPage /> },
  { path: `${BASE_PATH}/bestRes/fall`, element: <FallPage /> },
  
  { path: `${BASE_PATH}/diary-view`, element: <DiaryViewPage /> },
  { path: `${BASE_PATH}/diary-view/map`, element: <PinMapPage /> },
  { path: "/weather", element: <TestWeatherPage /> },
];

export default routes;