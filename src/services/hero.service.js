import { getRequest, postRequest, putRequest, authAxiosAgent } from "src/services/axios.service";

async function getAliases() {
  return await getRequest("/heroes/getaliases", "getAliases");
}

async function createHero(hero) {
  return await postRequest("/heroes/create", hero, "createHero");
}

async function updateHero(hero, secret) {
  return await putRequest(
    "/heroes/update",
    hero,
    "updateHero",
    { params: { "org-secret": secret } }
  );
}

async function getHeroByID(id, secret) {
  return await getRequest(
    `/heroes/getbyid/${id}`,
    "getHeroByID",
    { params: { "org-secret": secret } }
  );
}

async function authUpdateHero(hero) {
  try {
    const response = await authAxiosAgent.put("/heroes/authupdate", hero);
    return response.data;
  } catch (err) {
    return {
      error: 1,
      data: err.response ? err.response.data : "Network error",
    };
  }
}

export {
  getAliases,
  createHero,
  updateHero,
  getHeroByID,
  authUpdateHero,
};