// PostWriteFooter.jsx
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ComputerIcon from '@mui/icons-material/Computer';
import PaletteIcon from '@mui/icons-material/Palette';

import ThemeMainModal from "../../components/PostWritePageModal/ThemeSelectModal/ThemeMainModal";

import '../../ui/PostWritePage/PostWriteFooter.css';

function PostWriteFooter() {
    const [currentTime, setCurrentTime] = useState('');
    const [isSaving, setIsSaving] = useState(true);
    const [tempSaveCnt, setTempSaveCnt] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
    // 테마 모달
    const [openThemeModal, setOpenThemeModal] = useState(false);

    // 테마 모달 열기/닫기 핸들러
    const handleOpenThemeModal = () => setOpenThemeModal(true);
    const handleCloseThemeModal = () => setOpenThemeModal(false);

    useEffect(() => {
        // 현재 시간을 포맷하는 함수
        const formatTime = (date) => {
            return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        };

        // 진입 시점의 현재 시간을 설정
        setCurrentTime(formatTime(new Date()));

        // 1초마다 시간을 업데이트하는 타이머
        const timeInterval = setInterval(() => {
            setCurrentTime(formatTime(new Date()));
        }, 1000);

        // 10초마다 isSaving 상태를 전환
        const saveInterval = setInterval(() => {
            setIsSaving((prev) => !prev);
        },10000);

        // 컴포넌트 언마운트 시 타이머 정리
        return () => {
            clearInterval(timeInterval);
        };
    }, []);

    // 임시저장 버튼 클릭 핸들러
    const handleTempSave = () => {
        setTempSaveCnt((prevCnt) => prevCnt + 1);

        // 현재 시간과 함께 알림 메시지 설정
        setAlertMessage(`${currentTime} 작성 중인 글을 저장했습니다`);

        // 2초 후 알림 메시지 삭제
        setTimeout(() => {
            setAlertMessage('');
        }, 2000);
    };

    return (
        <div className="footer-container">
            {/* 좌측 아이콘 버튼 그룹 */}
            <div className="left-button-group">
                <Button
                    startIcon={<ComputerIcon />}
                    sx={{ fontSize: '15px', color: '#333' }}
                >
                    미리보기
                </Button>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                <Button
                    onClick={handleOpenThemeModal}
                    startIcon={<PaletteIcon/>}
                    sx={{ fontSize: '15px', color: '#333' }}
                >
                    테마선택
                </Button>
            </div>

            {/* 알림 메시지 팝업 */}
            {alertMessage && (
                <div className="custom-alert">
                    {alertMessage}
                </div>
            )}

            {/* 우측 저장 및 완료 버튼 */}
            <div className="right-button-group">

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
                    }}
                >
                    임시저장 <span style={{ marginLeft: '5px', color: '#ff4d4f' }}>{tempSaveCnt}</span>
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: '#000',
                        borderRadius: '18px',
                        padding: '5px 20px',
                        fontSize: '15px',
                    }}
                >
                    완료
                </Button>
            </div>

            {/* ThemeModal 컴포넌트 */}
            <ThemeMainModal open={openThemeModal} handleClose={handleCloseThemeModal} />
        </div>
    );
}

export default PostWriteFooter;