


import API from "../api/axios";

export const getUsers = async (
    search = "",
    role = "",
    page = 1
) => {

    const response = await API.get(
        `/admin/users/?search=${search}&role=${role}&page=${page}`
    );

    return response.data;

};

