


import API from "../api/axios";

export const getAdminDashboard = async (id) => {

    const response = await API.get(

        // `/admin/dashboard/`
        "/admin/dashboard/"

    );

    return response.data;

};


export const getAdminUserDetails = async (id) => {

    const response = await API.get(

        `/admin/users/${id}/`

    );

    return response.data;

};

// export const getAdminUsers = async (

//     search = "",

//     role = "",

//     page = 1

// ) => {

//     const response = await API.get(

//         `/admin/users/?search=${search}&role=${role}&page=${page}`

//     );

//     return response.data;

// };


export const updateAdminUser = async (
    id,
    userData
) => {

    const response = await API.patch(

        `/admin/users/${id}/update/`,

        userData

    );

    return response.data;

};


export const toggleAdminUserStatus = async (id) => {

    const response = await API.patch(

        `/admin/users/${id}/toggle-status/`

    );

    return response.data;

};


export const deleteAdminUser = async (id) => {

    const response = await API.delete(

        `/admin/users/${id}/delete/`

    );

    return response.data;

};


