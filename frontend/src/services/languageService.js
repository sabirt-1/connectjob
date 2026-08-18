


// import api from "./api";
import API from "../api/axios";

export async function getLanguages() {

    const response = await API.get("/profiles/language/");

    return response.data;

}

export async function createLanguage(data) {

    const response = await API.post(

        "/profiles/language/create/",

        data

    );

    return response.data;

}

export async function updateLanguage(id, data) {

    const response = await API.patch(

        `/profiles/language/update/${id}/`,

        data

    );

    return response.data;

}

export async function deleteLanguage(id) {

    const response = await API.delete(

        `/profiles/language/delete/${id}/`

    );

    return response.data;

}

