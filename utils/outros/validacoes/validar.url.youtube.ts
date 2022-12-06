// https://stackoverflow.com/a/2256941
export default function validarUrlYoutube(url: string) {
    const isValid = /((http|https):\/\/)?(www\.)?(youtube\.com)(\/)?([a-zA-Z0-9\-\.]+)\/?/.test(url);
    console.log(url, isValid);

    return isValid;
}