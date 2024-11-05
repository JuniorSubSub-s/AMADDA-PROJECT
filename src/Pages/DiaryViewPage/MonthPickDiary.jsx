import PostTravelMatzip from "../../components/DiaryViewPage/PostTravelMatzip/PostTravelMatzip";
import { Grid, Box, Typography } from '@mui/material';
import "../../ui/DiaryViewPage/MonthPickDiary.css";

function MonthPickDiary() {
    return (
        <Box className="monthTopPick-container">

            <Grid container spacing={1} className="month-title-container">
                <Typography className="monthTopPick-title">이번달 베스트 <br/> TopPick 주제</Typography>
                <div className="monthTopPick-title-underbar" />
            </Grid>
            
            <Grid   container 
                    spacing={2} 
                    className="travel-post-group" 
                    justifyContent="center">
                <Grid item><PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/17.png"} /></Grid>
                <Grid item><PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/18.png"} /></Grid>
                <Grid item><PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/19.png"} /></Grid>
                <Grid item><PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/20.png"} /></Grid>
                <Grid item><PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/21.png"} /></Grid>
                <Grid item><PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/22.png"} /></Grid>
            </Grid>
        </Box>
    );
}

export default MonthPickDiary;