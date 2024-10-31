import { Grid } from "@mui/material";
import React from "react";
import MainHeader from "../../Header/MainHeader";
import Introduce from "../../../components/MyPage/IntroduceComponent/IntroduceComponent";
import Posts from "../../../components/MyPage/PostComponent/PostComponent";
import UserHeader from "../../../components/UserHeader/UserHeader";
import "../../../ui/MyPage/MainMyPage/mypageStyle.css";

function MyPageMain() {
  return (
    /*마이페이지 메인페이지*/
    <div>
      {/*헤더*/}
      <MainHeader />
      <UserHeader />
      

      <div className="main">
        <Grid container sx={{ minHeight: "80vh", width: "100%" }}>
          
          <Grid
              item
              xs={12}
              md={0}
              lg={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff",
                padding: 2,
              }}
            >
            <div className="aaa">

            </div>
          </Grid>
          <Grid
              item
              xs={12}
              md={6}
              lg={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff",
                padding: 2,
              }}
              
            >
              {/*소개칸 */}
            <Introduce /> 
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
              padding: 2,
            }}
          >
            {/*게시물칸 */}
            <Posts />

          </Grid>
          <Grid
            item
            xs={12}
            md={0}
            lg={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
              padding: 2,
            }}
          >
            <div className="bbb">

          </div>

          </Grid>
        </Grid>

      </div>
    </div>
  );
};

export default MyPageMain;
