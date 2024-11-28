import React, {useEffect} from "react";
import "./BasicStyle.css";

export const BasicDiary = ({themeContentData}) => {

    useEffect(() => {

        // console.log(themeContentData);
    }, []);

  return (
    <div className="basic-diary">
      <div className="basic-div">
        <div className="basic-top">
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

        <div className="basic-bottom">
          <div className="basic-title-and-text">
            <div className="basic-title">{themeContentData.title}</div>

            <div className="basic-the-body">
              <p className="basic-text-wrapper">
                {themeContentData.content}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BasicDiary;
