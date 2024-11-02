import { Grid } from "@mui/material";
import React from "react";

import Introduce from "../../../components/MyPage/IntroduceComponent/IntroduceComponent";
import Posts from "../../../components/MyPage/PostComponent/PostComponent";
import UserProfile from "../../../components/MyPage/ProfileComponent/UserProfile";

import MainHeader from "../../Header/MainHeader";

function MyPageMain() {
  return (
    /*마이페이지 메인페이지*/
    <div>
      {/*헤더*/}
      <MainHeader />
      <UserProfile />

      <div className="post-main">
        <Grid container sx={{ minHeight: "80vh", width: "100%" }}>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              padding: 2,
            }}>

            {/*소개칸 */}
            <Introduce />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            lg={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
              padding: 2,
            }}>

            {/*게시물칸 */}
            <Posts />

          </Grid>
        </Grid>

      </div>
    </div>
  );
};

export default MyPageMain;
