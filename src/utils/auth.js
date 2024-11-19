import axios from "axios";
import Swal from 'sweetalert2';

//로그인 확인 함수
export function isLoggedIn() {
  const jwt = localStorage.getItem("jwt"); // 로컬 스토리지에서 jwt 가져오기
  const accessToken = localStorage.getItem("accessToken"); //로컬에서 accessToken 가져오기
  console.log("isLoggedIn - JWT:", jwt); // 디버깅용 출력
  console.log("isLoggedIn - AccessToken : ", accessToken); // 디버깅용 출력

  return (jwt !== null) || (accessToken !== null); // jwt or accessToken이 null이 아니면 true 반환
}

//로그아웃 함수
export async function logout() {
  
  if (localStorage.getItem("refreshToken") !== null) {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("refreshToken 확인 : ", refreshToken) ;
    await axios.post("http://localhost:7777/auth/logout", null, {
        headers: { Authorization: `Bearer ${refreshToken}` },
    });
  }

  //로컬스토리지 삭제
  localStorage.clear();
  Swal.fire("로그아웃 하였습니다.")
    .then(result => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) { 
      }
  window.location.href = "/amadda/loginPage"; // 로그인 페이지로 이동
});
}

//JWT 디코딩 예시코드(UserId 가져오기)

/*
npm install jsonwebtoken
npm install jwt-decode


import { jwtDecode } from "jwt-decode";

function getUserId(jwt) {
	try {
	  if (!jwt) {
		console.error("JWT없음");
		return ;
	  }

	  const cleanJwt = jwt.trim(); // 공백 제거
	  const decoded = jwtDecode(cleanJwt); // 디코딩
	  console.log("가져와서 디코딩한 json파일:", decoded);

	  const userId = decoded.userId; // userId 추출
	  console.log("userId:", userId);
	} catch (e) {
	  console.error("JWT오류", e.message, e.stack); 
	  return ;
	}
}
*/