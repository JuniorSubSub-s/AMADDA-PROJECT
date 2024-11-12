import { useState, useCallback, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import api from "../../../../api/axios";
import "./UserProfile.css";

function UserProfile({ userId }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchUserImage = useCallback(async () => {
        try {
            const response = await api.get(`/api/amadda/user/${userId}`);
            if (response.data && response.data.profileImage) {
                setSelectedImage(`http://localhost:8001${response.data.profileImage}`);
            }
        } catch (error) {
            console.error("프로필 이미지 로드 중 오류 발생:", error);
        }
    
    }, [userId]);

    useEffect ( () => {
        if (userId) fetchUserImage();
    }, [userId, fetchUserImage]);

    useEffect ( () => {
        if (selectedImage) {
            fetchUserImage();
        }
    }, [selectedImage, fetchUserImage]);


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);  // 새로 선택된 이미지를 미리보기
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
                setSelectedImage(`http://localhost:7777/uploads/${response.data}`);
            })
            .catch(error => {
                console.error("이미지 업로드 중 오류 발생:", error);
            });
        }
    };

    const handleCameraClick = () => {
        document.getElementById("fileInput").click();
    };

    return (
        <div>
            <Grid container justifyContent="center" alignItems="center" spacing={3}>
                {/* 프로필 이미지 */}
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
