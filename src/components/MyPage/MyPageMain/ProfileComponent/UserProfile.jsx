import { useState } from "react";
import { Grid, Box } from "@mui/material";
import "./UserProfile.css";

function UserProfile() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCameraClick = () => {
        document.getElementById("fileInput").click();
    };

    return (
        <div>
            <Grid   container 
                    justifyContent="center" 
                    alignItems="center" 
                    spacing={3}>
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
