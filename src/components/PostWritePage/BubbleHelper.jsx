import React from "react";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const BubbleHelper = ({
  bubblePosition,
  showBubble,
  showClickBubble,
  handleAIIconMouseEnter,
  handleAIIconMouseLeave,
  handleAIIconClick,
}) => {
  return (
    <div>
      <div
        className="ai-button-container"
        onMouseEnter={handleAIIconMouseEnter}
        onMouseLeave={handleAIIconMouseLeave}
        onClick={handleAIIconClick}
        style={{ position: "relative" }}
      >
        <AutoFixHighIcon
          style={{ fontSize: "40px", cursor: "pointer" }}
          className="ai-icon"
        />
        {showBubble && (
          <div
            className="bubble"
            style={{
              position: "fixed",
              top: `${bubblePosition.top}px`,
              left: `${bubblePosition.left}px`,
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              zIndex: 1000,
            }}
          >
            AI를 이용해 글을 작성해보세요!
          </div>
        )}
        {showClickBubble && (
          <div
            className="bubbleClick"
            style={{
              position: "fixed",
              top: `${bubblePosition.top - 50}px`,
              left: `${bubblePosition.left}px`,
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              zIndex: 1000,
            }}
          >
            <p>AI 자동완성을 사용하려면 정보를 입력하세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BubbleHelper;
