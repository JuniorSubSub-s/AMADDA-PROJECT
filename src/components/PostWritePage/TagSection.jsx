import React from "react";
import { Chip, TextField } from "@mui/material";

const TagSection = ({ tags, handleAddTag, handleDeleteTag }) => (
    <div className="tag-input-area">
        <TextField
            className="tag-input-field"
            placeholder="#태그를 입력해주세요"
            onKeyDown={handleAddTag}
            variant="outlined"
            fullWidth
            disabled={tags.length >= 5}
            InputProps={{
                sx: {
                    "& fieldset": { border: "none" },
                    backgroundColor: "white",
                    fontFamily: "font-notosansKR-medium",
                    fontSize: "13px",
                },
            }}
        />
        {tags.length >= 5 && (
            <div style={{ color: "#f67e7e", fontSize: "12px", marginTop: "5px" }}>
                태그는 최대 5개까지만 가능합니다.
            </div>
        )}
        <div className="tag-list">
            {tags.map((tag, index) => (
                <Chip
                    key={index}
                    label={`#${tag}`}
                    onDelete={() => handleDeleteTag(tag)}
                    sx={{ margin: "5px" }}
                />
            ))}
        </div>
    </div>
);

export default TagSection;
