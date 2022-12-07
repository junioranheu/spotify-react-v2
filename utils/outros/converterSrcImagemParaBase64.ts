// https://stackoverflow.com/a/20285053
const converterSrcImagemParaBase64 = (src: string) => fetch(src)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    }));

export default converterSrcImagemParaBase64;