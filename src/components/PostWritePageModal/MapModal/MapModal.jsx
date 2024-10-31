import React from 'react';
import { Modal, Box, Typography, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import './MapModal.css';

function MapModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
      aria-labelledby="modal-map-title"
      aria-describedby="modal-map-description"
      BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }} // 모달 뒤에 배경 색상 설정
    >
      <Box className="modal-box">
        {/* 닫기 버튼 */}
        <div className="close-button"
          onClick={handleClose}>
        </div>

        <div className='title'>
          <Typography
            id="modal-map-title"
            className="modal-title"
            style={{ textDecoration: 'none', padding: 0 }}
          >
            지도
          </Typography>
        </div>

        <Box className="search-box">
          <TextField
            variant="standard"
            placeholder="검색"
            InputProps={{ disableUnderline: true }}
            className="search-input"
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box className="map-container">
          <img src="/img/map-placeholder.png" alt="지도" className="map-image" />
        </Box>
      </Box>
    </Modal>
  );
}

export default MapModal;
