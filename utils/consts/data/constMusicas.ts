import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../../api/urlApi';

const ENDPOINTS = {
    GET_TODOS: 'api/Musicas/todos',
    GET_BY_ID: 'api/Musicas',
    GET_BY_PLAYLIST: 'api/Musicas/byPlaylistId',
};

const DEV = {
    API_URL_GET_TODOS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_BY_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_BY_ID}`,
    API_URL_BY_PLAYLIST: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_BY_PLAYLIST}`
};

const PROD = {
    API_URL_GET_TODOS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_BY_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_BY_ID}`,
    API_URL_BY_PLAYLIST: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_BY_PLAYLIST}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;