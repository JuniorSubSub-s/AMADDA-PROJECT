import React from "react";
import Swal from 'sweetalert2';

import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

let isAlertShown = false;

function showLoginAlert() {
  if(!isAlertShown) {
    Swal.fire({
      icon: "warning",
      title: "로그인 필요",
    });
    isAlertShown = true;
  }
}

// React.memo를 사용하여 최적화
// PrivateRoute가 부모 컴포넌트로부터 동일한 props를 받을 경우
// 불필요하게 렌더링되지 않도록 React.memo를 사용
const PrivateRoute = React.memo( ({children}) => {
  const loggedIn = isLoggedIn();

  if(loggedIn) {
    isAlertShown = false;
    return children;
  }
  showLoginAlert();
  return <Navigate to="/amadda/loginPage" replace />;
});

export default PrivateRoute;