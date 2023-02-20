import { detectIncognito } from 'detectincognitojs'; // https://github.com/Joe12387/detectIncognito

export default async function pegarNomeNavegador(): Promise<string> {
    try {
        return new Promise((resolve, reject) => {
            detectIncognito().then((result) => {
                // console.log(result.browserName, result.isPrivate);
                resolve(result.browserName);
            });
        });

    } catch (error) {
        return '';
    }
}