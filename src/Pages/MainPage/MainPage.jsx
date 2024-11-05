import React from 'react';
import { Grid, Typography, Paper, Avatar } from '@mui/material';

import MainHeader from '../Header/MainHeader';
import Footer from '../Foorter/Footer';
import RollingBanner from './RollingBanner';
import TeamSection from './TeamSection';

import '../../ui/MainPage/MainPage.css';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {

    const navigate = useNavigate();

    return (
        <div>
            <MainHeader />

            <Grid container spacing={4} padding={8} className='MainPage' >

                {/* Section 1: 3개의 카드 영역 */}
                <Grid container spacing={2} className="main-cards">
                    <Grid item xs={12} md={4}>
                        <Paper className="card" style={{ backgroundColor: '#8FD694' }}>
                            <Typography variant="h6" className="card-title">내가 찾은 핀, 나만의 맛집 지도</Typography>
                            <Typography variant="body2" className="card-description">
                                내가 찾은 최고의 맛집들을 지도로 한눈에 확인하세요.
                                힘들 찾아 나만의 맛집 지도를 만들어 보세요!
                            </Typography>
                            <img className="main-map" alt="Map" src="/img/MainPageImg/map.png" />
                            <Typography className="card-link"
                                onClick={() => navigate('/amadda/findRes')}>
                                맛집 찾기 →
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className="card" style={{ backgroundColor: '#F67A7B' }}>
                            <Typography variant="h6" className="card-title">오늘의 기분에 딱 맞는 추천 맛집</Typography>
                            <Typography variant="body2" className="card-description">
                                날씨, 기분, 주변 상황에 추천되는 특별한 맛집!
                                지금 내 상황에 맞는 최고의 맛집을 찾아보세요.
                            </Typography>
                            <img className="main-box" alt="Box" src="/img/MainPageImg/box.png" />
                            <Typography className="card-link"
                                onClick={() => navigate('/amadda/bestRes')} >
                                맛집 보러가기 →
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className="card" style={{ backgroundColor: '#B9A1A1' }}>
                            <Typography variant="h6" className="card-title">나만의 맛집 일기, 특별한 순간을 기록하다</Typography>
                            <Typography variant="body2" className="card-description">
                                지도에 남은 공간 나만의 맛집 일기로 일상적으로 작성하세요.<br />
                                맛집에서 느낀 감정과 추억을 소중하게 기록할 수 있습니다.
                            </Typography>
                            <img className="main-note" alt="Note" src="/img/MainPageImg/notes.png" />
                            <Typography className="card-link"
                                onClick={() => navigate('/amadda/postWrite')}>
                                일기 작성하기 →
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Section 2: 배너 영역 */}
                    <Grid item xs={12} className="banner-container">
                        <Paper className="banner-background">
                            <Typography variant="h5" className="banner-title">맞춤형 맛집 추천</Typography>
                            <Typography variant="body1" className="banner-description">
                                지금 당신에게 딱 맞는 맛집 추천! 서울시에서 제공하는 추천 정보를 바탕으로 지금 당신에게 가장 어울리는 특별한 맛집 일기를 만나보세요.
                                맞춤형 게시글로 새로운 맛집을 발견해보세요!
                            </Typography>
                            <RollingBanner />
                        </Paper>
                    </Grid>

                    {/* Section 3: AMADDA Technology */}
                    <Grid item xs={12}>
                        <Paper className="technology-section">
                            <Typography variant="h5" className="technology-title">AMADDA Technology</Typography>
                            <Typography variant="body2" className="technology-description">
                                이곳만의 창의적인 기능들로 당신의 맛집 일기 생활을 더 풍성하게 꾸며보세요.
                            </Typography>

                            <Grid container spacing={2} marginTop={1}>
                                <Grid item xs={12} md={6}>
                                    <Paper className="feature-box" style={{ backgroundColor: '#B08D68' }}>
                                        <Typography variant="body1" className="feature-text">
                                            AMADDA에서는 다양한 활동을 통해 <br /> 특별한 뱃지를 획득할 수 있습니다.
                                        </Typography>
                                        <Typography variant="body2" className="feature-link">뱃지 리스트 보러가기 →</Typography>
                                        <img className="feature-icon" alt="Badge Icon" src="/img/MainPageImg/badge.png" />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Paper className="feature-box" style={{ backgroundColor: '#8D8AA7' }}>
                                        <Typography variant="body1" className="feature-text">
                                            실제 방문한 맛집임을 증명! 더 신뢰받는 정보! <br />
                                            인증하고, 믿을 수 있는 리뷰를 작성해 보세요!
                                        </Typography>
                                        <Typography variant="body2" className="feature-link">양수증 인증을 통한 정정 →</Typography>
                                        <img className="feature-icon" alt="Review Icon" src="/img/MainPageImg/receipt.png" />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Section 4: 팀 소개 */}
                    <Grid item xs={12} className="team-section">
                        <Paper className="team-background">
                            <Typography variant="h5" className="team-title">
                                AMATTA TEAM
                            </Typography>
                            <TeamSection />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>

            <Footer />
        </div>
    );
};

export default MainPage;