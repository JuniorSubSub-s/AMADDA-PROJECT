import React from "react";
import "./AlbumStyle.css";

export const AlbumDiary = ({themeContentData}) => {
  return (
    <div className="album-diary">
      <div className="album-overlap-group-wrapper">
        <div className="album-overlap-group">
          <div className="album-top">
            <div className="album-image">
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

            <div className="album-div">
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

            <div className="album-image-2" >
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
          </div>

          <div className="album-bottom">
            <div className="album-title-and-text">
              <div className="album-title">
                <div className="album-text-wrapper">{themeContentData.title}</div>
              </div>

              <div className="album-the-body">
                <p className="album-p">
                  {themeContentData.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDiary;
