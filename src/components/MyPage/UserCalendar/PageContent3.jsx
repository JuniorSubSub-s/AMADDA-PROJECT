import { Grid, Button, Typography } from "@mui/material";
import "./PageContent3.css";
import { useState } from "react";

const posts = [
    { id: 1, date: "2024-08-11", title: "Post Title", description: "할매 손칼국수" },
    { id: 2, date: "2024-07-14", title: "Post Title", description: "할매 손칼국수" },
    { id: 3, date: "2024-08-05", title: "Post Title", description: "할매 손칼국수" },
    { id: 4, date: "2024-07-01", title: "Post Title", description: "할매 손칼국수" },
    { id: 5, date: "2023-11-01", title: "Post Title", description: "할매 손칼국수" },
    { id: 6, date: "2023-10-08", title: "Post Title", description: "할매 손칼국수" },
];

const PageContent3 = () => {
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState("");

    const filterPostByPeriod = (monthsAgoStart, monthsAgoEnd) => {
        const now = new Date();
        const startDate = new Date();
        startDate.setMonth(now.getMonth() - monthsAgoStart);

        const endDate = new Date();
        endDate.setMonth(now.getMonth() - monthsAgoEnd);

        // 필터링된 게시글 데이터 설정
        const filtered = posts.filter((post) => {
            const postDate = new Date(post.date);
            return postDate >= endDate && postDate < startDate;
        });

        setFilteredPosts(filtered);
    }

    // 버튼 클릭 핸들러
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
                <Grid container
                    spacing={2}>
                    <Grid item>
                        <Button variant="contained"
                            className="year-btn"
                            onClick={() => handleDateButtonClick("3개월 전")}>
                            3개월 전
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained"
                            className="year-btn"
                            onClick={() => handleDateButtonClick("1년 전")}>
                            1년 전
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained"
                            className="year-btn"
                            onClick={() => handleDateButtonClick("3년 전")}>
                            3년 전
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            {/* 게시글 목록 */}
            <Grid container
                spacing={4}
                className="calendar-post-list">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <div className="calendar-post-item">
                                <Typography variant="body2" sx={{fontFamily: "font-notosansKR-medium"}}>{post.date}</Typography>
                                <div className="calendar-post-image" /> {/* 이미지 위치 */}
                                <Typography variant="h6" sx={{fontFamily: "font-notosansKR-medium"}}>{post.description}</Typography>
                                <Typography variant="body1" sx={{fontFamily: "font-notosansKR-medium"}}>{post.title}</Typography>
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