


import API from "../api/axios";

// Candidate Resume

export async function getResume() {

    const response = await API.get(
        "/resume/"
    );

    return response.data;

}

// export async function getResume() {

//     const response = await API.get(
//         "/resume/builder/"
//     );

//     return response.data;

// }


export async function downloadResumePdf(
    template = "ats"
) {

    const response = await API.get(
        `/resume/pdf/?template=${template}`,
        {
            responseType: "blob",
        }
    );

    return response.data;

}

export async function downloadResumeDocx(
    template = "ats"
) {

    const response = await API.get(
        `/resume/docx/?template=${template}`,
        {
            responseType: "blob",
        }
    );

    return response.data;

}

export async function saveResumeTemplate(
    template
) {

    const response = await API.post(
        "/resume/template/",
        {
            template,
        }
    );

    return response.data;

}

export async function getResumeTemplates() {

    const response = await API.get(
        "/resume/templates/"
    );

    return response.data;

}


export async function downloadResume(template = "ats") {
    const response = await API.get(
        `/profiles/resume/download/?template=${template}`,
        {
            responseType: "blob",
        }
    );

    return response.data;
}

// Resume Score

export async function getResumeScore() {

    const response = await API.get(
        "/resume/score/"
    );

    return response.data;

}


// Employer Resume Viewer

export async function getCandidateResume(userId) {

    const response = await API.get(
        `/resume/candidate/${userId}/`
    );

    return response.data;

}




// import api from "./api";
// import API from "../api/axios";

// export async function getResume() {

//     const response = await API.get("/resume/");

//     return response.data;

// }

