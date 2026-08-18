


import axios from "axios";

export async function refreshAccessToken() {

    const refresh =
        localStorage.getItem("refresh");

    if (!refresh) {

        throw new Error(
            "No refresh token found."
        );

    }

    const response =
        await axios.post(

            "http://127.0.0.1:8000/api/token/refresh/",

            {

                refresh

            }

        );

    localStorage.setItem(

        "access",

        response.data.access

    );

    return response.data.access;

}


