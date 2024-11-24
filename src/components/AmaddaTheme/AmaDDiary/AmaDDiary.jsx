import React from "react";
import "./AmaDDiaryStyle.css";

export const AmaDDiary = ({themeContentData}) => {
  return (
    <div className="amadda-diary">
      <div className="amadda-div">
        <div className="amadda-top">
          <div className="amadda-overlap-group">
            <div className="amadda-image">
              <img
                src={themeContentData.previewImages[0]} // 이미지 경로
                alt="User Post Img"
                style={{
                    width: '100%',  // Box 너비에 맞춤
                    height: '100%', // Box 높이에 맞춤
                    objectFit: 'cover', // 크롭하며 비율 유지
                }}
              />
            </div>

            <div className="amadda-image-2">
              <img
                src={themeContentData.previewImages[1]} // 이미지 경로
                alt="User Post Img"
                style={{
                    width: '100%',  // Box 너비에 맞춤
                    height: '100%', // Box 높이에 맞춤
                    objectFit: 'cover', // 크롭하며 비율 유지
                }}
              />
            </div>

            <div className="amadda-image-3" >
              <img
                src={themeContentData.previewImages[2]} // 이미지 경로
                alt="User Post Img"
                style={{
                    width: '100%',  // Box 너비에 맞춤
                    height: '100%', // Box 높이에 맞춤
                    objectFit: 'cover', // 크롭하며 비율 유지
                }}
              />
            </div>

            <div className="amadda-image-4" >
              <img
                src={themeContentData.previewImages[3]} // 이미지 경로
                alt="User Post Img"
                style={{
                    width: '100%',  // Box 너비에 맞춤
                    height: '100%', // Box 높이에 맞춤
                    objectFit: 'cover', // 크롭하며 비율 유지
                }}
              />
            </div>

          </div>
          <div className="amadda-logo" />
        </div>

        <div className="amadda-bottom">
          <div className="amadda-title-and-text">

            <div className="amadda-title">
              {themeContentData.title}
            </div>

            <div className="amadda-the-body">
              {themeContentData.content}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default AmaDDiary;
