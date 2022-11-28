import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../../api/urlApi';

const ENDPOINTS = {
    POST_LOGIN: 'api/Autenticar/login',
    POST_REGISTRAR: 'api/Autenticar/registrar',
    POST_REFRESH_TOKEN: 'api/Autenticar/refreshToken'
};

const DEV = {
    API_URL_POST_LOGIN: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_LOGIN}`,
    API_URL_POST_REGISTRAR: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_REGISTRAR}`,
    API_URL_POST_REFRESH_TOKEN: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_REFRESH_TOKEN}`
};

const PROD = {
    API_URL_POST_LOGIN: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_LOGIN}`,
    API_URL_POST_REGISTRAR: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_REGISTRAR}`,
    API_URL_POST_REFRESH_TOKEN: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_REFRESH_TOKEN}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTS;