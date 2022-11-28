import UUID from './UUID';

export default async function converterStreamEmObjectURL(stream: any, nomeArquivo?: string | null) {
    // Converter para blob;
    const blob = await stream.blob();
    // console.log(blob);

    // Converter blob para mp3;
    const arquivoMp3 = new File([blob], nomeArquivo ?? UUID(), { type: 'audio/mpeg' });
    // console.log(arquivoMp3);

    // // Converter mp3 para url;
    const objectURL = URL.createObjectURL(arquivoMp3);
    // console.log(objectURL);

    return objectURL;
}