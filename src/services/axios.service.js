import axios from 'axios'
import { useSecretStore } from 'src/stores/modules/secret'

/* Explications :

Un agent axios permet de faire des requêtes asynchrones à un serveur.

Si l'appel réussit, l'agent axios renvoie un objet représentant la réponse (NB: dans les fonctions ci-dessous, on
met cet objet dans une variable nommée response). Cet objet contient un champ `data`, qui contient les données renvoyées
par l'API. Comme l'API renvoie toujours des données au format : {error: err_number, stats: http_status, data: ... }
on a donc :
   - response.data.error : permet de savoir s'il y a une erreur dans la requête
   - response.data.data : contient soit un message d'erreur, soit les données demandées.

En revanche, si l'appel à axios échoue, cela provoque la levée d'une exception avec un objet la
représentant (NB : variable nommée err dans le catch). Il y a 3 cas d'erreurs :
   - le serveur HTTP renvoie un status != 2XX (par ex 404, 500). C'est par exemple le cas en cas de route invalide,
   quand les données demandées n'existent pas, ...
   - le serveur ne répond pas, malgré le fait que la requête soit partie,
   - impossible d'envoyer la requête
Ces trois cas sont traités par une unique fonction handleError().
*/

// Création d'un agent axios, avec une configuration pour atteindre l'API
const axiosAgent = axios.create({
  baseURL: 'https://apidemo.iut-bm.univ-fcomte.fr/herocorp',
})

const authAxiosAgent = axios.create({
  baseURL: 'https://apidemo.iut-bm.univ-fcomte.fr/authapi',
})

// Intercepteur pour ajouter le mot de passe de l'organisation aux requêtes
axiosAgent.interceptors.request.use(
  (config) => {
    const secretStore = useSecretStore() // Utilisation de Pinia pour accéder au store
    const secret = secretStore.OrganisationPassword
    if (secret) {
      config.headers['org-secret'] = secret
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Intercepteur pour ajouter le token XSRF aux requêtes d'authentification
authAxiosAgent.interceptors.request.use(
  (config) => {
    const xsrfToken = localStorage.getItem('xsrfToken')
    if (xsrfToken) {
      config.headers['x-xsrf-token'] = xsrfToken
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Gestion des erreurs
function handleError(serviceName, err) {
  if (err.response) {
    // La requête a été reçue par le serveur mais celui-ci renvoie un status != 2XX
    console.error(`ERROR while calling SERVICE ${serviceName}:`, err.response)
    return {
      data: {
        error: 1,
        data: err.response.data,
      },
    }
  } else if (err.request) {
    // La requête a été envoyée mais aucune réponse reçue
    console.error(`NETWORK ERROR while calling SERVICE ${serviceName}:`, err.request)
    return {
      data: {
        error: 1,
        data: "Le serveur est injoignable ou l'URL demandée n'existe pas",
      },
    }
  } else {
    // Tout autre cas
    console.error(`UNKNOWN ERROR while calling SERVICE ${serviceName}`)
    return {
      data: {
        error: 1,
        data: 'Erreur inconnue',
      },
    }
  }
}

/* Fonctions génériques pour envoyer des requêtes HTTP

NB: ces fonctions n'échouent jamais et renvoient forcément un objet ayant la même structure que les données
renvoyées par l'API, même en cas d'erreur.
*/

/*
- uri est l'URI qui complète l'URL de base. Si on interroge une API REST,
  cela correspond donc à la route demandée, par ex /rpg/items/get
- name est un "surnom" de l'uri, pour les messages de debug
*/
async function getRequest(uri, name, config = {}) {
  let response = null
  try {
    response = await axiosAgent.get(uri, config)
  } catch (err) {
    response = handleError(name, err)
  }
  return response.data
}

// NB: pour une requête post/patch, les données associées à la requête sont transmises
// par axios sous la forme d'un objet JSON contenant ces données, et axios les transmet
// de façon compactée dans le "corps" de la requête (c.a.d. la partie body). Du côté serveur, il faut "analyser"
// le corps (donc utiliser le module body-parser) afin d'avoir le contenu de l'objet dans req.body.
// Dans la méthode ci-dessous, le paramètre data correspond à l'objet JSON
async function postRequest(uri, data, name, config = {}) {
  let response = null
  try {
    response = await axiosAgent.post(uri, data, config)
  } catch (err) {
    response = handleError(name, err)
  }
  return response.data
}

async function patchRequest(uri, data, name, config = {}) {
  let response = null
  try {
    response = await axiosAgent.patch(uri, data, config)
  } catch (err) {
    response = handleError(name, err)
  }
  return response.data
}

async function putRequest(uri, data, name, config = {}) {
  let response = null
  try {
    response = await axiosAgent.put(uri, data, config)
  } catch (err) {
    response = handleError(name, err)
  }
  return response.data
}

export {
  getRequest,
  postRequest,
  patchRequest,
  putRequest,
  axiosAgent,
  authAxiosAgent,
}