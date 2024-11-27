import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import ListSection from "../ListSection";
import "./Section2Tang.css";

function Section2Tang({ data, todayWeather }) {
  const [loading, setLoading] = useState(true);

  // 테마에 따라 배너 정보를 정의
  const getBannerContent = () => {
    switch (todayWeather) {
      case "맑음":
        return {
          title: "FOCUS ON",
          subtitle: (
            <span>
              오늘처럼 맑은 날엔 <br />
              달콤한 디저트 어때요?  🍰🧁
            </span>
          ),
          image: "/img/DiaryByAPIPage/gimchijjige.png",
        };
      case "구름":
        return {
          title: "FOCUS ON",
          subtitle: (
            <span>
              오늘 같은 날, <br />
              몸 녹이는 <br />
              라면 한 그릇 어때요? 🍜
            </span>
          ),
          image: "/img/DiaryByAPIPage/cloudfood2.png",
        };
      case "비":
        return {
          title: "FOCUS ON",
          subtitle: (
            <span>
              쌀쌀한 저녁, 속까지 따뜻하게 데워줄 <br />
              뜨끈한 탕 한 그릇 어때요? 🍲
            </span>
          ),
          image: "/img/DiaryByAPIPage/gimchijjige.png",
        };
      case "눈":
        return {
          title: "FOCUS ON",
          subtitle: (
            <span>포근한 눈 오는 날, <br />달콤한 디저트 어때요? 🍓❄️</span>
          ),
          image: "/img/DiaryByAPIPage/strawberry.png",
        };
      default:
        return {
          title: "FOCUS ON",
          subtitle: "오늘은 어떤 음식을 드시고 싶으세요? 😊",
          image: "/img/DiaryByAPIPage/default.png",
        };
    }
  };

  // 배너 콘텐츠 가져오기
  const bannerContent = getBannerContent();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      <Container maxWidth={false} sx={{ width: "80%", margin: "0 auto", marginTop: "100px" }}>
        <Grid container spacing={2} justifyContent="center">
          {/* 배너 섹션 */}
          <Grid item xs={12} className="diaryAPI-banner-grid">
            <Card className="diaryAPI-banner-card">
              <CardMedia
                component="img"
                src={bannerContent.image}
                alt={bannerContent.title}
                className="diaryAPI-banner-image"
              />
              <CardContent className="diaryAPI-banner-content">
                <Typography variant="h6" className="diaryAPI-banner-title">
                  {bannerContent.title}
                </Typography>
                <Typography variant="body2" className="diaryAPI-banner-subtitle">
                  {bannerContent.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth={false} sx={{ width: "90%", margin: "0 auto", marginTop: "50px" }}>
        <Grid item xs={12} style={{ width: "100%" }}>
          {loading ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
            <ListSection data={data} />
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default Section2Tang;
