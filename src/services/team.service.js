import { getRequest, postRequest, patchRequest } from "src/services/axios.service";

async function getAllTeams() {
    return await getRequest("/teams/get", "getAllTeams");
}

async function createTeam(name) {
    return await postRequest("/teams/create", { name }, "createTeam");
}

async function addHeroes(idTeam, idHeroes) {
    return await patchRequest(
        "/teams/addheroes",
        { idTeam, idHeroes },
        "addHeroes"
    );
}

async function removeHeroes(idTeam, idHeroes) {
    return await patchRequest(
        "/teams/removeheroes",
        { idTeam, idHeroes },
        "removeHeroes"
    );
}

export {
    getAllTeams,
    createTeam,
    addHeroes,
    removeHeroes,
};