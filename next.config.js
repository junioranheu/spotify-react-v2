/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true, // Habilitar minify em produção;

    images: {
        domains: ['localhost', 'spotifyapi.azurewebsites.net'], // Permitir imagens dos domínios;
    },
}

module.exports = nextConfig
