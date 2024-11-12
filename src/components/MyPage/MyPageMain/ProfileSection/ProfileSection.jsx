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

  // 컴포넌트 마운트 시 사용자 정보 불러오기
  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]); // fetchUserInfo 함수가 변경되면 호출

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
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
          <Box
            className="mainPage-status-box"
            onClick={handleSubscriptionClick}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <Typography variant="body2" className="box-name" sx={{ marginRight: "4px" }}>
              구독 전
            </Typography>
            <IconButton size="small" sx={{ padding: 0 }}>
              <NotificationsNone fontSize="small" />
            </IconButton>
          </Box>
          <Typography className="mainPage-user-name">{userNickname}</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
          <Box
            className="mainPage-status-box"
            onClick={handleFollowClick}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <Typography variant="body2" className="box-follow">
              팔로잉
            </Typography>
          </Box>
          <Typography variant="h5" className="mainPage-user-follow">
            {followingCount}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
          <Box
            className="mainPage-status-box"
            onClick={handleFollowerClick}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <Typography variant="body2" className="box-follower">
              팔로워
            </Typography>
          </Box>
          <Typography variant="h5" className="mainPage-user-follower">
            {followerCount}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfileSection;
