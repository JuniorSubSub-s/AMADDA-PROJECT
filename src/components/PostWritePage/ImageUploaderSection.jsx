import React, { useRef } from "react";
import { Button } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import "../../ui/PostWritePage/PostWritePage.css";

const ImageUploaderSection = ({ images, setImages, previewImages, setPreviewImages, onSelectImg }) => {
    const imageInputRef = useRef(null);

    // 이미지 업로드 핸들러
    const imageHandler = (e) => {
        if (images.length >= 4) {
            alert("이미지는 최대 4개까지만 업로드 가능합니다.");
            return;
        }
        const file = e.target.files[0];
        if (file) {
            setImages((prevImages) => [...prevImages, file]);

            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result;
                setPreviewImages((prevPreviews) => [...prevPreviews, base64]);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="image-uploader-section">
            {/* 이미지 미리보기 */}
            <div className="img-preview-container">
                {previewImages.length > 0 && (
                    <div className="imgContainer">
                        <div className="imgFrame">
                            {previewImages.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`img${index + 1}`}
                                    className={`img ${images[0] === images[index] ? "selected" : ""}`}
                                    onClick={() => onSelectImg(index)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* 이미지 업로드 버튼 */}
                <div className="upload-container">
                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<AddAPhotoIcon />}
                        style={{ fontFamily: "font-notosansKR-medium" }}
                    >
                        이미지 업로드
                        <input
                            type="file"
                            ref={imageInputRef}
                            style={{ display: "none" }}
                            onChange={imageHandler}
                            accept="image/*"
                        />
                    </Button>

                    <p className="upload-text">
                        이미지를 클릭하여 대표 이미지로 설정
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImageUploaderSection;
