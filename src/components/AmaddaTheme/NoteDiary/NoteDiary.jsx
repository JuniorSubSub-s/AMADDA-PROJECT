import React from "react";
import "./NoteStyle.css";

export const NoteDiary = ( {themeContentData} ) => {
  return (
    <div className="note-diary">
      <div className="note-overlap-wrapper">
        <div className="note-overlap">

          <div className="note-top">
              <div className="note-tape" />

              <div className="note-image">
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

          <div className="note-bottom">
            <div className="note-title-and-text">
              <div className="note-title">
                <div className="note-text-wrapper">{themeContentData.title}</div>
              </div>

              <div className="note-the-body">
                <p className="note-div">
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

export default NoteDiary;
