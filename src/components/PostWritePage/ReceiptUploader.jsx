import React from "react";
import { LoadingButton } from "@mui/lab";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SendIcon from "@mui/icons-material/Send";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";

const ReceiptUploader = ({
    receiptVerification,
    receiptLoading,
    setSelectedFile,
    handleReceiptUpload,
}) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    return (
        <div className="receipt-uploader">
            <input
                type="file"
                accept="image/*"
                id="receipt-upload"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <label htmlFor="receipt-upload">
                <ReceiptLongIcon style={{ cursor: "pointer", fontSize: "40px" }} />
            </label>

            <LoadingButton
                onClick={handleReceiptUpload}
                endIcon={
                    receiptVerification ? <DoneAllIcon /> : <SendIcon />
                }
                loading={receiptLoading}
                variant="outlined"
            >
                {receiptVerification ? "인증 성공" : "영수증 업로드"}
            </LoadingButton>

            {!receiptVerification && (
                <CloseIcon style={{ color: "red", marginLeft: "10px" }} />
            )}
        </div>
    );
};

export default ReceiptUploader;
