import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import { ChangeEvent, Fragment, KeyboardEvent, useContext, useRef, useState } from 'react';
import Botao from '../../components/outros/botao';
import { Fetch } from '../../utils/api/fetch';
import CONSTS_AUTENTICAR from '../../utils/consts/data/constAutenticar';
import CONSTS_ERROS from '../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../utils/consts/outros/telas';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import { Aviso } from '../../utils/outros/aviso';
import iContextDadosUsuario from '../../utils/types/context.dadosUsuario';
import iUsuario from '../../utils/types/iUsuario';
import Styles from './entrar.module.scss';

interface iFormData {
    usuario: string;
    senha: string;
}

export default function Index() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const refUsuario = useRef<HTMLInputElement | any>(null);
    const refSenha = useRef<HTMLInputElement | any>(null);
    const refBtn = useRef<HTMLButtonElement | any>(null);

    if (isAuth) {
        Router.push({ pathname: CONSTS_TELAS.ERRO, query: { erro: CONSTS_ERROS.AUTENTICADO } });
        return false;
    }

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const [formData, setFormData] = useState<iFormData>({ usuario: '', senha: '' });
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Ao clicar no botão para entrar;
    async function handleSubmit() {
        nProgress.start();
        refBtn.current.disabled = true;

        if (!formData || !formData.usuario || !formData.senha) {
            instrucaoErro('O nome de usuário e/ou e-mail estão vazios!', true);
            return false;
        }

        const url = CONSTS_AUTENTICAR.API_URL_POST_LOGIN;
        const dto = {
            email: formData.usuario,
            nomeUsuarioSistema: formData.usuario,
            senha: formData.senha
        };

        const resposta = await Fetch.postApi(url, dto) as iUsuario;
        if (!resposta || resposta?.erro) {
            // setModalAvisoLoginDescricao((resposta?.mensagemErro ? `Parece que ${resposta?.mensagemErro.toLowerCase()}. Tente novamente mais tarde` : 'Algo deu errado! Provavelmente o usuário e/ou a senha estão errados'));
            // setIsModalAvisoLoginOpen(true);
            instrucaoErro('', false);
            return false;
        }

        // Voltar à tela principal;
        Router.push('/').then(() => {
            // Atribuir autenticação ao contexto de usuário;
            Auth.set(resposta as unknown as iContextDadosUsuario);
            setIsAuth(true);
            nProgress.done();
        });
    }

    function instrucaoErro(msg: string, isExibirAviso: boolean) {
        nProgress.done();
        refSenha.current.value = '';
        formData.senha = '';
        refUsuario.current.select();
        refBtn.current.disabled = false;

        if (isExibirAviso) {
            Aviso.warn(msg, 5000);
        }
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            refBtn.current && refBtn.current.click();
        }
    }

    return (
        <Fragment>
            <Head>
                <title>{CONSTS_SISTEMA.NOME_SISTEMA} — Entrar</title>
            </Head>

            <section className={Styles.container}>
                <div className={Styles.containerInner}>
                    <span className={Styles.titulo}>Bem-vindo ao {CONSTS_SISTEMA.NOME_SISTEMA}</span>

                    <div>
                        <input className='input margem1' type='text' placeholder='E-mail ou nome de usuário'
                            name='usuario' onChange={handleChange} ref={refUsuario} onKeyPress={handleKeyPress}
                        />

                        <input className='input margem1' type='password' placeholder='Senha'
                            name='senha' onChange={handleChange} ref={refSenha} onKeyPress={handleKeyPress}
                        />

                        <div className={`${Styles.botaoCustom} margem1`} onClick={() => handleSubmit()}>
                            <Botao texto='Entrar' url={null} isNovaAba={false} handleFuncao={null} Svg={null} refBtn={refBtn} isEnabled={true} />
                        </div>
                    </div>

                    <div className={Styles.divCode}>
                        <code>
                            Por enquanto não é possível criar uma nova conta.<br />
                            Entre com o usuário <b className='cor-principal'>usuario</b> e a senha <b className='cor-principal'>123</b>.
                        </code>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}