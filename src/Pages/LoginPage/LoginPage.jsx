import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from "react";

import Footer from '../Foorter/Footer';
import MainHeader from "../Header/MainHeader";

import "../../ui/LoginPage/LoginPage.css";

function LoginPage() {

  const navigate = useNavigate();

  return (
    <div className='LoginPage'>
      <MainHeader />
      <Grid container sx={{ minHeight: "80vh", width: "100%" }}>
        {/*좌측 그리드*/}
        <Grid item xs={12} sm={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: 1,
          }}>
        </Grid>

        {/*중앙 메인 그리드*/}
        <Grid item xs={12} sm={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: 1,
          }}>

          {/*전체 박스 */}
          <div className="login-container">
            {/*로그인*/}
            <div className="login-font">로그인</div>

            {/*로그인 비밀번호 박스 */}
            <div className="id-password-container">
              {/* 로그인 폼 */}
              <input type="text" className="text-form" placeholder="로그인" />
              {/* 비밀번호 폼 */}
              <input type="password" className="text-form" placeholder="비밀번호" />
            </div>

            {/*아이디 저장, 비밀번호 찾기 컨테이너 */}
            <div className='sign-in-feature'>
              {/*아이디 저장 */}
              <div className="save-id">
                <input type="checkbox" />
                <div className="save-id-font">아이디 저장</div>
              </div>
              {/*비밀번호 찾기 */}
              <div className="find-password">
                <div className="find-password-font">아이디 / 비밀번호 찾기</div>
              </div>
            </div>

            {/*로그인 버튼 */}
            <button
              className="login-button"
              type="button">
              로그인
            </button>

            {/*~로 로그인 하기 컨테이너 */}
            <div className="login-with-container">
              <button
                className="naver-button"
                type="button">
                네이버로 로그인하기
              </button>

              <button
                className="kakao-button"
                type="button">
                카카오로 로그인하기
              </button>
            </div>

            {/*회원가입*/}
            <button
              className="sign-up"
              type="button"
              onClick={() => navigate("/amadda/signUpPage")}>
              회원가입
            </button>
          </div>

        </Grid>

        {/*우측 그리드*/}
        <Grid item xs={12} sm={3} sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          padding: 1,
        }}>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default LoginPage;