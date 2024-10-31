import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../../ui/MyPage/UserInfoMyPage/UserInfoMyPage.css";
import MainHeader from "../../Header/MainHeader";
import UserHeader from "../../../components/UserHeader/UserHeader";

const ProfileEdit = () => {

  const [introduceText, setIntroduceText] = useState("");
  const navigate = useNavigate();

  const profileSave = () => {
    console.log("소개 글 저장:", introduceText);
    alert("수정완료!");
    navigate('/mypage');
  };

  const profileCancel = () => {
    navigate('/mypage');
  };

  return (
    <div>
      <MainHeader />
      <UserHeader />

      <div className="userInfo-main">
        <div className="user-profile">

          <div className="text-wrapper-26">프로필 편집</div>

          <img className="line-6" alt="Line" src="/img/MyPage/UserInfoMyPage/line-25.svg" />  {/*프로필 편집 밑줄 */}

          <div className="user-image">

            <img className="male-user-2" alt="Male user" src="/img/MyPage/UserInfoMyPage/male-user.png" />

            <div className="text-wrapper-27">USER NickName</div>

            <div className="text-wrapper-28">USER Name</div>

            <div className="picture-button">
              <div className="text-wrapper-29">사진 변경</div>
            </div>

            <div className="background-picture-button">
              <div className="text-wrapper-30">배경 사진 변경</div>
            </div>
          </div>  {/*user-image*/}

          <div className="introduce-text-edit">

            <div className="text-wrapper-15">소개 글 </div>
            <img className="img" alt="Line" src="/img/MyPage/UserInfoMyPage/line-26.svg" /> {/*소개 글 밑줄 */}

            <div className="user-introduce-text">
              <textarea className="text-input" placeholder="자기소개를 해주세요"
                value={introduceText}
                onChange={(e) => setIntroduceText(e.target.value)}>
              </textarea>
            </div>
          </div>  {/* introduce-text-edit */}

          <div className="required-info">

            <div className="text-wrapper-25">필수정보</div>
            <img className="line-4" alt="Line" src="/img/MyPage/UserInfoMyPage/line-29.svg" />  {/* 필수정보 밑줄 */}

            <div className="user-nick-name">
              <div className="text-wrapper-24">qwer1234</div>
            </div>

            <div className="user-name-2">
              <div className="text-wrapper-24">UserName</div>
            </div>

            <input className="user-email" placeholder="qwer1234@gmail.com" />

            <div className="user-phone-num">
              <div className="text-wrapper-24">010 - 1234 - 5678</div>
            </div>
          </div> {/* required-info */}

          <div className="additional-info">

            <div className="text-wrapper-21">추가정보</div>

            <img className="line-2" alt="Line" src="/img/MyPage/UserInfoMyPage/line-29.svg" />  {/* 추가정보 밑줄 */}

            <div className="user-birth">
              <div className="text-wrapper-17">1991-06-29</div>
            </div>

            <div className="user-gender">
              <div className="text-wrapper-18">남자</div>
            </div>

            <div className="text-wrapper-19">
              생년월일,성별 정보는 팔로우/팔로워에게 제공됩니다.
            </div>

            <div className="marketing-check">
              <img className="check"
                alt="Check"
                src="/img/MyPage/UserInfoMyPage/check.svg" />
              <div className="text-wrapper-20">
                마케팅 정보 수신에 동의합니다.
              </div>
            </div>

            <div className="consent-to-receiving">

              <div className="consent-item">
                <input type="checkbox" className="checkbox-2" />
                <div className="text-wrapper-22">SMS 수신동의</div>
              </div>

              <div className="consent-item">
                <input type="checkbox" className="checkbox-3" />
                <div className="text-wrapper-23">E-MAIL 수신동의</div>
              </div>

            </div>

            <p className="coin1">
              COIN 구매정보는 수신 동의 여부와 관계없이 발송됩니다.
            </p>
            <br />
            <p className="coin2">
              미동의 시 이벤트 혜택을 받으실 수 없습니다.
            </p>
          </div> {/* additional-info */}

          <div className="cancel" onClick={profileCancel}>
            <div className="text-wrapper-14">취소</div>
          </div>

          <div className="save" onClick={profileSave}>
            <div className="text-wrapper-13">수정 완료</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
