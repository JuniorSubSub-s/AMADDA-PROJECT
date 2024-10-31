import React from "react";
import "./style2.css";

export const Diary2 = () => {
  return (
    <div className="diary">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="bottom">
            <div className="title-and-text">
              <div className="title">
                <div className="text-wrapper">제목</div>
              </div>

              <div className="the-body">
                <p className="div">
                  오늘은 오랜만에 새로 생긴 작은 카페에 다녀왔다. 가게는
                  아담하고 아늑한 분위기로 꾸며져 있었고, 창문 너머로 보이는
                  가을 풍경이 너무 예뻤다. 메뉴에 있던 따뜻한 라떼와 함께
                  브라우니를 먹었는데, 달콤한 브라우니가 정말 맛있었다. 혼자
                  조용히 책을 읽으며 보내기 딱 좋은 시간이었다. 다음엔 친구들과
                  함께 와봐야겠다.
                </p>
              </div>
            </div>
          </div>

          <div className="top">
            <div className="overlap-group">
              <div className="tape" />

              <div className="image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
