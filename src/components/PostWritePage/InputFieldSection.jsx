import React from "react";
import { TextField } from "@mui/material";

const InputFieldsSection = ({
    title,
    setTitle,
    restaurantName,
    restaurantAddress,
    setOpenMapModal,
    content,
    setContent,
}) => (
    <>
        {/* Title Input */}
        <div className="title-input-container">
            <TextField
                className="title-input-field"
                placeholder="제목을 입력해주세요"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                InputProps={{
                    sx: {
                        fontFamily: "font-notosansKR-medium",
                        backgroundColor: "white",
                        fontSize: "14px",
                    },
                }}
            />
        </div>

        {/* Address Input */}
        <div className="location-input-container">
            <TextField
                className="location-input-field"
                placeholder="주소를 입력해주세요"
                value={restaurantName && restaurantAddress ? `${restaurantName} (${restaurantAddress})` : ""}
                InputProps={{
                    sx: {
                        fontFamily: "font-notosansKR-medium",
                        backgroundColor: "white",
                        fontSize: "14px",
                    },
                }}
                disabled
                fullWidth
            />
            <button onClick={() => setOpenMapModal(true)}>주소 검색</button>
        </div>

        {/* Content Input */}
        <TextField
            className="title-input-field"
            placeholder="내용을 입력해주세요"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            rows={3}
            InputProps={{
                sx: {
                    fontFamily: "font-notosansKR-medium",
                    backgroundColor: "white",
                    fontSize: "14px",
                    borderRadius: "10px",
                },
            }}
        />
    </>
);

export default InputFieldsSection;
