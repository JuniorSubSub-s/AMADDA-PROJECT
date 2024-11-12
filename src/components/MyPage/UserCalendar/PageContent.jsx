import { Grid, Button, Typography } from "@mui/material";
import "./PageContent.css";

const PageContent = () => {
    return (
        <div>
            {/* 나의 일정 입력하기 섹션 */}
<<<<<<< HEAD
            <Grid container alignItems="center" className="calendar-introduce-section">
=======
            <Grid container alignItems="center" className="calendar-introduce2">
>>>>>>> feature
                <Grid item>
                    <div className="calendar-frame">
                        <div className="calendar-text-wrapper">1</div>
                    </div>
                </Grid>

                <Grid item xs>
                    <div className="calendar-overlap-group">
                        <Typography variant="h6" className="calendar-div">나의 일정 입력하기</Typography>
                        <Typography variant="body2" className="calendar-p">
                            나의 캘린더에 일정을 추가하고 꾸며보세요
                        </Typography>
                    </div>
                </Grid>
            </Grid>

            <Grid container direction="column" alignItems="center" className="calendar-introduce">
                <Grid item xs={12} md={8} className="calendar-first">
                    <Grid container alignItems="center">
                    </Grid>
                    <div /> {/* 이미지 영역을 텍스트 아래에 배치 */}
                </Grid>
            </Grid>

            {/* 나의 맛집 기억 알림 */}
<<<<<<< HEAD
            <Grid container className="calendar-introduce-section">
=======
            <Grid container alignItems="center" className="calendar-introduce2">
>>>>>>> feature
                <Grid item>
                    <div className="calendar-frame">
                        <div className="calendar-text-wrapper">2</div>
                    </div>
                </Grid>

                <Grid item xs>
                    <div className="calendar-overlap-group">
                        <Typography variant="h6" className="calendar-div">나의 맛집 기억 알림</Typography>
                        <Typography variant="body2" className="calendar-p">
                            잊고 있었던 맛집 알림을 통해 새로운 추억을 만들어보세요
                        </Typography>
                    </div>
                </Grid>
            </Grid>

            <Grid container direction="column" alignItems="center" className="calendar-introduce">
                <Grid item xs={12} md={8} className="calendar-first">
                    <Grid container alignItems="center">
                    </Grid>
                    <div /> {/* 이미지 영역을 텍스트 아래에 배치 */}
                </Grid>
            </Grid>
        </div>
    );
}

export default PageContent;