import { jwtDecode } from 'jwt-decode'; // JWT 디코딩 라이브러리 임포트

function getUserName() {
    try {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        console.error("JWT없음");
        return ;
      }
      
      const cleanJwt = jwt.trim(); // 공백 제거
      const decoded = jwtDecode(cleanJwt); // 디코드
      console.log("가져와서 디코딩한 json파일:", decoded);

      const userName = decoded.userName; // userName 추출
      console.log("userName:", userName);
      return userName ;
    } catch (e) {
      console.error("JWT오류", e.message, e.stack); // 구체적인 오류 로그
      return ;
    }
  }

export default getUserName;
