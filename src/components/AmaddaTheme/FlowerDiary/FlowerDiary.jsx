import React from "react";
import "./FlowerStyle.css";

export const FlowerDiary = ({themeContentData}) => {
  return (
    <div className="flower-diary">
      <div className="flower-div">
        <div className="flower-top">
          <div className="flower-image-2" >
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
        </div>
        <div className="flower-bottom">
          <div className="flower-title-and-text">
            <div className="flower-text-wrapper2">{themeContentData.title}</div>

            <div className="flower-the-body">
              <p className="flower-text-wrapper">
                {themeContentData.content}
              </p>
            </div>
          </div>
        </div>

  
      </div>
    </div>
  );
};

export default FlowerDiary;
