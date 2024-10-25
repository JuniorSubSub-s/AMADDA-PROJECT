import React, { useState } from "react";
// import BackgroundModal from "../screen/BackgroundModal";
import ThemeModal from "../modal/ThemeModal";


const ModalApp = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>모달 열기</button>
      {/* <BackgroundModal isOpen={isModalOpen} onClose={closeModal} /> */}
      <ThemeModal isOpen={isModalOpen} onClose={closeModal} />
      
    </div>
  );
};

export default ModalApp;