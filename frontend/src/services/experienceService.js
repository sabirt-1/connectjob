


import API from "../api/axios";

export const getExperiences = async () => {

    const response = await API.get(
        "/profiles/experience/"
    );

    return response.data;
};

export const createExperience = async (experienceData) => {

    const response = await API.post(
        "/profiles/experience/create/",
        experienceData
    );

    return response.data;
};

export const updateExperience = async (

    id,

    experienceData

) => {

    const response = await API.patch(

        `/profiles/experience/update/${id}/`,

        experienceData

    );

    return response.data;
};

export const deleteExperience = async (id) => {

    const response = await API.delete(

        `/profiles/experience/delete/${id}/`

    );

    return response.data;
};

