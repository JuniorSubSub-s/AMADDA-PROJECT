import { Grid } from '@mui/material';
import React from "react";

import MainHeader from "../Header/MainHeader";

import "../../ui/SubscribePage/SubscribePage.css";


function SubscribePage() {
  return (
    <div>
      <MainHeader />
      <Grid container sx={{ minHeight: "80vh", width: "100%" }}>
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: 2,
          }}
        >
          <div className='aaa'>

          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: 2,
          }}
        >
          {/*전체 프레임 */}
          <div className="subscribe-background">
            {/*로고 컨테이너*/}
            <div class="subscribe-container">
              <div class="text-container">
                <img class="adadda-logo" src="/img/SubscribePage/20240930150805570-png-2x.png" alt="AMADDA 로고" />
                <div class="text-content">
                  <div class="amadda-amadda-text">AMADDA!</div>
                  <div class="amadda-premium-service-text">Premium Service</div>
                </div>
              </div>
            </div>

            {/*정기구독신청 타이틀 텍스트*/}
            <div className="request-title">&lt;아맛따&gt; 정기 구독 신청</div>

            {/*기능 설명칸 프레임 */}
            <div className="subscribe-feature-frame">
              <div class="subscribe-feature-list">
                <div class="subscribe-feature-item">
                  <img class="subscribe-feature-icon" alt="광고 제거" src="/img/SubscribePage/remove-book.png" />
                  <div class="subscribe-feature-text">
                    <strong>광고 제거</strong><br />
                    더 이상 귀찮은 광고 없이 깔끔한 환경에서 &lt;어맛따&gt;를 이용하세요.
                  </div>
                </div>

                <div class="subscribe-feature-item">
                  <img class="subscribe-feature-icon" alt="멤버십 구독 배지 제공" src="/img/SubscribePage/warranty.png" />
                  <div class="subscribe-feature-text">
                    <strong>멤버십 구독 배지 제공</strong><br />
                    구독자만을 위한 특별한 배지를 획득해서 자랑해보세요!
                  </div>
                </div>

                <div class="subscribe-feature-item">
                  <img class="subscribe-feature-icon" alt="일기장 글자 수 확장" src="/img/SubscribePage/abc.png" />
                  <div class="subscribe-feature-text">
                    <strong>일기장 글자 수 확장</strong><br />
                    일기장에 더 많은 글자를 쓸 수 있습니다. 당신의 멋진 경험을 길게, 세세하게 기록해보세요!
                  </div>
                </div>

                <div class="subscribe-feature-item">
                  <img class="subscribe-feature-icon" alt="AI 자동 일기 작성 기능" src="/img/SubscribePage/adobe-illustrator.png" />
                  <div class="subscribe-feature-text">
                    <strong>AI 자동 일기 작성 기능</strong><br />
                    키워드만 선택하면 AI가 자동으로 일기장을 글을 작성해 줍니다. 간편하게 멋진 경험을 기록할 수 있습니다.
                  </div>
                </div>

                <div class="subscribe-feature-item">
                  <img class="subscribe-feature-icon" alt="캘린더 기능" src="/img/SubscribePage/google-calendar.png" />
                  <div class="subscribe-feature-text">
                    <strong>캘린더 기능</strong><br />
                    방문을 계획하고 싶은 맛집을 캘린더에 추가해, 나만의 맛집 스케줄러를 만들어보세요!
                  </div>
                </div>
              </div>



            </div>
            {/*회원가입창 프레임*/}
            <div className="sign-up-frame">

              {/*회원가입 인풋폼*/}
              <div class="sign-up-input-form">
                <label for="name">이메일 주소<span class="required">*</span></label>
                <input type="text" className="user-info-input" required />
              </div>

              <div class="sign-up-input-form">
                <label for="name">이름</label>
                <input type="text" id="user-info-input" className="user-info-input" />
              </div>

              <div class="sign-up-input-form">
                <label for="name">연락처</label>
                <input type="text" id="name" className="user-info-input" />
              </div>

              <div class="sign-up-input-form">
                <label for="name">추천인 코드를 적어주세요</label>
                <input type="text" id="name" className="user-info-input" />
              </div>

              <div className="checkbox-frame">
                <div className="checkbox">
                  <input type="checkbox" className="checkbox-input" />
                  <div className="must-letter">(필수)</div>

                  <button className="provision-button">개인정보 수집 및 이용</button>

                  <div className="agree-letter">에 동의합니다.</div>
                </div>

                <div className="checkbox">
                  <input type="checkbox" className="checkbox-input" />
                  <div className="must-letter">(필수)</div>

                  <button className="provision-button">광고성 정보 수신</button>

                  <div className="agree-letter-2">에 동의합니다.</div>
                </div>
              </div>
              {/*구독하기 버튼*/}
              <button className="final-button">
                &lt;아맛따&gt; 정기 서비스 구독하기
              </button>
            </div>


          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            padding: 2,
          }}
        >
          <div className='vbb'>

          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SubscribePage;