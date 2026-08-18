


// import api from "./api";
import API from "../api/axios";

export async function getCertifications() {

    const response = await API.get("/profiles/certification/");

    return response.data;

}

export async function createCertification(data) {

    const response = await API.post(

        "/profiles/certification/create/",

        data

    );

    return response.data;

}

export async function updateCertification(id, data) {

    const response = await API.patch(

        `/profiles/certification/update/${id}/`,

        data

    );

    return response.data;

}

export async function deleteCertification(id) {

    const response = await API.delete(

        `/profiles/certification/delete/${id}/`

    );

    return response.data;

}

