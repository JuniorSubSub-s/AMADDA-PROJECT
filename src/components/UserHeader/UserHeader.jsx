import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./userheader.css";

function UserHeader () {
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(false);
    const [activeButton, setActiveButton] = useState(null); // 클릭된 버튼 상태 관리
    const [selectedImage, setSelectedImage] = useState(null); // 선택한 이미지 상태


    // 740px 미만일 때
    const handleResize = () => {
        setIsMobile(window.innerWidth < 740); 
    };

    useEffect(() => {
        // 처음 렌더링될 때 체크
        handleResize(); 
        window.addEventListener('resize', handleResize); // 리사이즈 이벤트 리스너 추가

        return () => {
            window.removeEventListener('resize', handleResize); // 클린업
        };
    }, []);

    const handleButtonClick = (buttonName) => {
        // 클릭된 버튼 이름 저장
        setActiveButton(buttonName); 

        if(buttonName === "게시물") {
            navigate("/m")
        } else if(buttonName === "정보") {
            navigate("/m/user-info"); 
        } else if(buttonName === "사진") {
            navigate("/m/user-imgList");
        }
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


    return (
        <div>
            <div className={`user-container ${isMobile ? 'mobile' : ''}`}>
                <div className={`profile-card ${isMobile ? 'mobile' : ''}`}>
                        {selectedImage ? (
                            <img className="male-user" alt="User" src={selectedImage} />
                        ) : (
                            <img className="male-user" alt="프로필 이미지" src="/img/MyPage/UserInfoMyPage/default_profile.png" />
                        )}
                    <img 
                            className="camera-button" 
                            src='/img/MyPage/UserInfoMyPage/camera.png' 
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
                    <div className="user-info-container">
                        <div className="name-container">
                            <div className="user-info-box">구독중</div>
                            <div className="user-name">이원준님</div>
                        </div>
                        <div className="entire-coin-frame">
                            <div className="user-info-box">보유코인</div>
                            <div className="user-coin">2000AC</div>
                        </div>
                    </div>
                )}
            </div>

           <div className={`underbar ${isMobile ? 'mobile' : ''}`}></div>

            <div className={`category-group ${isMobile ? 'mobile' : ''}`}>
                <div className="category-group-container">
                    {["게시물", "정보", "친구", "사진"].map((buttonName) => (
                        <button
                            key={buttonName}
                            className={activeButton === buttonName ? 'active' : ''}
                            onClick={() => handleButtonClick(buttonName)}
                        >
                            {buttonName}
                        </button>
                    ))}
                    <button
                        className={`special ${activeButton === "열람 관리" ? 'active' : ''}`}
                        onClick={() => handleButtonClick("열람 관리")}
                    >
                        열람 관리
                    </button>
                </div>
            </div>
        </div>
    )
}


export default UserHeader;
