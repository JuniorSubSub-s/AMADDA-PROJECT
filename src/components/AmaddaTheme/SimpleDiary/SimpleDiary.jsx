import React from "react";
import "./SimpleStyle.css";

export const SimpleDiary = ( {themeContentData} ) => {
  return (
    <div className="simple-diary">
      <div className="simple-div">
        <div className="simple-image">
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

        <div className="simple-image-2">
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

        <div className="simple-overlap-group">
          <div className="simple-image-3">
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

          <div className="simple-bottom">
            <div className="simple-title-and-text">
              <div className="simple-text-wrapper">{themeContentData.title}</div>

              <div className="simple-the-body">
                {themeContentData.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDiary;
