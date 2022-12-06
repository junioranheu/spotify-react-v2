import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../../api/urlApi';

const ENDPOINTS = {
    GET_TODOS: 'api/Playlists/todos',
    GET_BY_ID: 'api/Playlists',
    GET_BY_USUARIO_ID: 'api/Playlists/byUsuarioId'
};

const DEV = {
    API_URL_GET_TODOS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_BY_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_BY_ID}`,
    API_URL_GET_BY_USUARIO_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_BY_USUARIO_ID}`
};

const PROD = {
    API_URL_GET_TODOS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_BY_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_BY_ID}`,
    API_URL_GET_BY_USUARIO_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_BY_USUARIO_ID}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;