import axios from "axios";
import store from "src/stores";

// Création d'un agent axios pour les requêtes générales
const axiosAgent = axios.create({
    baseURL: "https://apidemo.iut-bm.univ-fcomte.fr/herocorp",
});

// Création d'un agent axios pour les requêtes d'authentification
const authAxiosAgent = axios.create({
    baseURL: "https://apidemo.iut-bm.univ-fcomte.fr/authapi",
});

// Intercepteur pour ajouter le mot de passe de l'organisation aux requêtes
axiosAgent.interceptors.request.use(
    (config) => {
        const secret = store.state.secret.OrganisationPassword;
        if (secret) {
            config.headers["org-secret"] = secret;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Intercepteur pour ajouter le token XSRF aux requêtes d'authentification
authAxiosAgent.interceptors.request.use(
    (config) => {
        const xsrfToken = localStorage.getItem("xsrfToken");
        if (xsrfToken) {
            config.headers["x-xsrf-token"] = xsrfToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Gestion des erreurs
function handleError(serviceName, err) {
    if (err.response) {
        console.error(`ERROR in ${serviceName}:`, err.response);
        return {
            data: {
                error: 1,
                data: err.response.data,
            },
        };
    } else if (err.request) {
        console.error(`NETWORK ERROR in ${serviceName}:`, err.request);
        return {
            data: {
                error: 1,
                data: "Le serveur est injoignable ou l'URL demandée n'existe pas",
            },
        };
    } else {
        console.error(`UNKNOWN ERROR in ${serviceName}`);
        return {
            data: {
                error: 1,
                data: "Erreur inconnue",
            },
        };
    }
}

// Fonctions génériques pour les requêtes HTTP
async function getRequest(uri, name, config = {}) {
    try {
        const response = await axiosAgent.get(uri, config);
        return response.data;
    } catch (err) {
        return handleError(name, err).data;
    }
}

async function postRequest(uri, data, name, config = {}) {
    try {
        const response = await axiosAgent.post(uri, data, config);
        return response.data;
    } catch (err) {
        return handleError(name, err).data;
    }
}

async function patchRequest(uri, data, name, config = {}) {
    try {
        const response = await axiosAgent.patch(uri, data, config);
        return response.data;
    } catch (err) {
        return handleError(name, err).data;
    }
}

async function putRequest(uri, data, name, config = {}) {
    try {
        const response = await axiosAgent.put(uri, data, config);
        return response.data;
    } catch (err) {
        return handleError(name, err).data;
    }
}

export {
    getRequest,
    postRequest,
    patchRequest,
    putRequest,
    axiosAgent,
    authAxiosAgent,
};