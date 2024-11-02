import React, { useEffect, useState } from "react";

import "../../ui/MainPage/Banner.css";
import "../../ui/MainPage/MainPage.css";
import { useNavigate } from "react-router-dom";

function RollingBanner() {

  const navigate = useNavigate();

  useEffect(() => {
    const roller = document.querySelector(".rolling-list");
    if (roller) {
      roller.id = "roller1";

      const clone = roller.cloneNode(true);
      clone.id = "roller2";
      document.querySelector(".wrap").appendChild(clone);

      document.querySelector("#roller1").style.left = "0px";
      document.querySelector("#roller2").style.left = `${document.querySelector(".rolling-list ul").offsetWidth
        }px`;

      roller.classList.add("original");
      clone.classList.add("clone");
    }
  }, []);

  const teamImages = [
    {
      id: 1,
      text: "MZ세대 픽! 맛집 게시글",
      heading: "MZ 저격 맛집",
      imgSrc: "/img/MainPageImg/lettering-new-text.png",
      backgroundColor: "#7426ed",
      imgWidth: "200px",
      imgHeight: "200px",
      imgMarginTop: "0px",
      imgMarginRight: "0px",
      imgMarginLeft: "100px",
      imgMarginBottom: "100px",
    },
    {
      id: 2,
      text: "날씨에 맞는 맛집 게시글",
      heading: "날씨따라 맛따라",
      imgSrc: "/img/MainPageImg/healthy-food-online-shopping.png",
      backgroundColor: "#FBB938",
      imgWidth: "170px",
      imgHeight: "170px",
      imgMarginTop: "0px",
      imgMarginRight: "0px",
      imgMarginLeft: "150px",
      imgMarginBottom: "100px",
    },
    {
      id: 3,
      text: "혼밥하기 좋은 맛집 게시글",
      heading: "혼자서도 맛있게",
      imgSrc: "/img/MainPageImg/vegetarian-food.png",
      backgroundColor: "#5CBC62",
      imgWidth: "160px",
      imgHeight: "190px",
      imgMarginTop: "5px",
      imgMarginRight: "0px",
      imgMarginLeft: "150px",
      imgMarginBottom: "40px",
    },
    {
      id: 4,
      text: "데이트 맛집 게시글",
      heading: "솔로들은 나가있어",
      imgSrc: "/img/MainPageImg/woman-and-man-dining-at-restaurant.png",
      backgroundColor: "#326AF3",
      imgWidth: "200px",
      imgHeight: "190px",
      imgMarginTop: "0px",
      imgMarginRight: "0px",
      imgMarginLeft: "120px",
      imgMarginBottom: "40px",
      onClick: () => navigate("/amadda/bestRes/date"),
    },
    {
      id: 5,
      text: "흑백 요리사 쉐프들!",
      heading: "흑백요리사 맛봤어?",
      imgSrc: "/img/MainPageImg/netflix-logo.png",
      backgroundColor: "#232323",
      imgWidth: "190px",
      imgHeight: "190px",
      imgMarginTop: "0px",
      imgMarginRight: "0px",
      imgMarginLeft: "140px",
      imgMarginBottom: "10px",
      onClick: () => navigate("/amadda/bestRes/netflix"),
    },
  ];

  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);

  return (
    <div className="MainRolling-wrap">
      {/* rolling-list 클래스가 있는 요소 추가 */}
      <div className="MainRolling-wrapper"
        style={{ marginTop: "250px" }}
      >
        <div className="MainRolling-slide-container">
          <ul
            className="slide_wrapper"
            onMouseEnter={onStop}
            onMouseLeave={onRun}
          >
            <div className={"slide original" + (animate ? "" : " stop")}>
              {teamImages.map((data) => (
                <li key={data.id}>
                  <div
                    onClick={data.onClick}
                    style={{
                      width: "340px",
                      height: "250px",
                      margin: "10px",
                      top: "345px",
                      backgroundColor: data.backgroundColor,
                      borderRadius: "24px",
                      transition: "transform 0.3s",
                    }}
                  >
                    <p style={{
                      color: "white",
                      paddingLeft: "20px",
                      transform: "none",
                      fontFamily: "'font-nanumSquare-bold', sans-serif",
                      fontSize: "20px"
                    }}>
                      {data.text}
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        paddingLeft: "20px",
                        marginTop: "-10px",
                        transform: "none",
                        fontFamily: "'font-notosansKR-extraLight', sans-serif",
                      }}
                    >
                      {data.heading}
                    </p>
                    <img
                      src={data.imgSrc}
                      style={{
                        width: data.imgWidth,
                        height: data.imgHeight,
                        marginTop: data.imgMarginTop,
                        marginRight: data.imgMarginRight,
                        marginBottom: data.imgMarginBottom,
                        marginLeft: data.imgMarginLeft,
                        display: "block",
                        position: "relative",
                        top: "-30px",
                        transform: "none",
                      }}
                    />
                  </div>
                </li>
              ))}
            </div>
            <div className={"slide clone" + (animate ? "" : " stop")}>
              {teamImages.map((data) => (
                <li key={data.id}>
                  <div
                    style={{
                      width: "340px",
                      height: "250px",
                      margin: "10px",
                      top: "345px",
                      margin: "10px",
                      backgroundColor: data.backgroundColor,
                      borderRadius: "24px",
                    }}
                  >
                    <p style={{
                      color: "white",
                      paddingLeft: "20px",
                      fontFamily: "'font-nanumSquare-bold', sans-serif",
                      fontSize: "20px"
                    }}>
                      {data.text}
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        paddingLeft: "20px",
                        marginTop: "-10px",
                        fontFamily: "'font-notosansKR-extraLight', sans-serif",
                      }}>
                      {data.heading}
                    </p>
                    <img
                      src={data.imgSrc}
                      style={{
                        width: data.imgWidth,
                        height: data.imgHeight,
                        marginTop: data.imgMarginTop,
                        marginRight: data.imgMarginRight,
                        marginBottom: data.imgMarginBottom,
                        marginLeft: data.imgMarginLeft,
                        display: "block",
                        position: "relative",
                        top: "-30px",
                      }}
                    />
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RollingBanner;
