import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Box, Typography, Button, Divider, TextField } from "@mui/material";
import api from "../../../api/axios";

import "../../../ui/MyPage/UserInfoMyPage/UserInfoMyPage.css";
import MainHeader from "../../Header/MainHeader";

const UserInfoMyPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [forceUpdate, setForceUpdate] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    nickname: "",
    name: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    introduceText: "",
    profileImage: null,
  });


  // 사용자 정보 가져오기
  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await api.get(`/api/amadda/user/${userId}`);
      if (response.data) {
        const {
          email, nickname, name, phoneNumber, birthDate, gender, introduceText, profileImage,
        } = response.data;

        setUserInfo({
          email, nickname, name, phoneNumber,
          birthDate: birthDate.split("T")[0],
          gender: gender === "M" ? "남자" : "여자",
          introduceText,
          profileImage: profileImage || "/img/MyPage/MainMyPage/default_profile.png",
        });
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) fetchUserInfo();
  }, [userId, fetchUserInfo]);

  // 입력 필드 변경 시 사용자 정보 업데이트
  const handleInputChange = (field) => (event) => {
    setUserInfo((prev) => ({ ...prev, [field]: event.target.value }));
  }

  // 이미지 변경 시 사용자 정보 다시 가져오기
  const handleImageChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }
      formData.append("userId", userId);

      try {
        const response = await api.put(
          `/api/amadda/user/upload-profile-image/${userId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          });

        const uploadedImageUrl = response.data[0];
        setUserInfo((prev) => ({
          ...prev,
          profileImage: `${uploadedImageUrl}?t=${new Date().getTime()}`, // 타임스탬프 추가
        }));
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
      }
    }
  };

  // 수정 완료 버튼 클릭 시 프로필 수정
  const profileSave = async () => {
    try {
      await api.put(`/api/amadda/user/${userId}`, {
        nickname: userInfo.nickname,
        introduceText: userInfo.introduceText,
      });

      // 수정 완료 메시지 알림
      alert("수정 완료!");
      
      navigate(`/amadda/myPage/${userId}`);
    } catch (error) {
      console.error("소개 글 저장 중 오류 발생 : ", error.response ? error.response.data : error.message);
    }
  };

  const profileCancel = () => navigate(`/amadda/myPage/${userId}`);

  const handleCameraClick = () => document.getElementById("fileInput").click();

  return (
    <div>
      <MainHeader />
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Box className="user-info-main">
            <Typography variant="h6" sx={{ fontFamily: "font-notosansKR-medium" }}>
              프로필 편집
            </Typography>
            <Divider className="introduce-divider" />

            {/* 프로필 이미지 */}
            <Box className="user-profile-container" sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box
                sx={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
                  marginBottom: "16px", // 버튼과 이미지 간격 추가
                }}
              >
                <img
                  className="user-profile-image"
                  alt="User Profile"
                  src={userInfo.profileImage || "/img/MyPage/MainMyPage/default_profile.png"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Button
                variant="outlined"
                onClick={handleCameraClick}
                sx={{ width: "260px", borderRadius: "30px", fontFamily: "font-notosansKR-medium" }}
              >
                사진 변경
              </Button>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </Box>

            {/* 소개 글 */}
            <Box className="introduce-container">
              <Typography variant="h6" sx={{ fontFamily: "font-notosansKR-medium" }}>
                소개 글
              </Typography>
              <Divider className="introduce-divider" />
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={userInfo.introduceText}
                onChange={handleInputChange("introduceText")}
                InputProps={{
                  sx: { fontFamily: "font-notosansKR-light !important" },
                }}
                sx={{ mt: 2 }}
              />
            </Box>

            {/* 필수 정보 */}
            <Box className="required-info-container">
              <Typography variant="h6" sx={{ fontFamily: "font-notosansKR-medium", marginTop: "20px" }}>
                필수 정보
              </Typography>
              <Divider className="required-info-divider" />
              <Box sx={{ mt: 2 }}>
                {[
                  { label: "닉네임", value: userInfo.nickname, disabled: false, field: "nickname" },
                  { label: "이름", value: userInfo.name, disabled: true },
                  { label: "이메일", value: userInfo.email, disabled: true },
                  { label: "전화번호", value: userInfo.phoneNumber, disabled: true },
                ].map(({ label, value, disabled, field }, idx) => (
                  <React.Fragment key={idx}>
                    <Typography variant="body2" className="input-label">
                      {label}
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={value}
                      disabled={disabled}
                      onChange={field ? handleInputChange(field) : undefined}
                      sx={{ my: 1 }}
                      InputProps={{
                        sx: { fontFamily: "font-notosansKR-light !important" },
                      }}
                    />
                  </React.Fragment>
                ))}
              </Box>
            </Box>

            {/* 추가 정보 */}
            <Box className="additional-info-container">
              <Typography variant="h6" sx={{ fontFamily: "font-notosansKR-medium", marginTop: "20px" }}>
                추가 정보
              </Typography>
              <Divider className="additional-info-divider" />
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" className="input-label">
                  생년월일
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={userInfo.birthDate}
                  disabled
                  sx={{ my: 1 }}
                  InputProps={{
                    sx: { fontFamily: "font-notosansKR-light !important" },
                  }}
                />
                <Typography variant="body2" className="input-label">
                  성별
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={userInfo.gender}
                  disabled
                  sx={{ my: 1 }}
                  InputProps={{
                    sx: { fontFamily: "font-notosansKR-light !important" },
                  }}
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1, fontFamily: "font-notosansKR-medium" }}
                >
                  생년월일, 성별 정보는 팔로우/팔로워에게 제공됩니다.
                </Typography>
              </Box>
            </Box>

            {/* 버튼 */}
            <Box className="button-container">
              <Button
                variant="outlined"
                onClick={profileCancel}
                className="cancel-button"
              >
                취소
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={profileSave}
                className="save-button"
              >
                수정 완료
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserInfoMyPage;
