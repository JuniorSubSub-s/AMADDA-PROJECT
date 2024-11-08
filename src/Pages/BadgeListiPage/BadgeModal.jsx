import * as React from 'react';
import { Modal, Box, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BadgeModal = ({ open, onClose, badgeImage, badgeTitle, badgeDescription }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            BackdropProps={{
                style: { backgroundColor: 'rgba(0, 0, 0, 0.7)' } // 배경을 어둡게 설정
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Card sx={{ maxWidth: 400, position: 'relative', boxShadow: 24 }}>
                    {/* 닫기 버튼 */}
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <CardMedia
                        component="img"
                        height="400"
                        image={badgeImage}
                        alt={badgeTitle}
                    />
                    <CardContent
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)', // 배경을 어둡게 설정
                            color: 'white', // 텍스트 색상을 흰색으로 설정
                            textAlign: 'center' // 텍스트 가운데 정렬
                        }}
                    >
                        <Typography
                            id="modal-title"
                            variant="h5"
                            component="div"
                            gutterBottom
                        >
                            {badgeTitle}
                        </Typography>
                        <Typography
                            id="modal-description"
                            variant="body2"
                            sx={{
                                fontFamily: "font-notosansKR-medium",
                            }}
                        >
                            {badgeDescription}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Modal>
    );
};

export default BadgeModal;
