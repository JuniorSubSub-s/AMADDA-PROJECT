import React from "react";
import { Chip, TextField } from "@mui/material";

const TagManager = ({ tags, setTags }) => {
    const handleAddTag = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            if (tags.length < 5) {
                setTags([...tags, e.target.value.trim()]);
                e.target.value = "";
            } else {
                alert("태그는 최대 5개까지만 추가 가능합니다.");
            }
        }
    };

    const handleDeleteTag = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <div>
            <TextField
                placeholder="#태그를 입력해주세요"
                onKeyDown={handleAddTag}
                fullWidth
                InputProps={{ sx: { backgroundColor: "#ffffff" } }}
            />
            <div className="tag-list">
                {tags.map((tag, index) => (
                    <Chip key={index} label={`#${tag}`} onDelete={() => handleDeleteTag(tag)} sx={{ margin: "5px" }} />
                ))}
            </div>
        </div>
    );
};

export default TagManager;
