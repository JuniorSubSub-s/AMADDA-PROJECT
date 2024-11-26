import { Grid } from '@mui/material';
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../../ui/LoginPage/LoginPage.css";
import Footer from '../Foorter/Footer';
import MainHeader from "../Header/MainHeader";

function LoginPage() {

  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://amadda.kr:7777/auth/login", {
        userEmail,
        userPwd,
      });
      console.log("로그인 성공:", response.data);

      // JWT 저장
      const { jwt, message } = response.data;
      localStorage.setItem("jwt", jwt);

      Swal.fire({
        icon: "success",
        title: "로그인 성공!",
        text: message,
      });
      
      navigate("/amadda"); // 메인 페이지로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      Swal.fire({
        icon: "error",
        title: "로그인 실패",
        text: "아이디와 비밀번호를 확인하세요",
      });
    }
  };

  const handleKakaoLogin = async () => {
    try {
      // 카카오 로그인 URL 요청
      const response = await axios.post("https://amadda.kr:7777/auth/kakao/login");
      const kakaoLoginUrl = response.data.kakaoLoginUrl;
      console.log("KakaoLoginUrl : ", kakaoLoginUrl);

      // 카카오 로그인 페이지로 리다이렉트
      window.location.href = kakaoLoginUrl;
    } catch (error) {
      console.error("Error fetching Kakao login URL:", error);
      Swal.fire({
        icon: "warning",
        title: "이런!",
        text: "로그인 요청 중 문제가 발생하였습니다.",
      });

    }
};


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
              <input type="text" 
              className="text-form" 
              placeholder="이메일" 
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}/>
              {/* 비밀번호 폼 */}
              <input  type="password" 
                      className="text-form" 
                      placeholder="비밀번호" 
                      value={userPwd}
                      onChange={(e) => setUserPwd(e.target.value)}/>
            </div>

            {/*아이디 저장, 비밀번호 찾기 컨테이너 */}
            <div className='sign-in-feature'>
              {/*아이디 저장 */}
              <div className="save-id">
                <input type="checkbox" />
                <div className="save-id-font">이메일 저장</div>
              </div>
              {/*비밀번호 찾기 */}
              <div className="find-password">
                <div className="find-password-font">이메일 / 비밀번호 찾기</div>
              </div>
            </div>

            {/*로그인 버튼 */}
            <button
              className="login-button"
              type="button"
              onClick={handleLogin}>
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
                type="button"
                onClick={handleKakaoLogin}>
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