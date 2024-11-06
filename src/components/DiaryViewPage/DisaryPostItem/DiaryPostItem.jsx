import { useEffect } from 'react';

import { LinearMessagesConversationCheckRead } from "../../../assets/icons/LinearMessagesConversationCheckRead";

import { Box, Typography } from '@mui/material';
import './DiaryPostItem.css';

function DiaryPostItem({ data }) { // 기본값을 빈 객체로 설정

    useEffect(() => {}, [data]);


    const getPinColorStyle = (totalPost) => {
        if (totalPost < 50) {
            return { color: 'black', text: 'Black' }; // 50회 미만
        } else if (totalPost < 100) {
            return { color: '#ff0000', text: 'Red' }; // Red
        } else if (totalPost < 200) {
            return { color: '#ff5d00', text: 'Orange' }; // Orange
        } else if (totalPost < 300) {
            return { color: '#003dff', text: 'Blue' }; // Blue
        } else if (totalPost < 400) {
            return { color: '#f1dd00', text: 'Yellow' }; // Yellow
        } else {
            return { color: '#d400ff', text: 'Purple' }; // Purple
        }
    };

    const pinColorStyle = getPinColorStyle(data.restaurant && data.restaurant.totalPost);

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
                    bgcolor={pinColorStyle.color || 'default'} // 데이터가 없을 때 기본값 설정
                    color="white"
                    p={1}
                    borderRadius={1}
                    position="absolute"
                    top={10}
                    left={10}
                >
                    <Typography variant="caption" sx={{ fontFamily: 'font-notosansKR-medium !important' }}>
                        {pinColorStyle.text ? `${pinColorStyle.text} PIN` : 'NO PIN'}
                    </Typography>
                </Box>
                <Typography color="#888" variant="body2" sx={{ fontFamily: 'font-notosansKR-medium !important' }}>
                    User Post Img
                </Typography>
            </Box>

            {/* 게시글 정보 */}
            <Box className="diary-post-info">
                <Typography variant="subtitle2" className="cate-user-name-2" sx={{ fontFamily: 'font-notosansKR-medium !important' }}>
                    {(data.user && data.user.userNickname) || "Unknown User"}
                </Typography>
                <Typography variant="h6" className="diary-title" gutterBottom sx={{ fontFamily: 'font-notosansKR-medium !important' }}>
                    {data.postTitle || "No Title"}
                </Typography>
                <Typography className="hashtag" color="textSecondary" sx={{ fontFamily: 'font-notosansKR-medium !important' }}>
                    #해시태그
                </Typography>

                <Box
                    className="receipt-mark"
                    display="flex"
                    alignItems="center"
                    color={data.receiptVerification ? "#00B058" : "black"}
                    mt={1}
                    sx={{ marginTop: '15px', fontFamily: 'font-notosansKR-medium !important' }}
                >
                    <Typography variant="body2" sx={{ marginRight: '10px', fontFamily: 'font-notosansKR-medium !important' }}>
                        {data.receiptVerification ? "영수증 인증 게시글" : "영수증 미인증 게시글"}
                    </Typography>
                    {data.receiptVerification && (
                        <LinearMessagesConversationCheckRead/>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default DiaryPostItem;
