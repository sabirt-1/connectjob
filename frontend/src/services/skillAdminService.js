


import API from "../api/axios";

// Get Skills
export const getSkills = async () => {

    const response = await API.get("/skills/");

    return response.data;

};

// Create Skill
export const createSkill = async (data) => {

    const response = await API.post(
        "/skills/create/",
        data
    );

    return response.data;

};

// Update Skill
export const updateSkill = async (
    id,
    data
) => {

    const response = await API.patch(
        `/skills/${id}/update/`,
        data
    );

    return response.data;

};

// Delete Skill
export const deleteSkill = async (id) => {

    const response = await API.delete(
        `/skills/${id}/delete/`
    );

    return response.data;

};

// Toggle Skill Status
export const toggleSkillStatus = async (id) => {

    const response = await API.patch(
        `/skills/${id}/toggle-status/`
    );

    return response.data;

};

