import { Grid, Button, Typography } from "@mui/material";
import "./PageContent.css";

const PageContent = () => {
    return (
        <div>
            {/* 나의 일정 입력하기 섹션 */}
            <Grid container alignItems="center" className="calendar-introduce2">
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

            <Grid container direction="column" justifyContent="center" className="calendar-image-section">
                <Grid item>
                    <img
                        src="/img/CalendarImg/Top1.png"
                        alt="캘린더 상단 이미지 1"
                        className="calendar-image-top"
                    />
                </Grid>
                <Grid item>
                    <img
                        src="/img/CalendarImg/Top2.png"
                        alt="캘린더 상단 이미지 2"
                        className="calendar-image-top"
                    />
                </Grid>
            </Grid>

            {/* 나의 맛집 기억 알림 */}
            <Grid container alignItems="center" className="calendar-introduce2">
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

            <Grid container justifyContent="center" className="calendar-image-section">
                <Grid item>
                    <img
                        src="/img/CalendarImg/Botton1.png"
                        alt="캘린더 하단 이미지"
                        className="calendar-image-bottom"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default PageContent;