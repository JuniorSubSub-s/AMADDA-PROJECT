import React from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MainHeader from '../Header/MainHeader';
import Footer from '../Foorter/Footer';
import RollingBanner from './RollingBanner';

import CardSection from '../../components/MainPage/CardSection';
import TechnologySection from '../../components/MainPage/TechnologySection';
import BannerSection from '../../components/MainPage/BannerSection';
import TeamSectionWrapper from '../../components/MainPage/TeamSectionWrapper';

import '../../ui/MainPage/MainPage.css';

const MainPage = () => {

    const navigate = useNavigate();

    const handleBadgeClick = () => {
        navigate("/amadda/badgeList");
    }

    return (
        <div>
            <MainHeader />

            <Grid container spacing={4} padding={8} className='MainPage' >
                <Grid container spacing={2} className="main-cards">

                    {/* Section 1: 3개의 카드 영역 */}
                    <CardSection />
                    {/* Section 2: 배너 영역 */}
                    <BannerSection
                        title="맞춤형 맛집 추천"
                        description="지금 당신에게 딱 맞는 맛집 추천! 서울시에서 제공하는 추천 정보를 바탕으로 지금 당신에게 가장 어울리는 특별한 맛집 일기를 만나보세요.
                                맞춤형 게시글로 새로운 맛집을 발견해보세요!"
                    >
                        <RollingBanner />
                    </BannerSection>
                    {/* Section 3: AMADDA Technology */}
                    <TechnologySection handleBadgeClick={handleBadgeClick} />
                    {/* Section 4: 팀 소개 */}
                    <TeamSectionWrapper />

                </Grid>
            </Grid>

            <Footer />
        </div>
    );
};

export default MainPage;