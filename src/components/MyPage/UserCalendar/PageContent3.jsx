import { Grid, Button, Typography } from "@mui/material";
import "./PageContent3.css";
import { useState } from "react";
import api from "../../../api/axios";
import { format, subMonths } from "date-fns"; // date-fns import

const PageContent3 = () => {
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState("");
    const [userId, setUserId] = useState("1");

    const filterPostByPeriod = (monthsAgoStart, monthsAgoEnd) => {
        const now = new Date();
        const startDate = subMonths(now, monthsAgoStart);
        const endDate = subMonths(now, monthsAgoEnd);

        // 'YYYY-MM-DD' 형식으로 변환
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');

        // console.log(formattedStartDate);  // 예: "2024-08-11"
        // console.log(formattedEndDate);    // 예: "2023-11-01"

        // getData(formattedStartDate, formattedEndDate, userId);
        getData("2024-11-10", "2024-11-14", userId); // 3개월 전 날짜에서는 post가 없어서 임의로 넣음(테스트용)
    }

    const getData = async (startDate, endDate, userId) => {
        // console.log("유저 아이디 확인 : " + userId);

        try {
            const response = await api.get(`events/post`, {
                params: { startDate, endDate, userId }
            });
            // console.log(response.data);
            setFilteredPosts(response.data)
        } catch (err) {
            // console.log(err);
        }
    };

    const handleDateButtonClick = (period) => {
        setSelectedPeriod(period);
        if (period === "3개월 전") {
            filterPostByPeriod(3, 12); // 3개월 전 ~ 1년 전
        } else if (period === "1년 전") {
            filterPostByPeriod(12, 36); // 1년 전 ~ 3년 전
        } else {
            filterPostByPeriod(36, 120); // 3년 전 ~ 그 전까지
        }
    }

    return (
        <div>
            {/* 버튼 섹션 */}
            <Grid container className="year-btn-group">
                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant="contained" className="year-btn" onClick={() => handleDateButtonClick("3개월 전")}>
                            3개월 전
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" className="year-btn" onClick={() => handleDateButtonClick("1년 전")}>
                            1년 전
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" className="year-btn" onClick={() => handleDateButtonClick("3년 전")}>
                            3년 전
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            {/* 게시글 목록 */}
            <Grid container spacing={4} className="calendar-post-list">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <div className="calendar-post-item">
                                <Typography variant="body2" sx={{ fontFamily: "font-notosansKR-medium" }}>{post.postDate}</Typography>
                                <div className="calendar-post-image">
                                    {/* 첫 번째 이미지 렌더링 */}
                                    {post.foodImages && post.foodImages.length > 0 ? (
                                        <img src={post.foodImages[0].foodImageUrl} alt="Food" style={{ width: "80px", height: "80px", objectFit: "cover",  // 이미지가 박스를 넘지 않게 크기를 조정
                                            objectPosition: "center" }} />
                                    ) : (
                                        <Typography variant="body2" sx={{ fontFamily: "font-notosansKR-medium" }}>이미지가 없습니다.</Typography>
                                    )}
                                </div>
                                <Typography variant="h6" sx={{ fontFamily: "font-notosansKR-medium" }}>{post.description}</Typography>
                                <Typography variant="body1" sx={{ fontFamily: "font-notosansKR-medium" }}>{post.postTitle}</Typography>
                            </div>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" align="center" style={{ width: "100%", fontFamily: "font-notosansKR-medium", marginTop: "40px" }}>
                        {selectedPeriod}에 해당하는 게시글이 없습니다.
                    </Typography>
                )}
            </Grid>
        </div>
    )
};

export default PageContent3;
