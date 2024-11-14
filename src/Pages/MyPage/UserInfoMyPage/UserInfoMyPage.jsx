import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Box, Typography, Button, Divider, TextField } from "@mui/material";
import api from "../../../api/axios";

import "../../../ui/MyPage/UserInfoMyPage/UserInfoMyPage.css";
import MainHeader from "../../Header/MainHeader";

const UserInfoMyPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [introduceText, setIntroduceText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await api.get(`/api/amadda/user/${userId}`);
      if (response.data) {
        setEmail(response.data.email);
        setNickname(response.data.nickname || "");
        setName(response.data.name || "");
        setPhoneNumber(response.data.phoneNumber || "");
        const formattedBirthDate = response.data.birthDate.split("T")[0];
        setBirthDate(formattedBirthDate);
        setGender(response.data.gender === 'M' ? '남자' : '여자');
        setIntroduceText(response.data.introduceText || "");

        if (response.data.profileImage) {
          setSelectedImage(`http://localhost:8001${response.data.profileImage}`);
        }
      }
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) fetchUserInfo();
  }, [userId, fetchUserInfo]);

    useEffect (() => {
      if (selectedImage) {
        fetchUserInfo();
      }
    }, [selectedImage, fetchUserInfo]);

  const profileSave = async () => {
    try {
      await api.put(`/api/amadda/user/${userId}`, {
        nickname, introduceText // 닉네임과 자기소개를 업데이트
      });
      alert("수정 완료!");
      navigate(`/amadda/myPage/${userId}`);
    }
    catch (error) {
      console.error("소개 글 저장 중 오류 발생:", error.response ? error.response.data : error.message);
    }
  };

  const profileCancel = () => {
    navigate(`/amadda/myPage/${userId}`);
  };

  // 이미지 변경 핸들러
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // 새로 선택된 이미지를 미리보기
      };
      reader.readAsDataURL(file);

      // 서버에 이미지 업로드
      const formData = new FormData();
      formData.append("file", file);

      api.put(`/api/amadda/user/${userId}/upload-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(response => {
        console.log("이미지 업로드 성공:", response.data);
        // 업로드된 이미지 URL을 상태에 반영
        setSelectedImage(`http://localhost:8001/uploads/${response.data}`);
      })
      .catch(error => {
        console.error("이미지 업로드 중 오류 발생:", error);
      });
    }
  };

  const handleCameraClick = () => {
    document.getElementById("fileInput").click(); // 파일 입력 필드를 클릭
  };

  return (
    <div>
      <MainHeader />

      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Box className="user-info-main">
            <Typography variant="h6" sx={{ fontFamily: "font-notosansKR-medium" }}>프로필 편집</Typography>

            <Divider className="introduce-divider" />

            <Box className="user-profile-container">
              {/* 프로필 이미지 영역 */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", ml: 2 ,justifyContent: "center" }}>
                <img
                  className="user-profile-image"
                  alt="User"
                  src={selectedImage || "/img/MyPage/UserInfoMyPage/male-user.png"} // 미리보기 이미지
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                />
                <Button variant="outlined" onClick={handleCameraClick} sx={{ mt: 2 }}>사진 변경</Button>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Box>
            </Box>

            <Box className="introduce-container">
              <Typography variant="h6" sx={{ fontFamily: "font-notosansKR-medium" }}>소개 글</Typography>
              <Divider className="introduce-divider" />
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={introduceText}
                onChange={(e) => setIntroduceText(e.target.value)}
                InputProps={{
                  sx: { fontFamily: "font-notosansKR-light !important" }
                }}
                sx={{ mt: 2 }}
              />
            </Box>

            <Box className="required-info-container">
              <Typography variant="h6" sx={{ fontFamily: "font-notosansKR-medium" }}>필수 정보</Typography>
              <Divider className="required-info-divider" />
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" className="input-label">닉네임</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  sx={{ my: 1 }}
                  InputProps={{
                    sx: { fontFamily: "font-notosansKR-light !important" }
                  }}
                />
                <Typography variant="body2" className="input-label">이름</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={name}
                  disabled
                  sx={{ my: 1 }}
                  InputProps={{
                    sx: { fontFamily: "font-notosansKR-light !important" }
                  }}
                />
                <Typography variant="body2" className="input-label">이메일</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={email}
                  disabled
                  sx={{ my: 1 }}
                  InputProps={{
                    sx: { fontFamily: "font-notosansKR-light !important" }
                  }}
                />
                <Typography variant="body2" className="input-label">전화번호</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={phoneNumber}
                  disabled
                  sx={{ my: 1 }}
                  InputProps={{
                    sx: { fontFamily: "font-notosansKR-light !important" }
                  }}
                />
              </Box>
            </Box>

            <Box className="additional-info-container">
              <Typography variant="h6" sx={{fontFamily: "font-notosansKR-medium"}}>추가 정보</Typography>
              <Divider className="additional-info-divider" />
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" className="input-label">생년월일</Typography>
                <TextField  fullWidth 
                            variant="outlined" 
                            value={birthDate}
                            disabled 
                            sx={{ my: 1 }} 
                            InputProps={{
                              sx: { fontFamily: "font-notosansKR-light !important" }
                            }}/>
                <Typography variant="body2" className="input-label">성별</Typography>
                <TextField  fullWidth 
                            variant="outlined" 
                            value={gender}
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
