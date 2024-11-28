import React from "react";
import { TextField } from "@mui/material";

const TextInputField = ({ value, onChange, placeholder, multiline = false, rows = 1 }) => (
    <TextField
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
        fullWidth
        InputProps={{
            sx: {
                fontFamily: "font-notosansKR-medium",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
            },
        }}
    />
);

export default TextInputField;
