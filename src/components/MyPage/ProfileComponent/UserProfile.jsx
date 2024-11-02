import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

function UserProfile () {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [activeButton, setActiveButton] = useState(null); // 클릭된 버튼 상태 관리
    const [selectedImage, setSelectedImage] = useState(null); // 선택한 이미지 상태

    const handleResize = () => {
        setIsMobile(window.innerWidth < 740); // 740px 미만일 때
    };

    useEffect(() => {
        handleResize(); // 처음 렌더링될 때 체크
        window.addEventListener('resize', handleResize); // 리사이즈 이벤트 리스너 추가

        return () => {
            window.removeEventListener('resize', handleResize); // 클린업
        };
    }, []);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName); // 클릭된 버튼 이름 저장
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // 선택한 이미지 미리보기
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCameraClick = () => {
        document.getElementById('fileInput').click(); // 파일 입력 클릭
    };

    const handleProfileEditClick = () => {
        navigate("/amadda/myPage/user-info"); // 프로필 편집 페이지로 이동
    };

    const handleSubscriptionClick = () => {
        navigate("/amadda/myPage/subscribe"); // 구독 페이지로 이동
    };


    return (
        <div>
            <div className={`user-container ${isMobile ? 'mobile' : ''}`}>
                <div className={`profile-card ${isMobile ? 'mobile' : ''}`}>
                        {selectedImage ? (
                            <img className="male-user" alt="User" src={selectedImage} />
                        ) : (
                            <img className="male-user" alt="프로필 이미지" src="/img/MyPage/MainMyPage/default_profile.png" />
                        )}
                    <img 
                            className="camera-button" 
                            src='/img/MyPage/MainMyPage/camera.png' 
                            onClick={handleCameraClick} 
                            alt="Camera button"
                        />
                     <input 
                        type="file" 
                        id="fileInput" 
                        style={{ display: 'none' }} 
                        accept="image/*" 
                        onChange={handleImageChange} 
                    />
                </div>
                {!isMobile && ( // 740px 이상일 때만 렌더링
                    <div className="mainPage-user-info-container">
                        <div className="name-container">
                            <div    className="mainPage-user-info-box"
                                    onClick={handleSubscriptionClick}
                                    style={{ cursor: 'pointer' }}>
                                구독 전
                            </div>
                            <div className="mainPage-user-name">이원준님</div>
                        </div>
                        <div className="entire-coin-frame">
                            <div className="mainPage-user-info-box">보유코인</div>
                            <div className="user-coin">2000AC</div>
                        </div>
                        <div className="entire-coin-frame">
                            <div className="mainPage-user-info-box">팔로우</div>
                            <div className="user-coin">4</div>
                        </div>
                        <div className="entire-coin-frame">
                            <div className="mainPage-user-info-box">팔로워</div>
                            <div className="user-coin">14</div>
                        </div>
                    </div>
                )}
                    <button className="profile-fix"
                            onClick={handleProfileEditClick}>
                        프로필편집
                    </button>
            </div>

           <div className={`underbar ${isMobile ? 'mobile' : ''}`}></div>

            <div className={`category-group ${isMobile ? 'mobile' : ''}`}>
                <div className="category-group-container">
                    {[, "정보", "나의 핀 맵", "캘린더"].map((buttonName) => (
                        <button
                            key={buttonName}
                            className={activeButton === buttonName ? 'active' : ''}
                            onClick={() => handleButtonClick(buttonName)}
                        >
                            {buttonName}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserProfile;