import { useEffect } from 'react';

import { LinearMessagesConversationCheckRead } from "../../../assets/icons/LinearMessagesConversationCheckRead";

import { Box, Typography } from '@mui/material';
import './DiaryPostItem.css';

function DiaryPostItem({ data = {} }) { // 기본값을 빈 객체로 설정

    useEffect(() => {}, [data]);

    // pinColor에 따라 색상 설정
    const getPinColorStyle = (color) => {
        switch (color) {
            case 'RED':
                return '#F40159';
            case 'BLUE':
                return '#50B1F9';
            case 'PURPLE':
                return '#A11EFF';
            case 'YELLOW':
                return '#FFDD31';
            default:
                return 'black'; // 기본 색상
        }
    };

    return (
        <Box    
            className="diary-post-item" 
            borderRadius={2} 
            boxShadow={2} 
            p={2} 
            mb={1}
            height="450px">
            {/* 이미지 영역 */}
            <Box
                className="image-background"
                bgcolor="#e0e0e0" // 임시 배경 색상
                width="100%"     // 이미지 예상 너비
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
                mb={1}
            >
                {/* Pin 색상 */}
                <Box
                    className="pin-color"
                    bgcolor={getPinColorStyle(data.pinColor || 'default')} // 데이터가 없을 때 기본값 설정
                    color="white"
                    p={1}
                    borderRadius={1}
                    position="absolute"
                    top={10}
                    left={10}
                >
                    <Typography variant="caption" sx={{ fontFamily: 'font-notosansKR-medium !important' }}>
                        {data.pinColor ? `${data.pinColor} PIN` : 'NO PIN'}
                    </Typography>
                </Box>
                <Typography color="#888" variant="body2" sx={{ fontFamily: 'font-notosansKR-medium !important' }}>
                    User Post Img
                </Typography>
            </Box>

            {/* 게시글 정보 */}
            <Box className="diary-post-info">
                <Typography variant="subtitle2" className="cate-user-name-2" sx={{ fontFamily: 'font-notosansKR-medium !important' }}>
                    {data.userName || "Unknown User"}
                </Typography>
                <Typography variant="h6" className="diary-title" gutterBottom sx={{ fontFamily: 'font-notosansKR-medium !important' }}>
                    {data.diaryTitle || "No Title"}
                </Typography>
                <Typography className="hashtag" color="textSecondary" sx={{ fontFamily: 'font-notosansKR-medium !important' }}>
                    #해시태그
                </Typography>

                <Box
                    className="receipt-mark"
                    display="flex"
                    alignItems="center"
                    color={data.isReceiptVerified ? "#00B058" : "black"}
                    mt={1}
                    sx={{ marginTop: '15px', fontFamily: 'font-notosansKR-medium !important' }}
                >
                    <Typography variant="body2" sx={{ marginRight: '10px', fontFamily: 'font-notosansKR-medium !important' }}>
                        {data.isReceiptVerified ? "영수증 인증 게시글" : "영수증 미인증 게시글"}
                    </Typography>
                    {data.isReceiptVerified && (
                        <LinearMessagesConversationCheckRead/>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default DiaryPostItem;
