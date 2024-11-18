import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:7777/",
});

//자동으로 jwt를 헤더에 포함
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt"); // JWT 저장 위치
    if (token) {
        config.headers.Authorization = `Bearer ${token}` ;
    }

    return config ;
});

// 응답 인터셉터: 토큰 만료 시 자동으로 재생성
api.interceptors.response.use(
    (response) => response, // 성공 응답은 그대로 반환
    async (error) => {
        const originalRequest = error.config;

        // 401 Unauthorized 오류 처리
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 무한 루프 방지

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    throw new Error("Refresh Token이 없습니다.");
                }

                // /refresh 엔드포인트로 Refresh Token 전송후 새로운 accessToken 발급
                const { data } = await axios.post(
                    "http://localhost:7777/auth/kakao/refresh",
                    null,
                    {
                        params: { refreshToken }, // Refresh Token 전달
                    }
                );

                // 새 Access Token 저장
                localStorage.setItem("accessToken", data.accessToken);

                // 실패했던 요청에 새 토큰으로 재시도
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error("토큰 갱신 실패:", refreshError);

                // 토큰 갱신 실패 시 로컬 스토리지 초기화 및 로그인 페이지로 리다이렉트
                localStorage.clear();
                window.location.href = "/amadda/loginPage";
            }
        }

        return Promise.reject(error); // 그 외 에러는 그대로 반환
    }
);

export default api ;