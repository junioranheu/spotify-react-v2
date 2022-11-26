import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../outros/urlApi';

const ENDPOINTS = {
    GET_TODOS: 'api/Musicas/todos',
    GET_POR_ID: 'api/Musicas',
    GET_POR_PLAYLIST: 'api/Musicas/porPlaylist',
};

const DEV = {
    API_URL_GET_TODOS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_POR_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_POR_ID}`,
    API_URL_POR_PLAYLIST: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_POR_PLAYLIST}`
};

const PROD = {
    API_URL_GET_TODOS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_POR_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_POR_ID}`,
    API_URL_POR_PLAYLIST: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_POR_PLAYLIST}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;