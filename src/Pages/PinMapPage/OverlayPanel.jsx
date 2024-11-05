import React from "react";

import "../../ui/PinMapPage/OverlayPanel.css";

function OverlayPanel() {
    return (
        //탭패널 
        <div className="tabpanel">
          {/*도시명/랜드마크 프레임*/}
          <div className="city-landmark-frame">
            {/*라벨*/}
            <div className="city-landmark-label">도시명/랜드마크</div>
            {/*선택버튼*/}
            <div className="city-landmark-choice">도시명/랜드마크 선택</div>
          </div>
          {/*해쉬태그 프레임*/}
          <div className="hashtag-frame">
            {/*라벨*/}
            <div className="hashtag-label">해시태그</div>
            {/*해쉬태그 선택버튼*/}
            <div className="hashtag-choice">해시태그 선택</div>
          </div>


          {/*열람 비율 조절 프레임*/}
          <div className="read-frame">
            {/*열람 라벨*/}
            <div className="read-label">열람 비율 조절</div>
            {/*열람 비율 조절 버튼*/}
            <div className="read-control">열람 비율 조절</div>
          </div>

          {/*핀색 조절 프레임*/}
          <div className="pin-color-frame">
            {/*핀색 라벨*/}
            <div className="pin-color-label">Pin 색 조절</div>
            {/*핀색 컨트롤*/}
            <div className="pin-color-control">Pin 색 조절</div>
          </div>
          {/*검색 프레임*/}
          <div className="search-frame">
            {/*검색버튼 폰트*/}
            <div className="search-font">검색</div>
            {/*경계선*/}
            <div className="search-line" />
          </div>
          </div>
    )
}

export default OverlayPanel ;

