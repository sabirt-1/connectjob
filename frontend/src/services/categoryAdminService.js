


import API from "../api/axios";

// Get Categories
export const getCategories = async () => {

    const response = await API.get("/categories/");

    return response.data;

};

// Create Category
export const createCategory = async (data) => {

    const response = await API.post(
        "/categories/create/",
        data
    );

    return response.data;

};

// Update Category
export const updateCategory = async (
    id,
    data
) => {

    const response = await API.patch(
        `/categories/${id}/update/`,
        data
    );

    return response.data;

};

// Delete Category
export const deleteCategory = async (id) => {

    const response = await API.delete(
        `/categories/${id}/delete/`
    );

    return response.data;

};

