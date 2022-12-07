// https://stackoverflow.com/a/38936042
export default function urltoFile(url: string, fileName: string, mimeType: string) {
    mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];

    return (fetch(url)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], fileName, { type: mimeType }); })
    );
}