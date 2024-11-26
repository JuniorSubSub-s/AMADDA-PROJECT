import React, { useEffect, useState } from "react";
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from "../../api/axios";

import MainHeader from "../Header/MainHeader";
import getUserId from '../../utils/getUserId';

import "../../ui/SubscribePage/SubscribePage.css";

const FEATURES = [
  { icon: "/img/SubscribePage/remove-book.png", title: "광고 제거", description: "더 이상 귀찮은 광고 없이 깔끔한 환경에서 아맛따를 이용하세요." },
  { icon: "/img/SubscribePage/badge.png", title: "멤버십 구독 배지 제공", description: "구독자만을 위한 특별한 배지를 획득해서 자랑해보세요!" },
  { icon: "/img/SubscribePage/abc.png", title: "일기장 글자 수 확장", description: "더 많은 글자를 써서 당신의 멋진 경험을 세세하게 기록하세요!" },
  { icon: "/img/SubscribePage/adobe-illustrator.png", title: "AI 자동 일기 작성 기능", description: "AI가 자동으로 멋진 일기를 작성해줍니다." },
  { icon: "/img/SubscribePage/google-calendar.png", title: "캘린더 기능", description: "맛집 스케줄을 캘린더에 추가하세요!" },
]

function SubscribePage() {
  const [isSubscribed, setIsSubscribed] = useState(false);        // 구독 상태 관리
  const [loading, setLoading] = useState(false);                  // 로딩 상태 관리
  const navigate = useNavigate();                                 // 페이지 이동

  // API 요청 함수 분리
  const fetchSubscriptionStatus = async () => {
    try {
      const { data } = await api.get("/api/user/subscription/status", {
        params: { userId: getUserId() },
      });
      setIsSubscribed(data.isSubscribed);
    } catch (error) {
      console.error("구독 상태 확인 실패 : ", error);
      alert("구독 상태 확인 실패");
    }
  };

  // 구독 상태 변경 함수
  const handleSubscriptionChange = async (isSubscribing) => {
    if (loading) return;
    setLoading(true);
    const endpoint = isSubscribing ? "/api/user/subscription" : "/api/user/unsubscription";
    try {
      const { data } = await api.post(endpoint, null, { params: { userId: getUserId() } });
      alert(data);
      setIsSubscribed(isSubscribing);
      if (isSubscribing) navigate(`/amadda/myPage/${getUserId()}`);
    } catch (error) {
      console.error("구독 상태 변경 실패 : ", error);
      alert("구독 상태 변경 실패");
    } finally {
      setLoading(false);
    }
  }

  // 컴포넌트가 로드될 때 구독 상태 확인하기
  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  return (
    <div>
      <MainHeader />
      <Grid container sx={{ maxHeight: "100%", width: "100%" }}>
        <Grid item xs={12} sm={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 2 }}>
          <div className="left-panel" />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 2 }}>
          <div className="subscribe-background">
            {/* 타이틀 */}
            <h1 className="request-title">AMADDA 정기 구독 신청 🛎️</h1>
            {/* 기능 설명 */}
            <FeatureList features={FEATURES} />
            {/* 구독 상태 버튼 */}
            <div className="sign-up-frame">
              {isSubscribed ? (
                <>
                  <button className="final-button completed" disabled>
                    구독 완료
                  </button>
                  <button
                    className="final-button unsubscribe"
                    onClick={() => handleSubscriptionChange(false)}
                    disabled={loading}
                  >
                    구독 취소
                  </button>
                </>
              ) : (
                <button
                  className="final-button"
                  onClick={() => handleSubscriptionChange(true)}
                  disabled={loading}
                >
                  정기 서비스 구독하기
                </button>
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 2 }}>
          <div className="right-panel" />
        </Grid>
      </Grid>
    </div>
  );
};

// 기능 리스트 컴포넌트
const FeatureList = ({ features }) => (
  <div className="subscribe-feature-frame">
    <div className="subscribe-feature-list">
      {features.map((feature, index) => (
        <FeatureItem key={index} {...feature} />
      ))}
    </div>
  </div>
  
);

const FeatureItem = ({ icon, title, description }) => (
  <div className="subscribe-feature-item">
    <img className="subscribe-feature-icon" src={icon} alt={title} />
    <div className="subscribe-feature-text">
      <strong style={{ display: "block", marginBottom: "8px" }}>{title}</strong> {/* 간격 추가 */}
      {description}
    </div>
  </div>
);

export default SubscribePage;