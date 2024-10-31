import React from "react";
import "./introduceStyle.css";

function IntroduceComponent() {
  return (
    /*소개, 사진, 친구칸 */
    <div className="introduce-photo-friend" >
      {/*소개칸 프레임*/}
      <div className="white-frame">
        {/*제목 공통 프레임*/}
        <div className="introduce-title">
          {/*제목 공통 폰트*/}
          <div className="title-font">소개</div>
        </div>
        {/*입력공간*/}
        <div className="text-field" />

        {/*상세정보수정 버튼*/}
        <button className="detail-update-button">
          <span className="detail-update-text">상세 정보 수정</span>
        </button>
      </div>
      {/*사진 프레임*/}
      <div className="white-frame">
        {/*제목 공통 프레임*/}
        <div className="title">
          {/*제목 공통 폰트*/}
          <div className="title-font">사진</div>

          {/*모두보기 버튼*/}
          <div className="view-all-button">사진 모두 보기</div>
        </div>
      </div>
      {/*친구칸 프레임*/}
      <div className="white-frame">
        {/*제목 공통 프레임*/}
        <div className="title">
          {/*제목 공통 폰트*/}
          <div className="title-font">친구</div>

          {/*모두보기 버튼*/}
          <div className="view-all-button">친구 모두 보기</div>
        </div>
      </div>
      {/*뱃지칸 프레임*/}
      <div className="white-frame">
        {/*제목 공통 프레임*/}
        <div className="title">
          {/*제목 공통 폰트*/}
          <div className="title-font">뱃지</div>

          {/*모두보기 버튼*/}
          <div className="view-all-button">뱃지 모두 보기</div>
        </div>
      </div>
    </div>
  )
}

export default IntroduceComponent;

