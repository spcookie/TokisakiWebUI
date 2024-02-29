import Http from "~/api/request.js";

export async function getAllRobot() {
    return Http.Client.post('/robot/manager/example', null, {})
}

export async function getLoginCode(id) {
    return Http.Client.get(`/robot/qq/login/code/${id}`)
}