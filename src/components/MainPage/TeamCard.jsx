import React from 'react';
import { Grid, Typography, Paper, Avatar } from '@mui/material';
import './TeamCard.css';

const TeamCard = ({ role, name, age, specs = [], image }) => {
    return (
        <Paper className="team-card-container">
            {/* 상단: 역할 */}
            <div className="team-card-header">
                <Typography variant="subtitle1" className="role-text">
                    {role}
                </Typography>
                <Typography variant="h6" className="role-title">
                    {name}
                </Typography>
            </div>

            {/* 카드 본문 */}
            <Grid container className="team-card-body">
                {/* 좌측: 사진과 개인정보 */}
                <Grid item xs={5} className="team-user-info">
                    <Avatar src={image} alt={name} className="team-card-avatar" />
                    <Typography variant="body2" className="team-user-age">
                        나이: {age}
                    </Typography>
                </Grid>

                {/* 우측: 기술 스펙 */}
                <Grid item xs={7} className="specs-info">
                    {specs.map((spec, index) => (
                        <div key={index} className="spec-item">
                            <Typography variant="body2" className="spec-title">
                                {spec.title}
                            </Typography>
                            <Typography variant="body2" className="spec-content">
                                {spec.content}
                            </Typography>
                        </div>
                    ))}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TeamCard;