



import API from "../api/axios";

/* Get all companies */

export const getCompanies = async () => {

    const response = await API.get(
        "/companies/"
    );

    return response.data;

};


/* Get one company */

export const getCompanyDetails = async (id) => {

    const response = await API.get(
        `/companies/${id}/`
    );

    return response.data;

};


export const getMyCompanies = async () => {

    const response = await API.get(
        "/companies/my-companies/"
    );

    return response.data;
};


export const getMyCompany = async () => {

    const response = await API.get(
        "/companies/my-company/"
    );

    return response.data;

};


export const updateCompany = async (

    id,

    companyData

) => {

    const formData = new FormData();

    Object.keys(companyData).forEach((key) => {

        if (
            companyData[key] !== null &&
            companyData[key] !== undefined
        ) {

            formData.append(
                key,
                companyData[key]
            );

        }

    });

    const response = await API.put(

        `/companies/${id}/update/`,

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data",

            },

        }

    );

    return response.data;

};



// export const updateCompany = async (
//     id,
//     companyData
// ) => {

//     const response = await API.put(
//         `/companies/${id}/update/`,
//         companyData
//     );

//     return response.data;

// };



export const createCompany = async (companyData) => {

    const formData = new FormData();

    Object.keys(companyData).forEach((key) => {

        if (
            companyData[key] !== null &&
            companyData[key] !== undefined
        ) {

            formData.append(
                key,
                companyData[key]
            );

        }

    });

    const response = await API.post(

        "/companies/create/",

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data",

            },

        }

    );

    return response.data;

};


export const deleteCompany = async (id) => {

    const response = await API.delete(
        `/companies/${id}/delete/`
    );

    return response.data;

};



// export const createCompany = async (
//     companyData
// ) => {

//     const response = await API.post(
//         "/companies/create/",
//         companyData
//     );

//     return response.data;
// };









// 1.

// import API from "../api/axios";

// export const getMyCompanies = async () => {

//     const response = await API.get(
//         "/companies/my-companies/"
//     );

//     return response.data;
// };

