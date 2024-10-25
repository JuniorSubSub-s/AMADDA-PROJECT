import React from 'react';
import '../css/backgroundmodal.css';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import PostInfo from './PostInfo';

const BackgroundModal = ({ isOpen, onClose, post }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal">
        <div className="container">
          <div className="close-modal">
            <IconButton className="close-button" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>
          <div className="post-image">
          </div>

         
          <PostInfo post={post} />

        </div>
      </div>
    </Modal>
  );
};

export default BackgroundModal;