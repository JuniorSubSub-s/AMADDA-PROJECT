import { useState, useEffect, useCallback } from "react";
import { Grid, Box } from "@mui/material";
import api from "../../../../api/axios";
import "./UserProfile.css";

function UserProfile({ userId }) {
    const [selectedImage, setSelectedImage] = useState(null);

    // 사용자 프로필 이미지 가져오기
    const fetchUserImage = useCallback(async () => {
        try {
            const response = await api.get(`/api/amadda/user/${userId}`);
            if (response.data && response.data.profileImage) {
                setSelectedImage(`http://localhost:7777${response.data.profileImage}`);
            } else {
                setSelectedImage("/img/MyPage/MainMyPage/default_profile.png");
            }
        } catch (error) {
            console.error("프로필 이미지 로드 중 오류 발생:", error);
        }
    }, [userId]);

    // 컴포넌트가 처음 렌더링될 때 이미지 가져오기
    useEffect(() => {
        if (userId) {
            fetchUserImage();
        }
    }, [userId, fetchUserImage]);

    // 이미지 파일 선택 시 미리보기 및 서버에 업로드
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            api.put(`/api/amadda/user/${userId}/upload-image`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log("이미지 업로드 성공:", response.data);
                setSelectedImage(`http://localhost:7777${response.data}`);
            })
            .catch((error) => {
                console.error("이미지 업로드 중 오류 발생:", error);
                fetchUserImage();  // 오류 발생 시 기존 이미지 유지
            });
        }
    };

    const handleCameraClick = () => {
        document.getElementById("fileInput").click();  // 파일 선택 버튼 클릭
    };

    return (
        <div>
            <Grid container justifyContent="center" alignItems="center" spacing={3}>
                <Grid item>
                    <Box className="profile-card">
                        {selectedImage ? (
                            <img className="male-user" alt="User" src={selectedImage} />
                        ) : (
                            <img className="male-user" alt="프로필 이미지" src="/img/MyPage/MainMyPage/default_profile.png" />
                        )}
                        <img
                            className="camera-button"
                            src="/img/MyPage/MainMyPage/camera.png"
                            onClick={handleCameraClick}
                            alt="Camera button"
                        />
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default UserProfile;
