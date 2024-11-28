import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

const BannerSection = ({ title, description, children }) => {
    return (
        <Grid item xs={12} className="banner-container">
            <Paper className="banner-background">
                <Typography variant="h5" className="banner-title">
                    {title}
                </Typography>
                <Typography variant="body1" className="banner-description">
                    {description}
                </Typography>
                {children}
            </Paper>
        </Grid>
    );
};

export default BannerSection;
