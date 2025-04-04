import { getRequest, postRequest, patchRequest } from "src/services/axios.service";

async function getAllOrganisationNames() {
    return await getRequest("/orgs/get", "getAllOrganisationNames");
}

async function createOrganisation(name, secret) {
    return await postRequest("/orgs/create", { name, secret }, "createOrganisation");
}

async function addTeam(idTeam, secret) {
    return await patchRequest(
        "/orgs/addteam",
        { idTeam },
        "addTeam",
        { params: { "org-secret": secret } }
    );
}

async function removeTeam(idTeam, secret) {
    return await patchRequest(
        "/orgs/removeteam",
        { idTeam },
        "removeTeam",
        { params: { "org-secret": secret } }
    );
}

async function getOrganisationByID(id, secret) {
    return await getRequest(
        `/orgs/getbyid/${id}`,
        "getOrganisationByID",
        { params: { "org-secret": secret } }
    );
}

export {
    getAllOrganisationNames,
    createOrganisation,
    addTeam,
    removeTeam,
    getOrganisationByID,
};