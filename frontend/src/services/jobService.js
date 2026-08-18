

import API from "../api/axios";

export const getJobs = async (filters = {}) => {

    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {

        if (
            value !== "" &&
            value !== null &&
            value !== undefined
        ) {
            params.append(key, value);
        }

    });

    const response = await API.get(
        `/jobs/?${params.toString()}`
    );

    return response.data.results;

};

// export const getJobs = async (
//     title = "",
//     location = "",
//     category = ""
// ) => {

//     const response = await API.get(
//         `/jobs/?title=${title}&location=${location}&category=${category}`
//     );

//     return response.data;
// };


export const getMyJobs = async () => {

    const response = await API.get(
        "/jobs/my-jobs/"
    );

    return response.data;

};

export const deleteJob = async (id) => {

    const response = await API.delete(
        `/jobs/delete/${id}/`
    );

    return response.data;

};

export const getJobDetails = async (id) => {

    const response = await API.get(
        `/jobs/${id}/`
    );

    return response.data;

};


export const getEmployerDashboard = async()=>{

    const response = await API.get(
        "/jobs/employer-dashboard/"
    );

    return response.data;

};

export const getJob = async (id) => {

    const response = await API.get(

        `/jobs/${id}/`

    );

    return response.data;

};

export const updateJob = async (

    id,

    jobData

) => {

    const response = await API.put(

        `/jobs/update/${id}/`,

        jobData

    );

    return response.data;

};



export async function getSimilarJobs(id) {

    const response = await API.get(
        `/jobs/${id}/similar/`
    );

    return response.data;

}


// 1. JobService
// import API from "../api/axios";

// export const getJobs = async () => {

//     const response = await API.get(
//         "/jobs/"
//     );

//     return response.data;
// };