


import API from "../api/axios";

export const getPublicStats = async () => {

    const response = await API.get(
        "/accounts/stats/"
    );

    return response.data;

};

