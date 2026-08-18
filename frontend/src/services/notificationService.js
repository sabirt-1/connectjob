


import API from "../api/axios";


export async function getNotifications() {

    const response =
        await API.get(
            "/notifications/"
        );

    return response.data;

}


export async function getUnreadNotificationCount() {

    const response =
        await API.get(
            "/notifications/unread-count/"
        );

    return response.data.count;

}


export async function markNotificationRead(
    id
) {

    return API.patch(
        `/notifications/${id}/read/`
    );

}


export async function markAllNotificationsRead() {

    return API.patch(
        "/notifications/read-all/"
    );

}

