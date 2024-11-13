import { useEffect, useState } from 'react';
import { LinearMessagesConversationCheckRead } from "../../../assets/icons/LinearMessagesConversationCheckRead";
import { Box, Typography, CircularProgress } from '@mui/material';
import './DiaryPostItem.css';
import api from "../../../api/axios";

function DiaryPostItem({ data }) { // 기본값을 빈 객체로 설정
    const [image, setImage] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (data && data.postId) { // data가 유효하고, postId가 있을 때만 실행
            getFoodImage();
            getTags();
        }
    }, [data]);

    const getFoodImage = async () => {
        try {
            const response = await api.get('/api/amadda/foodImage', {
                params: { postId: data.postId },
            });
            setImage(response.data[0]); // 이미지 첫 번째 항목을 사용
        } catch (error) {
            // console.error("Error fetching posts:", error);
        }
    };

    const getTags = async () => {
        try {
            const response = await api.get('/api/amadda/tags', {
                params: { postId: data.postId },
            });
            setTags(response.data); // 받아온 태그를 상태에 저장
        } catch (error) {
            // console.error("Error fetching posts:", error);
        }
    };

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

                {image === '' ? (
                        <CircularProgress />
                    ) : (
                        <img 
                            src={image} // 이미지 경로
                            alt="User Post Img"
                            style={{
                                width: '100%',  // Box 너비에 맞춤
                                height: '100%', // Box 높이에 맞춤
                                objectFit: 'cover', // 크롭하며 비율 유지
                                maxHeight: '300px', // 이미지 최대 높이 설정
                            }}
                        />
                    )}
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
                    {tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <span key={index}>
                                #{tag}{" "}
                            </span>
                        ))
                    ) : (
                        '태그없음' // tags가 비어있을 경우 공백을 출력
                    )}
                </Typography>

                <Box
                    className="receipt-mark"
                    display="flex"
                    alignItems="center"
                    color={data.receiptVerification ? "#00B058" : "black"}
                    height= '24px'
                    mt={1}
                    sx={{ marginTop: '15px', fontFamily: 'font-notosansKR-medium !important' }}
                >
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            marginRight: '10px', 
                            fontFamily: 'font-notosansKR-medium !important',
                            color: data.receiptVerification ? '#08f77f' : 'inherit' // 조건에 따른 색상 적용
                        }}
                    >
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
