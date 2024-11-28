import { useState, useRef } from "react";

const usePostWriteState = () => {
    const [state, setState] = useState({
        title: "",
        content: "",
        tags: [],
        images: [],
        previewImages: [],
        selectedImg: null,
        restaurantName: "",
        restaurantAddress: "",
        restaurantLatitude: 0.0,
        restaurantLongitude: 0.0,
        receiptVerification: false,
        bubblePosition: { top: 0, left: 0 },
        showBubble: false,
        showClickBubble: false,
        showReceiptBubble: false,
    });

    const [openMapModal, setOpenMapModal] = useState(false);
    const [openCategoryModal, setOpenCategoryModal] = useState(false);

    const fileInputRef = useRef(null);

    const handlers = {
        setTitle: (title) => setState((prev) => ({ ...prev, title })),
        setContent: (content) => setState((prev) => ({ ...prev, content })),
        setSelectedData: (data) =>
            setState((prev) => ({ ...prev, selectedData: data })),
    };

    const tagHandlers = {
        handleAddTag: (e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
                setState((prev) => ({
                    ...prev,
                    tags: [...prev.tags, e.target.value.trim()],
                }));
                e.target.value = "";
            }
        },
        handleDeleteTag: (tag) => {
            setState((prev) => ({
                ...prev,
                tags: prev.tags.filter((t) => t !== tag),
            }));
        },
    };

    const imageHandlers = {
        imageHandler: (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setState((prev) => ({
                        ...prev,
                        images: [...prev.images, file],
                        previewImages: [...prev.previewImages, reader.result],
                    }));
                };
                reader.readAsDataURL(file);
            }
        },
        handleSelectImg: (index) => {
            setState((prev) => ({
                ...prev,
                selectedImg: index,
            }));
        },
    };

    const bubbleHandlers = {
        showAIIconBubble: (iconRef) => {
            const iconRect = iconRef.current.getBoundingClientRect();
            setState((prev) => ({
                ...prev,
                bubblePosition: {
                    top: iconRect.top - 70,
                    left: iconRect.left + iconRect.width / 2,
                },
                showBubble: true,
            }));
        },
        hideAIIconBubble: () => {
            setState((prev) => ({ ...prev, showBubble: false }));
        },
        toggleClickBubble: () => {
            setState((prev) => ({ ...prev, showClickBubble: !prev.showClickBubble }));
        },
        showReceiptBubble: () => {
            setState((prev) => ({ ...prev, showReceiptBubble: true }));
        },
        hideReceiptBubble: () => {
            setState((prev) => ({ ...prev, showReceiptBubble: false }));
        },
    };

    const receiptHandlers = {
        handleReceiptUpload: (file) => {
            setState((prev) => ({ ...prev, receiptVerification: file !== null }));
        },
    };

    return {
        state,
        handlers,
        tagHandlers,
        imageHandlers,
        bubbleHandlers,
        receiptHandlers,
        fileInputRef,
        modals: {
            openMapModal,
            setOpenMapModal,
            openCategoryModal,
            setOpenCategoryModal,
            handleCloseMapModal: () => setOpenMapModal(false),
            handleCloseCategoryModal: () => setOpenCategoryModal(false),
        },
    };
};

export default usePostWriteState;
