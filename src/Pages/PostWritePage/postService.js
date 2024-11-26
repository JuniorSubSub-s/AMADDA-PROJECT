import api from "../../api/axios";

export const saveRestaurant = async (restaurantData) => {
    const response = await api.post("/api/amadda/saveRestaurant", null, {
        params: restaurantData,
    });
    return response.data;
};

export const savePost = async (postData) => {
    const response = await api.post("/api/amadda/savePost", postData);
    return response.data;
};

export const saveImages = async (images, postId, restaurantId) => {
    const formData = new FormData();
    images.forEach((image) => formData.append("file", image));
    formData.append("postId", postId);
    formData.append("restaurantId", restaurantId);

    const response = await api.post("/api/amadda/saveFoodImages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};