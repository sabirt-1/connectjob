


import API from "../api/axios";

export const getCategories = async () => {

    const response = await API.get(
        "/categories/"
    );

    return response.data;

};

export const createCategory = async (categoryData) => {

    const response = await API.post(
        "/categories/create/",
        categoryData
    );

    return response.data;

};

