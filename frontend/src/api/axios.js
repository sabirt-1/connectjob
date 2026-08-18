




import axios from "axios";
import { refreshAccessToken } from "../services/tokenService";

const API = axios.create({

    baseURL: "http://127.0.0.1:8000/api",

});


// Attach Access Token
API.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem("access");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;

    }

);


// Refresh Token Automatically
API.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (

            error.response?.status === 401 &&

            !originalRequest._retry

        ) {

            originalRequest._retry = true;

            try {

                const newAccessToken =
                    await refreshAccessToken();

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return API(originalRequest);

            }

            catch (refreshError) {

                localStorage.removeItem("access");

                localStorage.removeItem("refresh");

                window.location.href = "/login";

                return Promise.reject(refreshError);

            }

        }

        return Promise.reject(error);

    }

);

export default API;



