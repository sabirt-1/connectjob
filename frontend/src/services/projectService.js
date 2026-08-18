


import API from "../api/axios";

export const getProjects = async () => {

    const response = await API.get(
        "/profiles/project/"
    );

    return response.data;
};

export const createProject = async (projectData) => {

    const response = await API.post(

        "/profiles/project/create/",

        projectData

    );

    return response.data;
};

export const updateProject = async (

    id,

    projectData

) => {

    const response = await API.patch(

        `/profiles/project/update/${id}/`,

        projectData

    );

    return response.data;
};

export const deleteProject = async (id) => {

    const response = await API.delete(

        `/profiles/project/delete/${id}/`

    );

    return response.data;
};

