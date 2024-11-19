import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import PostTravelMatzip from "../../components/DiaryViewPage/PostTravelMatzip/PostTravelMatzip";
import "../../ui/DiaryViewPage/MonthPickDiary.css";

function MonthPickDiary() {
    const navigate = useNavigate();

    const topics = [
        {
            title: "가을 낭만 가득한 국내 맛집 추천",
            description: "양평, 강릉, 경남 남해, 춘천",
            imgSrc: "/img/DiaryViewPageImg/fall.png",
            onClick: () => navigate("/amadda/bestRes/fall")
        },
        {
            title: "프로 맛집러라면 가성비를 따져",
            description: "국내 가성비 맛집이 한눈에",
            imgSrc: "/img/DiaryViewPageImg/save_money.png",
            onClick: () => navigate("/amadda/bestRes/saveMoney")
        },
        {
            title: "데이트는 여기서!",
            description: "분위기, 맛, 감성 3박자를 한눈에",
            imgSrc: "/img/DiaryViewPageImg/date.png",
            onClick: () => navigate("/amadda/bestRes/date")
        },
        {
            title: "제주가 온다",
            description: "제주 대표 맛집 다 모아봐",
            imgSrc: "/img/DiaryViewPageImg/jeju.png",
            onClick: () => navigate("/amadda/bestRes/jeju")
        },
        {
            title: "흑백요리사 셰프들의 맛",
            description: "넷플릭스 ‘먹을래요?’ 셰프의 기발한 메뉴 즐겨 봐요!",
            imgSrc: "/img/DiaryViewPageImg/netflix.png",
            onClick: () => navigate("/amadda/bestRes/netflix")
        },
        {
            title: "바람 솔솔~ 글램핑&캠핑",
            description: "프로 캠핑러의 맛있는 레시피를 담은 인기 캠핑!",
            imgSrc: "/img/DiaryViewPageImg/camping.png",
            onClick: () => navigate("/amadda/bestRes/camping")
        }
    ];


    return (
        <Box className="monthTopPick-container">
            <Grid container spacing={1} className="month-title-container">
                <Typography className="monthTopPick-title">이번달 베스트 <br /> TopPick 주제</Typography>
                <div className="monthTopPick-title-underbar" />
            </Grid>
            
            <Grid container spacing={2} className="travel-post-group" justifyContent="center">
                {topics.map((topic, index) => (
                    <Grid 
                        item 
                        key={index} 
                        onClick={topic.onClick} 
                        style={{ cursor: 'pointer' }}
                    >
                        <PostTravelMatzip imgsrc={topic.imgSrc} />
                        <Typography className="post-title">{topic.title}</Typography>
                        <Typography className="post-description">{topic.description}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default MonthPickDiary;
