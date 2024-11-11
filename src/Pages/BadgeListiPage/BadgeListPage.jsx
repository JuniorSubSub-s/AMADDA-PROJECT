import React, { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

import MainHeader from "../../Pages/Header/MainHeader";
import Footer from "../../Pages/Foorter/Footer";
import BadgeModal from "./BadgeModal";

import "../../ui/BadgeListPage/BadgeListPage.css";

const BadgeListPage = () => {
    const [selectedBadge, setSelectedBadge] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBadgeClick = (badge) => {
        setSelectedBadge(badge);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBadge(null);
    };

    const matKingbadgeImages = [
        {
            src: "/img/BadgeListPage/Badge/matKingBadge/올해의 맛잘알.svg",
            description: "이달의 미식일기 뱃지와 검증의 미식가 30회 뱃지를 포함하여 추가 뱃지 하나를 더 소지한 사용자에게 수여"
        },
        {
            src: "/img/BadgeListPage/Badge/matKingBadge/맛집 찾아 삼만리.svg",
            description: "맛집 여행 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여"
        },
        {
            src: "/img/BadgeListPage/Badge/matKingBadge/이달의 미식 일기장.svg",
            description: "AMADDA 사용자의 일기장이 월간 30회 이상 조회될 경우 수여"
        },
        {
            src: "/img/BadgeListPage/Badge/matKingBadge/뭘 좋아할지 몰라서 다 먹어봤어.svg",
            description: "다양한 카테고리 게시물을 총 25개 이상 포스팅한 AMADDA 사용자에게 부여"
        },
        {
            src: "/img/BadgeListPage/Badge/matKingBadge/맛잘알 시즌어탑터.svg",
            description: "계절을 대표하는 음식 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여"
        },
    ];

    const verificationImages = [
        {
            src: "/img/BadgeListPage/Badge/Verification/검증의 미식가 1.svg",
            description: "영수증 인증을 완료한 게시물을 10개 이상 게시한 AMADDA 사용자에게 부여"
        },
        {
            src: "/img/BadgeListPage/Badge/Verification/검증의 미식가 2.svg",
            description: "영수증 인증을 완료한 게시물을  20개 이상 게시한 AMADDA 사용자에게 부여"
        },
        {
            src: "/img/BadgeListPage/Badge/Verification/검증의 미식가 3.svg",
            description: "영수증 인증을 완료한 게시물을 30개 이상 게시한 AMADDA 사용자에게 부여"
        },
        {
            src: "/img/BadgeListPage/Badge/Verification/검증의 미식가 4.svg",
            description: "영수증 인증을 완료한 게시물을 40개 이상 게시한 AMADDA 사용자에게 부여"
        }
    ];

    const gourmetImages = [
        {
            src: "/img/BadgeListPage/Badge/gourmet/양식 미식가.svg",
            description: "양식 게시물을 각 25개 이상 포스팅한 AMADDA 사용자에게 부여"
        },
        {
            src: "/img/BadgeListPage/Badge/gourmet/일식 미식가.svg",
            description: "일식 게시물을 각 25개 이상 포스팅한 AMADDA 사용자에게 부여"
        },
        {
            src: "/img/BadgeListPage/Badge/gourmet/중식 미식가.svg",
            description: "중식 게시물을 각 25개 이상 포스팅한 AMADDA 사용자에게 부여"
        },
        {
            src: "/img/BadgeListPage/Badge/gourmet/한식 마스터.svg",
            description: "한식 카테고리 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여"
        },
        {
            src: "/img/BadgeListPage/Badge/gourmet/프로 혼밥러.svg",
            description: "혼밥 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여",
        },
        {
            src: "/img/BadgeListPage/Badge/gourmet/우리동네 커피 감별사.svg",
            description: "카페 및 커피 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여",
        },
        {
            src: "/img/BadgeListPage/Badge/gourmet/학교앞분식러.svg",
            description: "분식 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여",
        },
        {
            src: "/img/BadgeListPage/Badge/gourmet/크리스피크루.svg",
            description: "치킨 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여",
        },
        {
            src: "/img/BadgeListPage/Badge/gourmet/출출할 땐 디저트지.svg",
            description: "디저트 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여",
        }
    ];

    const honeyInfoImages = [
        {
            src: "/img/BadgeListPage/Badge/HoneyInfo/스마트 푸디.svg",
            description: "가성비 맛집 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여",
        },
        {
            src: "/img/BadgeListPage/Badge/HoneyInfo/다이어트는 365일.svg",
            description: "건강식 혹은 다이어트 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여",
        },
        {
            src: "/img/BadgeListPage/Badge/HoneyInfo/빠르게푸드.svg",
            description: "패스트푸드 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여",
        },
        {
            src: "/img/BadgeListPage/Badge/HoneyInfo/맛집은 사랑을 싣고.svg",
            description: "데이트 맛집 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여",
        },
        {
            src: "/img/BadgeListPage/Badge/HoneyInfo/찬바람 불면 생각나는.svg",
            description: "겨울음식 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여",
        },
        {
            src: "/img/BadgeListPage/Badge/HoneyInfo/단풍구경과 맛집기행.svg",
            description: "가을음식 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여",
        },
        {
            src: "/img/BadgeListPage/Badge/HoneyInfo/맛잘알 캠핑족.svg",
            description: "캠핑 맛집 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여",
        }
    ];

    const feelingImages = [
        {
            src: "/img/BadgeListPage/Badge/feeling/맛있어서 행보케.svg",
            description: "나의 감정을 사랑으로 설정한 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여",
        },
        {
            src: "/img/BadgeListPage/Badge/feeling/슬프지만 맛있었어.svg",
            description: "나의 감정을 스트레스로 설정한 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여",
        },
        {
            src: "/img/BadgeListPage/Badge/feeling/먹을 땐 기분조아.svg",
            description: "나의 감정을 행복으로 설정한 게시물을 25개 이상 포스팅한 AMADDA 사용자에게 부여",
        }
    ];


    return (
        <div>
            <MainHeader />

            <Container maxWidth="lg" className="badge-container">
                {/* 상단 배지 설명 영역 */}
                <Box className="badge-info-container">
                    <img
                        src="/img/BadgeListPage/Background/BadgeBackground.png"
                        alt="Badge Background"
                        className="badge-info-image"
                    />
                    <Box className="badge-info-text">
                        <Typography variant="h6" className="badge-title">
                            AMADDA 뱃지
                        </Typography>
                        <Typography variant="body1" className="badge-description">
                            뱃지를 모아서 맞잘알 구성원으로 등극해보세요!<br />
                            뱃지를 모아서 이벤트성 게시물의 주인공이 되어 보세요
                        </Typography>
                    </Box>
                </Box>

                {/* 배지 리스트 제목 */}
                <Typography variant="h5" className="badge-list-title">
                    AMADDA 뱃지 리스트
                </Typography>
                <hr />

                {/* 배지 카테고리 영역 */}
                <Grid container spacing={4} className="badge-grid">
                    {/* 각 카테고리 영역 */}
                    <Grid item xs={12} md={6} className="badge-category">
                        <Typography variant="h6" className="category-title">
                            내가 AMADDA 대표 맛잘알
                        </Typography>
                        <Box className="badge-list">
                            {matKingbadgeImages.map((badge, index) => (
                                <Box onClick={() => handleBadgeClick(badge)} sx={{ cursor: 'pointer' }}>
                                    <img src={badge.src} style={{ width: '120px', height: '120px' }} />
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6} className="badge-category">
                        <Typography variant="h6" className="category-title">
                            내 맛 정보는 검증된 거라고
                        </Typography>
                        <Box className="badge-list">
                            {verificationImages.map((badge, index) => (
                                <Box onClick={() => handleBadgeClick(badge)} sx={{ cursor: 'pointer' }}>
                                    <img src={badge.src} style={{ width: '120px', height: '120px' }} />
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6} className="badge-category">
                        <Typography variant="h6" className="category-title">
                            내가 이 분야에서 미식가야!
                        </Typography>
                        <Box className="badge-list">
                            {gourmetImages.map((badge, index) => (
                                <Box onClick={() => handleBadgeClick(badge)} sx={{ cursor: 'pointer' }}>
                                    <img src={badge.src} style={{ width: '120px', height: '120px' }} />
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6} className="badge-category">
                        <Typography variant="h6" className="category-title">
                            꿀정보 공짜로 드려요~
                        </Typography>
                        <Box className="badge-list">
                            {honeyInfoImages.map((badge, index) => (
                                <Box onClick={() => handleBadgeClick(badge)} sx={{ cursor: 'pointer' }}>
                                    <img src={badge.src} style={{ width: '120px', height: '120px' }} />
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12} className="badge-category">
                        <Typography variant="h6" className="category-title">
                            이 감정엔 역시 이 음식이야
                        </Typography>
                        <Box className="badge-list-feeling">
                            {feelingImages.map((badge, index) => (
                                <Box onClick={() => handleBadgeClick(badge)} sx={{ cursor: 'pointer' }}>
                                    <img src={badge.src} style={{ width: '120px', height: '120px' }} />
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>

                {selectedBadge && (
                    <BadgeModal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        badgeImage={selectedBadge.src}
                        badgeDescription={selectedBadge.description}
                    />
                )}
            </Container>

            <Footer />
        </div>
    );
};

export default BadgeListPage;
