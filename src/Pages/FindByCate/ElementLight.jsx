import React, { useEffect, useRef } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";

import MainHeader from "../../Pages/Header/MainHeader";
import Footer from "../../Pages/Foorter/Footer";

import "./style.css";

export const ElementLight = () => {

  return (
    <div>
      <MainHeader />

      <Box className="element-light">
        <Grid container spacing={2}>
          <Grid item xs={12} className="cate-main">
            <Box className="cate-section">

              <video
                className="background-video"
                src="/img/FindByCateImg2/Rainy.mp4"
                autoPlay
                loop
              />

              <Typography className="the-best-way-to">
                <p className="weather-text">
                  오늘 날씨는 비가 오네요?<br />
                  이런 날씨에 딱 맞는 음식을 찾아볼까요?
                </p>
              </Typography>
            </Box>

            <Grid container className="overlap-wrapper">
              <Grid item xs={12} md={6}>
                <Typography variant="h1" className="strong-what-we-do">
                  What We Do
                </Typography>
                <Box className="container">
                  <Typography variant="h4" className="heading-UI-UX">
                    UI/UX
                  </Typography>
                  <Grid container spacing={2} className="list">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Grid item xs={6} md={4} key={index} className={`item-link-thumb-${index + 1}`} />
                    ))}
                  </Grid>
                  <Typography variant="h6" className="link-more">
                    more
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Box className="section-2">
              <Typography variant="h4" className="heading-media">
                Media
              </Typography>
              {[2, 3, 4].map((listIndex) => (
                <Grid container spacing={2} key={listIndex} className={`list-${listIndex}`}>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Grid item xs={3} key={index} className={`item-link-thumb-${index + listIndex * 8}`} />
                  ))}
                </Grid>
              ))}
              <Typography variant="h6" className="text-wrapper">
                more
              </Typography>
            </Box>
          </Grid>
        </Grid>


      </Box>

      <Footer />
    </div>
  );
};
