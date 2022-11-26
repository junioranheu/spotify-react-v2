import Router from 'next/router';
import nProgress from 'nprogress';
import CONSTS_AUTENTICAR from '../../utils/consts/data/constAutenticar';
import CONSTS_ERROS from '../consts/outros/erros';
import CONSTS_SISTEMA from '../consts/outros/sistema';
import VERBOS_HTTP from '../consts/outros/verbosHTTP';
import { Auth } from '../context/usuarioContext';
import { Aviso } from '../outros/aviso';
import desabilitarTodosElementos from '../outros/desabilitarTodosElementos';
import numeroAleatorio from '../outros/gerarNumeroAleatorio';
import horarioBrasilia from '../outros/horarioBrasilia';
import iContextDadosUsuario from '../types/context.dadosUsuario';

export const Fetch = {
    async getApi(url: string, isTentarRefreshToken: boolean = true) {
        const token = Auth?.get()?.token ?? '';
        let respostaJson;
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        try {
            let resposta = await fetch(url, {
                method: VERBOS_HTTP.GET,
                headers: headers
            });

            // console.log(resposta);

            respostaJson = await resposta.json();
            // console.log(respostaJson);
            // console.log(respostaJson.status);

            // Caso o respostaJson.status seja diferente de nulo, é porque algo deu erro...
            // Exemplo: erros 404, 400 ou 401, quando um usuário escreve na barra e procura por um ID que não existe;
            if (respostaJson.status) {
                console.log(`Erro ${respostaJson.status} em ${url}. Tipo de erro: ${respostaJson.title}`);
                respostaJson = null;
            }
        } catch (erro: any) {
            const e = {
                'url': url,
                'token': token,
                'erro': erro.message,
                'data': horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            // Aviso.error('Houve uma falha na requisição GET ao servidor!', 5000);

            // Se o usuário tem um token e foi erro 401, chame o end-point de refresh token;
            respostaJson = await Fetch.refreshToken(token, erro.message, VERBOS_HTTP.GET, url, null, isTentarRefreshToken);
        }

        return respostaJson;
    },

    async postApi(url: string, body: string | any | null, isTentarRefreshToken: boolean = true) {
        let respostaJson = await Fetch.conteudoPostPutDelete(VERBOS_HTTP.POST, url, body, isTentarRefreshToken);
        return respostaJson;
    },

    async putApi(url: string, body: string | any | null, isTentarRefreshToken: boolean = true) {
        let respostaJson = await Fetch.conteudoPostPutDelete(VERBOS_HTTP.PUT, url, body, isTentarRefreshToken);
        return respostaJson;
    },

    async deleteApi(url: string, body: string | any | null, isTentarRefreshToken: boolean = true) {
        let respostaJson = await Fetch.conteudoPostPutDelete(VERBOS_HTTP.DELETE, url, body, isTentarRefreshToken);
        return respostaJson;
    },

    async conteudoPostPutDelete(verboHTTP: string, url: string, body: string | any | null, isTentarRefreshToken: boolean = true) {
        const token = Auth?.get()?.token ?? '';
        let respostaJson;
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        try {
            let resposta = await fetch(url, {
                method: verboHTTP,
                headers: headers,
                body: JSON.stringify(body)
            });

            respostaJson = await resposta.json();
            // console.log(respostaJson);
            // console.log(respostaJson.status);

            // Caso o respostaJson.status seja diferente de nulo, é porque algo deu erro...
            // Exemplo: erros 404, 400 ou 401, quando um usuário escreve na barra e procura por um ID que não existe;
            if (respostaJson.status) {
                console.log(`Erro ${respostaJson.status} em ${url}. Tipo de erro: ${respostaJson.title}`);
                respostaJson = null;
            }
        } catch (erro: any) {
            const e = {
                'url': url,
                'body': body,
                'token': token,
                'erro': erro.message,
                'data': horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            // Aviso.error('Houve uma falha na requisição POST ao servidor!', 5000);

            // Se o usuário tem um token e foi erro 401, chame o end-point de refresh token;
            respostaJson = await Fetch.refreshToken(token, erro.message, verboHTTP, url, body, isTentarRefreshToken);
        }

        return respostaJson;
    },

    async refreshToken(token: string, erro: any, verboHTTP: string, url: string | null, body: string | null, isTentarRefreshToken: boolean): Promise<any> {
        if (token && erro === 'Unexpected end of JSON input' && isTentarRefreshToken) {
            const urlRefreshToken = CONSTS_AUTENTICAR.API_URL_POST_REFRESH_TOKEN;
            const dto = {
                token: token,
                refreshToken: (Auth?.get()?.refreshToken ?? '')
            };

            // Fazer requisição para o end-point de refresh token
            const respostaRefreshToken = await Fetch.postApi(urlRefreshToken, dto);
            if (!respostaRefreshToken || respostaRefreshToken?.erro) {
                console.log(respostaRefreshToken?.mensagemErro ?? 'Houve um erro ao gerar o refresh token');
                Fetch.deslogarUsuarioRefreshTokenInvalido();
                return false;
            }

            // Atualizar dados no local storage;
            const dadosUsuario = {
                token: respostaRefreshToken.token,
                refreshToken: respostaRefreshToken.refreshToken
            } as iContextDadosUsuario;

            Auth.update(dadosUsuario);
            
            const msgRefreshTokenAtualizado = 'Refresh token atualizado';
            console.log(msgRefreshTokenAtualizado);

            if (process.env.NODE_ENV === 'development') {
                Aviso.success(msgRefreshTokenAtualizado, 5000);
            }

            // Tentar novamente a chamada para o end-point requisitado, mas agora com o novo token;
            let respostaJson;

            if (url) {
                try {
                    if (verboHTTP === VERBOS_HTTP.GET) {
                        respostaJson = await Fetch.getApi(url, false);
                    } else if (verboHTTP === VERBOS_HTTP.POST) {
                        respostaJson = await Fetch.postApi(url, body, false);
                    } else if (verboHTTP === VERBOS_HTTP.PUT) {
                        respostaJson = await Fetch.putApi(url, body, false);
                    } else if (verboHTTP === VERBOS_HTTP.DELETE) {
                        respostaJson = await Fetch.deleteApi(url, body, false);
                    }
                } catch (error) {
                    Fetch.deslogarUsuarioRefreshTokenInvalido();
                    return false;
                }
            }

            return respostaJson;
        }
    },

    deslogarUsuarioRefreshTokenInvalido() {
        nProgress.start();
        desabilitarTodosElementos(true);
        Aviso.custom(`A sua sessão expirou!<br/><br/>Renove sua sessão fazendo login novamente no ${CONSTS_SISTEMA.NOME_SISTEMA} 😎`, numeroAleatorio(1000, 2000));

        Router.push({ pathname: '/erro/sessao-expirada', query: { erro: CONSTS_ERROS.REFRESH_TOKEN_INVALIDO } }).then(() => {
            Auth.delete();
            nProgress.done();

            setTimeout(function () {
                location.reload();
            }, numeroAleatorio(100, 150));
        });
    }
}