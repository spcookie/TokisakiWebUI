import Http from "~/api/request.js";

export async function getDriveId() {
    await Http.Client.get('/wx/driveId')
}

export async function refreshCode() {
    await Http.Client.get('/wx/refreshCode')
}