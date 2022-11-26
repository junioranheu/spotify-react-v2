export default function HabilitarHttp() {
    if (process.env.NODE_ENV === 'development') {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Permitir chamadas para a API para o servidor (getStaticProps) no ambiente de dev;
    }
}