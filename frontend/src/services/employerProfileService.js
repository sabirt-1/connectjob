


import API from "../api/axios";

export const getEmployerProfile = async () => {

    const response = await API.get(

        "/accounts/employer-profile/"

    );

    return response.data;

};

export const updateEmployerProfile = async (

    formData

) => {

    const response = await API.patch(

        "/accounts/employer-profile/update/",

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

