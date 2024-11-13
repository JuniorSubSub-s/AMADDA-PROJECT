import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPageRedirect = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      // 로그인되지 않으면 로그인 페이지로 리디렉션
      navigate('/amadda/loginPage');
    } else {
      setLoading(false);  // 로그인되어 있으면 로딩 끝
    }
  }, [navigate]);

  if (loading) {
    // 로그인 여부 확인 중이면 로딩 화면을 표시
    return <div>로그인 상태를 확인하는 중...</div>;
  }

  return (
    <div>
      <h2>비공개 페이지</h2>
      <p>로그인된 사용자만 이 페이지를 볼 수 있습니다.</p>
    </div>
  );
};

export default MyPageRedirect;
