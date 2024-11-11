import PostTravelMatzip from "../../components/DiaryViewPage/PostTravelMatzip/PostTravelMatzip";
import { Grid, Box, Typography } from '@mui/material';
import "../../ui/DiaryViewPage/MonthPickDiary.css";

function MonthPickDiary() {
    return (
        <Box className="monthTopPick-container">
            <Grid container spacing={1} className="month-title-container">
                <Typography className="monthTopPick-title">이번달 베스트 <br /> TopPick 주제</Typography>
                <div className="monthTopPick-title-underbar" />
            </Grid>

            <Grid container spacing={2} className="travel-post-group" justifyContent="center">
                <Grid item>
                    <PostTravelMatzip
                        imgsrc="/img/DiaryViewPageImg/fall.png"
                        title="가을 낭만 가득한 맛집 추천"
                        subtitle="영주, 경주, 강릉, 남이섬, 춘천"
                    />
                </Grid>
                <Grid item>
                    <PostTravelMatzip
                        imgsrc="/img/DiaryViewPageImg/jeju.png"
                        title="제주도 맛집 투어"
                        subtitle="제주시, 서귀포시, 애월, 성산"
                    />
                </Grid>
                <Grid item>
                    <PostTravelMatzip
                        imgsrc="/img/DiaryViewPageImg/save_money.png"
                        title="가성비 맛집 추천"
                        subtitle="서울, 부산, 대구, 인천"
                    />
                </Grid>
                <Grid item>
                    <PostTravelMatzip
                        imgsrc="/img/DiaryViewPageImg/camping.png"
                        title="캠핑지 근처 맛집"
                        subtitle="강원도, 충청도, 전라도, 경상도"
                    />
                </Grid>
                <Grid item>
                    <PostTravelMatzip
                        imgsrc="/img/DiaryViewPageImg/date.png"
                        title="데이트에 딱 좋은 맛집"
                        subtitle="서울, 경기, 부산, 인천"
                    />
                </Grid>
                <Grid item>
                    <PostTravelMatzip
                        imgsrc="/img/DiaryViewPageImg/netflix.png"
                        title="넷플릭스 보면서 먹기 좋은 메뉴"
                        subtitle="치킨, 피자, 떡볶이, 디저트"
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default MonthPickDiary;
