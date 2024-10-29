import { useEffect, useState } from "react";
import "../css/userprofile.css";

function UserProfile () {
    const [isMobile, setIsMobile] = useState(false);
    const [activeButton, setActiveButton] = useState(null); // 클릭된 버튼 상태 관리

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

    return (
        <div>
            <div className={`user-container ${isMobile ? 'mobile' : ''}`}>
                <div className={`profile-card ${isMobile ? 'mobile' : ''}`}>
                    <img className="male-user" alt="Male user" src="/img/male-user.png" />
                    <img className="camera-button" src='/img/camera.png'/>
                    <div className="male-user-box"></div>
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

export default UserProfile;


