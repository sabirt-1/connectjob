


import API from "../api/axios";

export async function generateSummary(data) {
    const response = await API.post(
        "/ai-resume/summary/",
        data
    );

    return response.data;
}

export async function saveSummary(summary) {
    const response = await API.post(
        "/ai-resume/save-summary/",
        {
            summary,
        }
    );

    return response.data;
}

export async function improveExperience(data) {
    const response = await API.post(
        "/ai-resume/improve-experience/",
        data
    );

    return response.data;
}

export async function generateProject(data) {
    const response = await API.post(
        "/ai-resume/generate-project/",
        data
    );

    return response.data;
}

export async function generateCoverLetter(data) {
    const response = await API.post(
        "/ai-resume/generate-cover-letter/",
        data
    );

    return response.data;
}

export async function jobMatch(data) {
    const response = await API.post(
        "/ai-resume/job-match/",
        data
    );

    return response.data;
}







// import API from "../api/axios";

// /*
//  AI Resume - Professional Summary
// */

// export async function generateSummary(data) {

//     const response = await API.post(
//         "/ai/summary/",
//         data
//     );

//     return response.data;

// }

// /*
//  AI Resume - Improve Experience
// */

// export async function improveExperience(description) {

//     const response = await API.post(
//         "/ai/improve-experience/",
//         {
//             description,
//         }
//     );

//     return response.data;

// }

// /*
//  AI Resume - Generate Project Description
// */

// export async function generateProject(data) {

//     const response = await API.post(
//         "/ai/generate-project/",
//         data
//     );

//     return response.data;

// }

// /*
//  AI Resume - Generate Cover Letter
// */

// export async function generateCoverLetter(data) {

//     const response = await API.post(
//         "/ai/generate-cover-letter/",
//         data
//     );

//     return response.data;

// }

// /*
//  AI Resume - Job Match Analysis
// */

// export async function analyzeJobMatch(data) {

//     const response = await API.post(
//         "/ai/job-match/",
//         data
//     );

//     return response.data;

// }



// /*
//  Save AI-generated summary into user's resume
// */

// export async function saveGeneratedSummary(summary) {
//     const response = await API.post(
//         "/ai-resume/save-summary/",
//         {
//             summary,
//         }
//     );

//     return response.data;
// }

