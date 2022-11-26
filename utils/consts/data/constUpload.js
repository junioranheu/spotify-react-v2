import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../outros/urlApi';

const ENDPOINTS = {
    GET_PLAYLIST: 'Upload/playlists',
    GET_CAPA: 'Upload/capas',
    GET_MUSIC: 'Upload/music'
};

const DEV = {
    API_URL_GET_PLAYLIST: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_PLAYLIST}`,
    API_URL_GET_CAPA: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_CAPA}`,
    API_URL_GET_MUSIC: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_MUSIC}`
};

const PROD = {
    API_URL_GET_PLAYLIST: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_PLAYLIST}`,
    API_URL_GET_CAPA: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_CAPA}`,
    API_URL_GET_MUSIC: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_MUSIC}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;