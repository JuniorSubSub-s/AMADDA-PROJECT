import { Box, Modal } from '@mui/material';
import React, { useEffect, useState } from "react";

import ThemeList from "./ThemeList";
import "./ThemeStore.css";

import api from "../../../api/axios";

export const ThemeStoreModal = ({ open, handleClose }) => {

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
    display: 'flex',
    flexDirection: 'column',
  };

  const [themes, setThemes] = useState([]);
  const [specialPriceThemes, setSpecialPriceThemes] = useState([]);
  const [highRatingThemes, setHighRatingThemes] = useState([]);
  const [newThemes, setNewThemes] = useState([]);

  useEffect(() => {
    api.get("/api/amadda/themeStore")
      .then(response => {
        setThemes(response.data);
      })
      .catch(error => {
        console.error("Error fetching themes:", error);
      });

  }, []);

  useEffect(() => {
    if (themes.length === 0) return;

    // 특가 정렬
    setSpecialPriceThemes(
      themes
        .filter(theme => theme.discount !== null)
        .sort((a, b) => 
          (a.themePrice - (a.themePrice * a.discount) / 100) -
          (b.themePrice - (b.themePrice * b.discount) / 100)
        )
    );

    // 별점 정렬
    setHighRatingThemes(
      themes
        .filter(theme => theme.rating !== null)
        .sort((a, b) => b.rating - a.rating)
    );

    // 신간 정렬
    setNewThemes(
      themes
        .sort((a, b) => b.themeId - a.themeId)
    );
  }, [themes]); // themes가 변경될 때마다 이 useEffect 실행

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
              <ThemeList data={specialPriceThemes} />
            </div>

            <div className="high-rating-product-area">
              <div className="title-text-2">좋은 평가를⭐받고 있어요</div>
              <ThemeList data={highRatingThemes} />
            </div>

            <div className="new-product-area">
              <div className="title-text-2">화제의🌟신간이에요</div>
              <ThemeList data={newThemes} />
            </div>

          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ThemeStoreModal;
