import React, { useState } from "react";
import { Container, Button, Modal, Box } from '@mui/material';

import ThemeList from "./ThemeList";
import "./style.css";

export const ThemeStoreModal = ({open, handleClose}) => {

  const style = {
    position: 'absolute',
    top: '50%',                   
    left: '50%',                  
    transform: 'translate(-50%, -50%)', 
    width: '80%',
    maxWidth: '1000px',
    height: '80vh',               
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflowY: 'auto',           
    display: 'flex',             // Flexbox 사용
    flexDirection: 'column',     // 수직 방향으로 배치
  };

  const testData = [
    { id: 1, themeName: 'Theme1', price: 10000, discount: 30, rating: 5 },
    { id: 2, themeName: 'Theme2', price: 10000, discount: 30, rating: 4 },
    { id: 3, themeName: 'Theme3', price: 10000, discount: 30, rating: 3 },
    { id: 4, themeName: 'Theme4', price: 10000, discount: 30, rating: 2 },
    { id: 5, themeName: 'Theme5', price: 10000, discount: 30, rating: 4 },
    { id: 6, themeName: 'Theme6', price: 10000, discount: 30, rating: 5 },
    { id: 7, themeName: 'Theme7', price: 10000, discount: 30, rating: 1 },
    { id: 8, themeName: 'Theme8', price: 10000, discount: 30, rating: 3 },
    { id: 9, themeName: 'Theme9', price: 10000, discount: 30, rating: 2 },
    { id: 10, themeName: 'Theme10', price: 10000, discount: 30, rating: 4 },
    { id: 11, themeName: 'Theme11', price: 10000, discount: 30, rating: 5 },
    { id: 12, themeName: 'Theme12', price: 10000, discount: 30, rating: 0 },
  ];

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          {/* 닫기 버튼 */}
          <div className="close-button" onClick={handleClose}></div>

          <div className="theme-page">
            <div className="title-text">테마 상점</div>

            <div className="discounted-product-area">
              <div className="title-text-2">시즌 특가💫</div>
              <ThemeList data={testData} />
            </div>

            <div className="high-rating-product-area">
              <div className="title-text-2">좋은 평가를⭐받고 있어요</div>
              <ThemeList data={testData}/>
            </div>

            <div className="new-product-area">
              <div className="title-text-2">화제의🌟신간이에요</div>
              <ThemeList data={testData}/>
            </div>

          </div>    
        </Box>
      </Modal>
    </div>
  );
};

export default ThemeStoreModal;
