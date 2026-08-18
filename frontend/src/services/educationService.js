


import API from "../api/axios";

export const getEducations = async () => {

    const response = await API.get(
        "/profiles/education/"
    );

    return response.data;
};

export const createEducation = async (educationData) => {

    const response = await API.post(
        "/profiles/education/create/",
        educationData
    );

    return response.data;
};

export const updateEducation = async (
    id,
    educationData
) => {

    const response = await API.patch(
        `/profiles/education/update/${id}/`,
        educationData
    );

    return response.data;
};

export const deleteEducation = async (id) => {

    const response = await API.delete(
        `/profiles/education/delete/${id}/`
    );

    return response.data;
};

