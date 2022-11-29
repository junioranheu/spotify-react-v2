import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../../api/urlApi';

const ENDPOINTS = {
    GET_UPLOAD_PROTEGIDO_BASE64: 'api/UploadProtegido/getArquivoProtegidoBase64',
    GET_UPLOAD_PROTEGIDO_STREAM: 'api/UploadProtegido/getArquivoProtegidoStream',
    GET_UPLOAD_PROTEGIDO_STREAM_BUFFER: 'api/UploadProtegido/getArquivoProtegidoStreamBuffer'
};

const DEV = {
    API_URL_GET_UPLOAD_PROTEGIDO_BASE64: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_UPLOAD_PROTEGIDO_BASE64}`,
    API_URL_GET_UPLOAD_PROTEGIDO_STREAM: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_UPLOAD_PROTEGIDO_STREAM}`,
    API_URL_GET_UPLOAD_PROTEGIDO_STREAM_BUFFER: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_UPLOAD_PROTEGIDO_STREAM_BUFFER}`
};

const PROD = {
    API_URL_GET_UPLOAD_PROTEGIDO_BASE64: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_UPLOAD_PROTEGIDO_BASE64}`,
    API_URL_GET_UPLOAD_PROTEGIDO_STREAM: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_UPLOAD_PROTEGIDO_STREAM}`,
    API_URL_GET_UPLOAD_PROTEGIDO_STREAM_BUFFER: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_UPLOAD_PROTEGIDO_STREAM_BUFFER}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;