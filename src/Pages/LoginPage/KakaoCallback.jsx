import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function KakaoCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        // URL에서 JWT, Access Token, Refresh Token 추출
        const urlParams = new URLSearchParams(window.location.search);
        const jwt = urlParams.get("jwt");
        const accessToken = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken");

        if (jwt && accessToken && refreshToken) {
            console.log("jwt :", jwt)
            console.log("accessToken :", accessToken)
            console.log("refreshToken :", refreshToken)
            localStorage.setItem("jwt", jwt);
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            alert("로그인 성공!");
            navigate("/amadda"); // 메인 페이지로 이동
        } else {
            alert("로그인 처리에 실패했습니다.");
            navigate("/amadda/loginpage"); // 로그인 페이지로 이동
          }
    }, []);

    // const handleKakaoCallback = async (code) => {
    //     try {
    //       const response = await axios.get(`http://localhost:7777/auth/kakao/callback?code=${code}`);
    //       console.log("백엔드 응답 데이터:", response.data);
    //       const { jwt, accessToken, refreshToken } = response.data;
    
    //       // 토큰 저장
    //       localStorage.setItem("jwt", jwt);
    //       localStorage.setItem("accessToken", accessToken);
    //       localStorage.setItem("refreshToken", refreshToken);
    
    //       alert("로그인 성공!");
    //       navigate("/main"); // 메인 페이지로 이동
    //     } catch (error) {
    //       console.error("카카오 로그인 처리 중 오류:", error);
    //       alert("로그인 처리에 실패했습니다.");
    //       navigate("/login"); // 로그인 페이지로 이동
    //     }
    //   };

    return <div>카카오 로그인 처리 중...</div>;
}

export default KakaoCallback;