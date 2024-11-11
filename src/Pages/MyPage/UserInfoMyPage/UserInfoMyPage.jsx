import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Button, Divider, TextField } from "@mui/material";

import "../../../ui/MyPage/UserInfoMyPage/UserInfoMyPage.css";
import MainHeader from "../../Header/MainHeader";

const UserInfoMyPage = () => {
  const [introduceText, setIntroduceText] = useState("");
  const navigate = useNavigate();

  const profileSave = () => {
    console.log("소개 글 저장:", introduceText);
    alert("수정완료!");
    navigate('/mypage');
  };

  // 사용자 닉네임
  const [nickName, setNickName] = useState("qwer1234");

  // 입력이 빌 경우 기본값으로 되돌리기
  const handleBlur = () => {
    if(nickName.trim() === "") {
      setNickName("qwer1234");
    }
  };

  const profileCancel = () => {
    navigate('/mypage');
  };

  return (
    <div>
      <MainHeader />

      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Box className="user-info-main">
            <Typography variant="h6" sx={{fontFamily: "font-notosansKR-medium"}}>프로필 편집</Typography>

            <Divider className="introduce-divider" />

            <Box className="user-profile-container">
              <img
                className="user-profile-image"
                alt="Male user"
                src="/img/MyPage/UserInfoMyPage/male-user.png"
              />

              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", ml: 2 }}>
                <Typography variant="h6" className="user-profile-text">USER NickName</Typography>
                <Typography variant="body1" className="user-profile-subtext">USER Name</Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                  <Button variant="outlined" className="profile-button">사진 변경</Button>
                </Box>
              </Box>
            </Box>

            <Box className="introduce-container">
              <Typography variant="h6" sx={{fontFamily: "font-notosansKR-medium"}}>소개 글</Typography>
              <Divider className="introduce-divider" />
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="자기소개를 해주세요"
                value={introduceText}
                onChange={(e) => setIntroduceText(e.target.value)}
                InputProps={{
                  sx: { fontFamily: "font-notosansKR-light !important" }
                }}
                sx={{ mt: 2 }}
              />
            </Box>

            <Box className="required-info-container">
              <Typography variant="h6" sx={{fontFamily: "font-notosansKR-medium"}}>필수 정보</Typography>
              <Divider className="required-info-divider" />
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" className="input-label">닉네임</Typography>
                <TextField  fullWidth 
                            variant="outlined" 
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                            onBlur={handleBlur}
                            sx={{ my: 1 }} 
                            InputProps={{
                              sx: { fontFamily: "font-notosansKR-light !important" }
                            }}/>
                <Typography variant="body2" className="input-label">이름</Typography>
                <TextField  fullWidth 
                            variant="outlined" 
                            value="UserName" 
                            disabled 
                            sx={{ my: 1 }} 
                            InputProps={{
                              sx: { fontFamily: "font-notosansKR-light !important" }
                            }}/>
                <Typography variant="body2" className="input-label">이메일</Typography>
                <TextField  fullWidth 
                            variant="outlined" 
                            value="qwer1234@gmail.com" 
                            disabled sx={{ my: 1 }} 
                            InputProps={{
                              sx: { fontFamily: "font-notosansKR-light !important" }
                            }}/>
                <Typography variant="body2" className="input-label">전화번호</Typography>
                <TextField  fullWidth 
                            variant="outlined" 
                            value="010 - 1234 - 5678" 
                            disabled sx={{ my: 1 }} 
                            InputProps={{
                              sx: { fontFamily: "font-notosansKR-light !important" }
                            }}/>
              </Box>
            </Box>

            <Box className="additional-info-container">
              <Typography variant="h6" sx={{fontFamily: "font-notosansKR-medium"}}>추가 정보</Typography>
              <Divider className="additional-info-divider" />
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" className="input-label">생년월일</Typography>
                <TextField  fullWidth 
                            variant="outlined" 
                            value="1991-06-29" 
                            disabled 
                            sx={{ my: 1 }} 
                            InputProps={{
                              sx: { fontFamily: "font-notosansKR-light !important" }
                            }}/>
                <Typography variant="body2" className="input-label">성별</Typography>
                <TextField  fullWidth 
                            variant="outlined" 
                            value="남자" 
                            disabled 
                            sx={{ my: 1 }} 
                            InputProps={{
                              sx: { fontFamily: "font-notosansKR-light !important" }
                            }}/>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1, fontFamily: "font-notosansKR-medium" }}>생년월일, 성별 정보는 팔로우/팔로워에게 제공됩니다.</Typography>
              </Box>
            </Box>

            <Box className="button-container">
              <Button variant="outlined" onClick={profileCancel} className="cancel-button">취소</Button>
              <Button variant="contained" color="primary" onClick={profileSave} className="save-button">수정 완료</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserInfoMyPage;
