import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../../ui/LoginPage/KakakoCallback.css";
function KakaoCallback() {
    const navigate = useNavigate();


    useEffect(() => {
        try {
            // URL에서 쿼리 파라미터 추출
            const urlParams = new URLSearchParams(window.location.search);
            const jwt = urlParams.get("jwt");
            const accessToken = urlParams.get("accessToken");
            const refreshToken = urlParams.get("refreshToken");
            

            // 추출한 값 확인
            console.log("JWT:", jwt);
            console.log("AccessToken:", accessToken);
            console.log("RefreshToken:", refreshToken);

            // 값 저장 및 이동 처리
            if (jwt && accessToken && refreshToken) {
                localStorage.setItem("jwt", jwt);
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                console.log("로그인성공");
                Swal.fire({
                    icon: "success",
                    title: "로그인 성공!",
                    text: "로그인에 성공하였습니다."
                })
                navigate("/amadda");
            } else {
                throw new Error("필수 토큰이 누락되었습니다.");
            }
        } catch (error) {
            console.error("로그인 처리 오류:", error);
            alert("로그인에 실패했습니다.");
            navigate("/amadda/loginpage");
        }
    }, []);

    return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">로그인 처리 중...</div>
        </div>
    );
}

export default KakaoCallback;