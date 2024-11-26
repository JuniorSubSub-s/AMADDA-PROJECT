import React, { useEffect, useState } from 'react';
import { Button, Divider, Grid } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import PaletteIcon from '@mui/icons-material/Palette';

import ThemeMainModal from "../../components/PostWritePageModal/ThemeSelectModal/ThemeMainModal";
import PreviewModal from '../../components/PostWritePageModal/PreviewModal/PreviewModal';

import '../../ui/PostWritePage/PostWriteFooter.css';

import PostSaveModal from '../../components/PostWritePageModal/PostSaveModal/PostSaveModal';

function PostWriteFooter({ themeId, onThemeSelect, themeContentData, postData }) {

    const [currentTime, setCurrentTime] = useState('');
    const [isSaving, setIsSaving] = useState(true);
    const [tempSaveCnt, setTempSaveCnt] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
    const [openThemeModal, setOpenThemeModal] = useState(false);
    const [openPreviewModal, setOpenPreviewModal] = useState(false);
    const [openPostSaveModal, setOpenPostSaveModal] = useState(false);

    // 테마 선택 모달
    const handleOpenThemeModal = () => setOpenThemeModal(true);
    const handleCloseThemeModal = () => setOpenThemeModal(false);

    // 미리보기 모달
    const handleOpenPreviewModal = () => {
        if (
            themeContentData?.previewImages?.length > 0 &&
            themeContentData?.title?.length > 0 &&
            themeContentData?.content?.length > 0
        ) {
            setOpenPreviewModal(true);
        } else {
            setAlertMessage("일기를 완성한 후 미리보기가 가능합니다.");
            setTimeout(() => setAlertMessage(''), 3000);
        }
    };

    const handleClosePreviewModal = () => setOpenPreviewModal(false);

    // 게시물 저장 모달
    const handleOpenPostSaveModal = () => {
        const isComplete = 
        postData.restaurantAddress?.length > 0 &&
        postData.restaurantName?.length > 0 &&
        postData. restaurantLatitude !== undefined &&
        postData.restaurantLongitude !== undefined &&
        postData.selectedData.category?.length > 0 && // 예시: selectedData 내부 구조에 따라 조건 수정
        postData.selectedData.weather?.length > 0 &&
        postData.selectedData.mood?.length > 0 &&
        postData.title?.length > 0 &&
        postData.plainTextContent?.length > 0 &&
        postData.receiptVerificationValue !== undefined && // 유효성 검사
        postData.images?.length > 0;

    if (isComplete) {
        setOpenPostSaveModal(true);
    } else {
        setAlertMessage("일기를 완성한 후 저장이 가능합니다.");
        setTimeout(() => setAlertMessage(''), 3000);
    }
    };

    const handleClosePostSaveModal = () => setOpenPostSaveModal(false);

    const handleTempSave = () => {
        setTempSaveCnt((prevCnt) => prevCnt + 1);
        setAlertMessage(`${currentTime} 작성 중인 글을 저장했습니다`);
        setTimeout(() => setAlertMessage(''), 2000);
    };

    useEffect(() => {

        const formatTime = (date) =>
            date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        setCurrentTime(formatTime(new Date()));

        const timeInterval = setInterval(() => {
            setCurrentTime(formatTime(new Date()));
        }, 1000);

        const saveInterval = setInterval(() => {
            setIsSaving((prev) => !prev);
        }, 10000);

        return () => {
            clearInterval(timeInterval);
            clearInterval(saveInterval);
        };

    }, []);

    return (
        <div className="footer-container">
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={12} md={6} className="left-button-group" container alignItems="center" justifyContent="flex-start">
                    <Button
                        onClick={handleOpenPreviewModal}
                        startIcon={<ComputerIcon />}
                        sx={{ fontSize: '15px', color: '#333', fontFamily: "font-notosansKR-medium" }}
                    >
                        미리보기
                    </Button>
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                    <Button
                        onClick={handleOpenThemeModal}
                        startIcon={<PaletteIcon />}
                        sx={{ fontSize: '15px', color: '#333', fontFamily: "font-notosansKR-medium" }}
                    >
                        테마선택
                    </Button>
                </Grid>

                {alertMessage && <div className="custom-alert">{alertMessage}</div>}

                <Grid item xs={12} md={6} className="right-button-group" container alignItems="center" justifyContent="flex-end">
                    <span className="auto-save-text">
                        {isSaving ? "자동 저장 중" : "자동 저장 완료"} {currentTime}
                    </span>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleTempSave}
                        sx={{
                            borderRadius: '18px',
                            padding: '5px 15px',
                            marginRight: '10px',
                            fontSize: '15px',
                            fontFamily: "font-notosansKR-medium"
                        }}
                    >
                        임시저장 <span style={{ marginLeft: '5px', color: '#ff4d4f' }}>{tempSaveCnt}</span>
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenPostSaveModal}
                        sx={{
                            backgroundColor: '#000',
                            borderRadius: '18px',
                            padding: '5px 20px',
                            fontSize: '15px',
                            fontFamily: "font-notosansKR-medium",
                            width: '100px',
                        }}
                    >
                        완료
                    </Button>
                </Grid>
            </Grid>

            <ThemeMainModal
                open={openThemeModal}
                handleClose={handleCloseThemeModal}
                themeId={themeId}
                onThemeSelect={onThemeSelect}
                themeContentData={themeContentData}
            />

            <PreviewModal
                open={openPreviewModal}
                handleClose={handleClosePreviewModal}
                themeId={themeId}
                themeContentData={themeContentData}
            />

            <PostSaveModal
                open={openPostSaveModal}
                themeContentData={themeContentData}
                postData={postData}
                />
        </div>
    );
}

export default PostWriteFooter;
