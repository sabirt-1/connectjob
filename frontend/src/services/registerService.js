




// import API from "../api/axios";
// import axios from "axios";

// export const registerUser = async (userData) => {

//     const response = await API.post(
//         "http://127.0.0.1:8000/api/accounts/register/",
//         userData
//     );

//     return response.data;
// };


import axios from "axios";

export const registerUser = async (userData) => {

    const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/register/",
        userData
    );

    return response.data;
};



// import axios from "axios";

const API = "http://127.0.0.1:8000/api/accounts/";

// Verify Email OTP
export const verifyEmailOTP = async (email, otp) => {

    const response = await axios.post(

        API + "verify-otp/",

        {

            email,

            otp

        }

    );

    return response.data;

};

// Resend OTP
export const resendOTP = async (email) => {

    const response = await axios.post(

        API + "resend-otp/",

        {

            email

        }

    );

    return response.data;

};


