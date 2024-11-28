import React, { useState, useEffect, useRef } from 'react';
import './PostSaveModal.css';
import BasicDiary from '../../AmaddaTheme/BasicDiary/BasicDiary';
import SimpleDiary from '../../AmaddaTheme/SimpleDiary/SimpleDiary'; 
import FlowerDiary from '../../AmaddaTheme/FlowerDiary/FlowerDiary';
import NoteDiary from '../../AmaddaTheme/NoteDiary/NoteDiary';
import AmaDDiary from '../../AmaddaTheme/AmaDDiary/AmaDDiary';
import AlbumDiary from '../../AmaddaTheme/AlbumDiary/AlbumDiary';
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import getUserName from '../../../utils/getUserName';
import html2canvas from 'html2canvas';

function PostSaveModal({ open, themeContentData, postData }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

    const [captureImage, setCaptureImage] = useState([]); // 캡처된 이미지를 배열로 상태 관리

    const captureRef = useRef(null); // 캡처할 요소를 참조할 Ref

    const [userName, setUserName] = useState(""); // userName 상태 관리

    useEffect(() => {
        if (open) {
            const name = getUserName(); // getUserName을 호출하여 userName을 가져옵니다.
            setUserName(name || ""); // 값이 없으면 빈 문자열로 설정
            capture_Image();
        }
    }, [open, themeContentData]);

    useEffect(() => {
        if (captureImage.length > 0) {
            // 이미지가 captureImage 배열에 추가되었을 때 saveRestaurant 실행
            saveRestaurant();
        }
    }, [captureImage]); // captureImage가 변경될 때마다 실행
    

    // 레스토랑 유무검사/추가 함수
    const saveRestaurant = async () => {
        setIsLoading(true);
        try {
            const response = await api.post("/api/amadda/saveRestaurant", null, {
                params: {
                    restaurantName: postData.restaurantName,
                    restaurantAddress: postData.restaurantAddress,
                    locationLatitude: postData.restaurantLatitude,
                    locationLongitude: postData.restaurantLongitude
                }
            });
            const restaurantId = response.data;
            // console.log("Restaurant ID:", restaurantId);

            // 게시물 저장 함수 실행
            savePost(restaurantId);
        } catch (error) {
            console.error("Failed to save restaurant:", error);
            setIsLoading(false);
        }
    };

    const saveCapturedImage = async () => {
        if (captureImage) {
            const formData = new FormData();
            captureImage.forEach(image => {
                formData.append("file", image); 
            });
            try {
                const response = await api.post("/api/amadda/saveThemeDiaryImages", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data", // 적절한 헤더 설정
                    },
                });
    
                // console.log("서버 응답:", response.data[0]); // 응답 처리
                return(response.data[0]);
            } catch (error) {
                console.error("파일 업로드 실패:", error);
            }
        }
    };

    // 게시물 저장 함수
    const savePost = async (restaurantId) => {
        const themeDiaryImg = await saveCapturedImage();
        const category = postData.selectedData.category.join(',');

        const setPostData = {
            tag: postData.tags,
            post_title: postData.title,
            post_content: postData.plainTextContent,
            privacy: "PUBLIC",
            food_category: category,
            mood: postData.selectedData.mood,
            weather: postData.selectedData.weather,
            receipt_verification: postData.receiptVerificationValue,
            restaurant_id: restaurantId,
            user_id: postData.userId,
            theme_id: postData.themeId,
            clip: postData.selectedData.clip,
            theme_diary_img: themeDiaryImg,
            tag: postData.tags,
        };

        try {
            const response = await api.post("/api/amadda/savePost", setPostData);

            console.log("태그 확인: ", postData.tags);

            if (response.status === 200) {
                const postId = response.data;
                // console.log("게시물 저장 성공:", postId);
                saveCapturedImage(postId);
                saveImages(postData.images, postId, restaurantId);
            }
        } catch (error) {
            console.error("게시물 저장 실패:", error.response ? error.response.data : error.message);
            setIsLoading(false);
        }
    };

    // 게시물 이미지 저장 함수
    const saveImages = async (images, postId, restaurantId) => {
        const formData = new FormData();
        images.forEach(image => {
            formData.append("file", image); 
        });
        formData.append("postId", postId);
        formData.append("restaurantId", restaurantId);

        api.post('/api/amadda/saveFoodImages', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setTimeout(() => {
                setIsLoading(false); // 로딩을 최소 3초 이상 유지
            }, 2000); // 2초 후에 로딩 종료
            // console.log('Uploaded file URLs:', response.data); 
            // console.log("게시물 저장 성공");
        })
        .catch(error => {
            console.error('Error uploading files:', error);
            setIsLoading(false);
        });
    };


    // open 상태에 따라 다른 JSX 렌더링
    const renderDiaryComponent = () => {
        switch (postData.themeId) {
            case 1:
                return <BasicDiary themeContentData={themeContentData} />; 
            case 2:
                return <SimpleDiary themeContentData={themeContentData} />; 
            case 3:
                return <FlowerDiary themeContentData={themeContentData} />;
            case 4:
                return <NoteDiary themeContentData={themeContentData} />;
            case 5:
                return <AmaDDiary themeContentData={themeContentData} />;
            case 6:
                return <AlbumDiary themeContentData={themeContentData} />;
            default:
                return null; 
        }
    };

    // 돼지 이미지
    const [isFirstImage, setIsFirstImage] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFirstImage((prev) => !prev); // 상태를 반전
        }, 500); // 1초마다 실행

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, []);

    // 캡처 기능
    const capture_Image = () => {
        if (captureRef.current) {
            html2canvas(captureRef.current).then((canvas) => {
                // canvas에서 image/png 형식의 Blob 객체 생성
                canvas.toBlob((blob) => {
                    if (blob) {
                        // Blob을 File로 변환 (파일명과 MIME 타입을 지정)
                        const file = new File([blob], 'captured_image.png', { type: 'image/png' });
                        
                        // 기존 배열에 새로운 파일을 추가
                        setCaptureImage((prevImages) => [...prevImages, file]); // 캡처된 이미지를 배열에 추가
                        // console.log("Captured File: ", captureImage);
                    }
                }, 'image/png'); // 이미지 형식 지정 (image/png)
            });
        }
    };

    

    return open ? (
        <div>
            <div className="postsave-modal-overlay" />
            <div className="postsave-modal-content">
                <div ref={captureRef}>
                    {renderDiaryComponent()} {/* 조건에 맞는 다이어리 컴포넌트 렌더링 */}
                </div>
                <div className="postsave-modal-saveCommentArea">
                    <div className="postsave-modal-textArea">
                        {isLoading ? (
                            <>
                                <p className="postsave-modal-saveComment">{userName}님의 맛있는 일기를 저장중이에요!😋</p>
                            </>
                        ) : (
                            <>
                                <p className="postsave-modal-saveComment">일기 저장이 완료되었습니다😊</p>
                                <p className="postsave-modal-goMain" onClick={() => navigate(`/amadda/mypage/${postData.userId}`, { state: { scrollTo: "postSection" } })}>
                                    작성한 일기 확인하기
                                </p>
                            </>
                        )}
                    </div>
                    <div>
                        {isFirstImage ? (
                            <img src="/img/PigIcon/pig-image-1.png" alt="Image 1" style={{ width: "150px" }} />
                        ) : (
                            <img src="/img/PigIcon/pig-image-2.png" alt="Image 2" style={{ width: "150px" }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default PostSaveModal;
