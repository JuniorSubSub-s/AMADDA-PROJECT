import "../css/userprofile.css";

function UserProfile () {
    return (
        <div>
            <div className="user-container">
                <div className="profile-card">
                    <img className="male-user" alt="Male user" src="/img/male-user.png" />
                    <img className="camera-button" src='/img/camera.png'/>
                    <div className="male-user-box"></div>
                </div>
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

            </div>

            <div className="underbar"></div>

            


            <div className="category-group">
                <button>게시물</button>
                <button>정보</button>
                <button>친구</button>
                <button>사진</button>
                <button>열람 관리</button>
            </div>
        </div>
    )
}

export default UserProfile;


