




import API from "../api/axios";

// Candidate

export const applyJob = async (
    jobId,
    applicationData
) => {

    const response = await API.post(
        `/applications/apply/${jobId}/`,
        applicationData
    );

    return response.data;
};

export const getMyApplications =
    async () => {

    const response = await API.get(
        "/applications/my-applications/"
    );

    return response.data;
};

export const getCandidateDashboard = async () => {

    const response = await API.get(
        "/applications/candidate-dashboard/"
    );

    return response.data;
};

// Employer

export const getApplicants =
    async (jobId) => {

    const response =
        await API.get(
            `/applications/job-applicants/${jobId}/`
        );

    return response.data;
};


// export const updateStatus =
//     async (
//         applicationId,
//         status
//     ) => {

//     const response =
//         await API.patch(
//             `/applications/update-status/${applicationId}/`,
//             {
//                 status
//             }
//         );

//     return response.data;
// };


export const updateApplicationStatus =
    async (
        applicationId,
        status
    ) => {

    const response =
        await API.patch(
            `/applications/update-status/${applicationId}/`,
            {
                status
            }
        );

    return response.data;
};

// Delete Applications

export const deleteApplication = async (
    applicationId
) => {

    const response = await API.delete(

        `/applications/delete/${applicationId}/`

    );

    return response.data;

};

// Saved Jobs

export const saveJob = async (jobId) => {

    const response = await API.post(
        `/applications/save-job/${jobId}/`
    );

    return response.data;
};

export const unsaveJob = async (jobId) => {

    const response = await API.delete(
        `/applications/unsave-job/${jobId}/`
    );

    return response.data;
};

export const getSavedJobs = async () => {

    const response = await API.get(
        "/applications/saved-jobs/"
    );

    return response.data;
};

export const getSavedStatus = async (jobId) => {

    const response = await API.get(
        `/applications/saved-status/${jobId}/`
    );

    return response.data;
};


// Recently Viewed Jobs

export const addRecentJob = async (jobId) => {

    const response = await API.post(

        `/applications/recent-job/${jobId}/`

    );

    return response.data;

};

export const getRecentJobs = async () => {

    const response = await API.get(

        "/applications/recent-jobs/"

    );

    return response.data;

};




