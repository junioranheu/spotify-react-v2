export default function ajustarUrl(url: string) {
    // console.log(url);
    let urlAjustada = url.normalize('NFD').replace(/\p{Diacritic}/gu, ''); // Remover acentuação e letras estranhas;
    urlAjustada = urlAjustada.replace(/\s+/g, '-').toLowerCase(); // Trocar espaços por traços e deixar em minúsculo;
    urlAjustada = urlAjustada.replaceAll('?', '');
    urlAjustada = urlAjustada.replaceAll('!', '');
    urlAjustada = urlAjustada.replaceAll('~', '');
    urlAjustada = urlAjustada.replaceAll('<', '');
    urlAjustada = urlAjustada.replaceAll('>', '');
    urlAjustada = urlAjustada.replaceAll('(', '');
    urlAjustada = urlAjustada.replaceAll(')', '');
    urlAjustada = urlAjustada.replaceAll('$', '');
    urlAjustada = urlAjustada.replaceAll('%', '');
    urlAjustada = urlAjustada.replaceAll('{', '');
    urlAjustada = urlAjustada.replaceAll('}', '');
    urlAjustada = urlAjustada.replaceAll('[', '');
    urlAjustada = urlAjustada.replaceAll(']', '');
    urlAjustada = urlAjustada.replaceAll('_', '');
    urlAjustada = urlAjustada.replaceAll('*', '');
    urlAjustada = urlAjustada.replaceAll('+', '');
    urlAjustada = urlAjustada.replaceAll('¨', '');
    urlAjustada = urlAjustada.replaceAll('.', '');
    urlAjustada = urlAjustada.replaceAll(':', '-'); // Trocar dois pontos por traços;
    urlAjustada = urlAjustada.replaceAll('/', '-'); // Trocar barras por traços;
    urlAjustada = urlAjustada.replaceAll('\\', '-'); // Trocar barras invertidas por traços;
    urlAjustada = urlAjustada.replaceAll(',', '-'); // Trocar vírgulas por traços;
    urlAjustada = urlAjustada.replaceAll('#', 'sharp'); // # pela palavra "sharp";
    urlAjustada = urlAjustada.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, ''); // Remover todos os emojis;
    urlAjustada = urlAjustada.replace(/-$/, ''); // Se o último caracter for um -, remova-o;
    urlAjustada = urlAjustada.replaceAll('--', '-'); // Não permitir duplicar "-". Exemplo: "isso--e--um--teste";

    // console.log(`urlAjustada: ${urlAjustada}`);
    return urlAjustada;
}