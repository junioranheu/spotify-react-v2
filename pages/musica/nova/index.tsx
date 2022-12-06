import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import nProgress from 'nprogress';
import { ChangeEvent, Fragment, KeyboardEvent, useContext, useRef, useState } from 'react';
import Botao from '../../../components/outros/botao';
import CONSTS_ERROS from '../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { UsuarioContext } from '../../../utils/context/usuarioContext';
import { Aviso } from '../../../utils/outros/aviso';
import Styles from './nova.module.scss';

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

    const [modalAvisoLoginDescricao, setModalAvisoLoginDescricao] = useState('');
    const [isModalAvisoLoginOpen, setIsModalAvisoLoginOpen] = useState(false);

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const [formData, setFormData] = useState<iFormData>({ usuario: '', senha: '' });
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Ao clicar no botão para entrar;
    async function handleSubmit() {
        // nProgress.start();
        // refBtn.current.disabled = true;

        // if (!formData || !formData.usuario || !formData.senha) {
        //     instrucaoErro('O <b>nome de usuário</b> e/ou <b>e-mail</b> estão vazios!', true);
        //     return false;
        // }

        // const url = CONSTS_AUTENTICAR.API_URL_POST_LOGIN;
        // const dto = {
        //     email: formData.usuario,
        //     nomeUsuarioSistema: formData.usuario,
        //     senha: formData.senha
        // };

        // const resposta = await Fetch.postApi(url, dto) as iUsuario;
        // if (!resposta || resposta?.erro) {
        //     setModalAvisoLoginDescricao((resposta?.mensagemErro ? `Parece que ${resposta?.mensagemErro.toLowerCase()}. Tente novamente mais tarde` : 'Algo deu errado! Provavelmente o usuário e/ou a senha estão errados'));
        //     setIsModalAvisoLoginOpen(true);
        //     instrucaoErro('', false);
        //     return false;
        // }

        // // Voltar à tela principal;
        // Router.push('/').then(() => {
        //     // Atribuir autenticação ao contexto de usuário;
        //     Auth.set(resposta as unknown as iContextDadosUsuario);
        //     setIsAuth(true);
        //     nProgress.done();
        // });
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

    if (!isAuth) {
        Router.push({ pathname: CONSTS_TELAS.ERRO, query: { erro: CONSTS_ERROS.SEM_ACESSO } });
        return false;
    }

    return (
        <Fragment>
            <Head>
                <title>{CONSTS_SISTEMA.NOME_SISTEMA} — Subir música</title>
            </Head>

            <section className={Styles.container}>
                <div className={Styles.containerInner}>
                    <span className={Styles.titulo}>Suba uma nova música</span>

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
                            Não tem uma conta? Crie sua conta <Link href={CONSTS_TELAS.CRIAR_CONTA} title='Criar nova conta'><b className='cor-principal'>aqui</b></Link>.
                        </code>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}