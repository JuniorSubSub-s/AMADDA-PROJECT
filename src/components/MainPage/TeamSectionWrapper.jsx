import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import TeamSection from './TeamSection';

const TeamSectionWrapper = () => {
    return (
        <Grid item xs={12} className="team-section">
            <Paper className="team-background">
                <Typography variant="h5" className="team-title">
                    AMADDA TEAM
                </Typography>
                <TeamSection />
            </Paper>
        </Grid>
    );
};

export default TeamSectionWrapper;