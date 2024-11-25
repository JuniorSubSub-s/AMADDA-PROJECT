import React, { useState, useCallback, useEffect } from "react";
import { Grid, Box, Typography, IconButton } from "@mui/material";
import { NotificationsNone } from "@mui/icons-material";

import UserProfile from "../ProfileComponent/UserProfile";
import api from "../../../../api/axios";

import "./ProfileSction.css";
import { useNavigate } from "react-router-dom";

const ProfileSection = ({ userId }) => {
  const navigate = useNavigate();
  const [userNickname, setUserNickname] = useState("");
  const [followingCount, setFollowingCount] = useState(0); // 초기값 0
  const [followerCount, setFollowerCount] = useState(0); // 초기값 0
  const [isSubscribed, setIsSubscribed] = useState(false);

  // 사용자 정보를 가져오는 함수
  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await api.get(`/api/amadda/user/${userId}`);
      if (response.data) {
        const data = response.data.user || response.data;
        setUserNickname(data.nickname || "");
        setFollowingCount(data.followingCount || 0);
        setFollowerCount(data.followerCount || 0);
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생: ", error);
    }
  }, [userId]);

  // 구독 상태 확인 함수
  const checkSubscriptionStatus = useCallback(async () => {
    try {
      const response = await api.get("/api/user/subscription/status", {
        params: { userId: userId },
      });
      setIsSubscribed(response.data.isSubscribed);
    } catch (error) {
      console.error("구독 상태 확인 중 오류 발생: ", error);
    }
  }, [userId]);

  // 컴포넌트 마운트 시 사용자 정보 불러오기
  useEffect(() => {
    fetchUserInfo();
    checkSubscriptionStatus();
  }, [fetchUserInfo, checkSubscriptionStatus]); // fetchUserInfo 함수가 변경되면 호출

  // 구독 버튼 관리
  const handleSubscriptionClick = () => {
    navigate("/amadda/myPage/subscribe");
  };

  // 팔로우 버튼 관리
  const handleFollowClick = () => {
    // 팔로우 관련 기능 구현
  };

  // 팔로워 버튼 관리
  const handleFollowerClick = () => {
    // 팔로워 관련 기능 구현
  };

  return (
    <Grid container spacing={3} alignItems="center">
  <Grid item xs={12} md={5}>
    <UserProfile userId={userId} />
  </Grid>
  <Grid item xs={12} md={7} className="mainPage-profile-info">
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <Box
        className="mainPage-status-box"
        onClick={handleSubscriptionClick}
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" className="box-name" sx={{ marginRight: "4px" }}>
          {isSubscribed ? "구독 중" : "구독 전"}
        </Typography>
        <IconButton size="small" sx={{ padding: 0 }}>
          <NotificationsNone fontSize="small" />
        </IconButton>
      </Box>

      {/* 사용자 닉네임을 중앙 정렬 */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
        <Typography
          className="mainPage-user-name"
          sx={{
            fontFamily: "font-notosansKR-light",
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginTop: "5px",
            textAlign: "center", // 중앙 정렬
          }}
        >
          {userNickname}
        </Typography>
      </Box>
    </Box>

    {/* 팔로잉 카운트 */}
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <Box
        className="mainPage-status-box"
        onClick={handleFollowClick}
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" className="box-follow">
          팔로잉
        </Typography>
      </Box>
      <Typography variant="h5" className="mainPage-user-follow" sx={{ textAlign: "center" }}>
        {followingCount}
      </Typography>
    </Box>

    {/* 팔로워 카운트 */}
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <Box
        className="mainPage-status-box"
        onClick={handleFollowerClick}
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" className="box-follower">
          팔로워
        </Typography>
      </Box>
      <Typography variant="h5" className="mainPage-user-follower" sx={{ textAlign: "center" }}>
        {followerCount}
      </Typography>
    </Box>
  </Grid>
</Grid>

  );
};

export default ProfileSection;
