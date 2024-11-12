import React from "react";
import { Grid, Box, Typography, IconButton } from "@mui/material";
import { NotificationsNone } from "@mui/icons-material";

import UserProfile from "../ProfileComponent/UserProfile";

import "./ProfileSction.css";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const navigate = useNavigate();

  // 구독 버튼 관리
  const handleSubscriptionClick = () => {
    navigate("/amadda/myPage/subscribe");
  };

  // 팔로우 버튼 관리
  const handleFollowClick = () => {

  };

  // 팔로우 버튼 관리
  const handleFollowerClick = () => {

  };

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={5}>
        <UserProfile />
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
          <Typography className="mainPage-user-name">이원준</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
          <Box
            className="mainPage-status-box"
            onClick={handleFollowClick}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <Typography variant="body2" className="box-follow">팔로우</Typography>
          </Box>
          <Typography variant="h5" className="mainPage-user-follow">7</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
          <Box
            className="mainPage-status-box"
            onClick={handleFollowerClick}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <Typography variant="body2" className="box-follower">팔로워</Typography>
          </Box>
          <Typography variant="h5" className="mainPage-user-follower">15</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfileSection;
