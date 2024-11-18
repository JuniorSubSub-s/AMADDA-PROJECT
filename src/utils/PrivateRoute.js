import React from "react";
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { isLoggedIn } from "../utils/auth";
// PrivateRoute 컴포넌트
function PrivateRoute({ children }) { //children이 안에 있는 컴포넌트
  const loggedIn = isLoggedIn(); // 로그인 상태 확인
  console.log("로그인 상태:", isLoggedIn());

  if (!loggedIn) {
    Swal.fire({
      icon: "warning",
      title: "로그인 필요",
      text: "로그인이 필요한 서비스입니다.",
    }); // 로그인되지 않은 사용자에게 경고
    return <Navigate to="/amadda/loginPage" replace />; // 로그인 페이지로 리다이렉트
  }

  return children ;
}


export default PrivateRoute;