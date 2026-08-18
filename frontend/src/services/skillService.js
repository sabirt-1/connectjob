


import API from "../api/axios";

export const getSkills = async (category = "") => {

    let url = "/skills/";

    if (category) {

        url += `?category=${category}`;

    }

    const response = await API.get(url);

    return response.data;

};

