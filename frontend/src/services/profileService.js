

import API from "../api/axios";

export const getProfile = async () => {

    const response =
        await API.get(
            "/accounts/profile/"
        );

    return response.data;
};



export const getCandidateProfile = async () => {

    const response = await API.get(

        "/accounts/candidate-profile/"

    );

    return response.data;

};


export const getEmployerCandidateProfile = async (
    candidateId
) => {

    const response = await API.get(
        `/accounts/employer/candidate/${candidateId}/`
    );

    return response.data;

};


export const addCustomSkill = async (name) => {

    const response = await API.post(
        "/accounts/candidate/custom-skills/",
        {
            name
        }
    );

    return response.data;
};


export const deleteCustomSkill = async (skillId) => {

    const response = await API.delete(
        `/accounts/candidate/custom-skills/${skillId}/`
    );

    return response.data;
};


export const updateCandidateProfile = async ( formData ) => {

    const response = await API.patch(

        "/accounts/candidate-profile/update/",

        formData,

        {

            headers: {

                "Content-Type":

                    "multipart/form-data"

            }

        }

    );

    return response.data;

};




