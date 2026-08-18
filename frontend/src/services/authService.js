

import axios from "axios";

export const loginUser = async (
    username,
    password
) => {

    const response = await axios.post(
        // "http://127.0.0.1:8000/api/token/",
        "http://127.0.0.1:8000/api/accounts/login/",
        {
            username,
            password
        }
    );

    return response.data;
};




export const logoutUser = () => {

    localStorage.removeItem(
        "access"
    );

    localStorage.removeItem(
        "refresh"
    );
};



// import axios from "axios";

const API = "http://127.0.0.1:8000/api/accounts/";

// Forgot Password
export const forgotPassword = async (email) => {
    const response = await axios.post(
        API + "forgot-password/",
        { email }
    );

    return response.data;
};

// Verify Reset OTP
export const verifyResetOTP = async (email, otp) => {
    const response = await axios.post(
        API + "verify-reset-otp/",
        {
            email,
            otp,
        }
    );

    return response.data;
};

// Reset Password
export const resetPassword = async (
    reset_token,
    password,
    confirm_password
) => {
    const response = await axios.post(
        API + "reset-password/",
        {
            reset_token,
            password,
            confirm_password,
        }
    );

    return response.data;
};



// import API from "../api/axios";

// export const loginUser = async (data) => {

//     const response = await API.post(
//         "/token/",
//         data
//     );

//     return response.data;
// };

