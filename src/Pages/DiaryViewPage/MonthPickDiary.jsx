import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import PostTravelMatzip from "../../components/DiaryViewPage/PostTravelMatzip/PostTravelMatzip";
import "../../ui/DiaryViewPage/MonthPickDiary.css";

function MonthPickDiary() {
    const navigate = useNavigate();

    const handleDatePageClick = () => {
        navigate("/amadda/bestRes/date");
    };

    const handleNetflixPageClick = () => {
        navigate("/amadda/bestRes/netflix");
    };

    const handleJejuPageClick = () => {
        navigate("/amadda/bestRes/jeju");
    };

    const handleSaveMoneyPageClick = () => {
        navigate("/amadda/bestRes/saveMoney");
    };

    const handleFallPageClick = () => {
        navigate("/amadda/bestRes/fall");
    };

    const handleCampingPageClick = () => {
        navigate("/amadda/bestRes/camping");
    };


    return (
        <Box className="monthTopPick-container">
            <Grid container spacing={1} className="month-title-container">
                <Typography className="monthTopPick-title">이번달 베스트 <br /> TopPick 주제</Typography>
                <div className="monthTopPick-title-underbar" />
            </Grid>
            
            <Grid   container 
                    spacing={2} 
                    className="travel-post-group" 
                    justifyContent="center">
                <Grid item onClick={handleFallPageClick} style={{ cursor: 'pointer' }}><PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/17.png"} /></Grid>
                <Grid item onClick={handleJejuPageClick} style={{ cursor: 'pointer' }}><PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/18.png"} /></Grid>
                <Grid item onClick={handleSaveMoneyPageClick} style={{ cursor: 'pointer' }}><PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/19.png"} /></Grid>
                <Grid item onClick={handleCampingPageClick} style={{ cursor: 'pointer' }}><PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/20.png"} /></Grid>
                <Grid item onClick={handleDatePageClick} style={{ cursor: 'pointer' }}><PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/21.png"} /></Grid>
                <Grid item onClick={handleNetflixPageClick} style={{ cursor: 'pointer' }}><PostTravelMatzip imgsrc={"/img/DiaryViewPageImg/22.png"} /></Grid>
            </Grid>
        </Box>
    );
}

export default MonthPickDiary;
