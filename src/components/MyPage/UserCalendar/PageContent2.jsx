import { Grid } from "@mui/material";
import "./PageContent2.css";

const PageContent2 = () => {
    return (
        <div>
            
            {/* 캘린더 들어가야 하는 곳 */}
            <Grid   container 
                    direction="column" 
                    alignItems="center" 
                    className="calendarContent-frame">
                <Grid item xs={12} md={8} className="calendar-first">
                    <div /> {/* 캘린더 배치 */}
                </Grid>
            </Grid>

            
        </div>
    );
}

export default PageContent2;