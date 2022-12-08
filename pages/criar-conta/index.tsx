import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import nProgress from 'nprogress';
import { ChangeEvent, Fragment, KeyboardEvent, useContext, useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import Botao from '../../components/outros/botao';
import { Fetch } from '../../utils/api/fetch';
import CONSTS_AUTENTICAR from '../../utils/consts/data/constAutenticar';
import CONSTS_ERROS from '../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../utils/consts/outros/telas';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import { Aviso } from '../../utils/outros/aviso';
import horarioBrasilia from '../../utils/outros/horarioBrasilia';
import padronizarNomeCompletoUsuario from '../../utils/outros/padronizarNomeCompletoUsuario';
import validarDadosCriarConta from '../../utils/outros/validarDadosCriarConta';
import iContextDadosUsuario from '../../utils/types/iContext.dadosUsuario';
import iUsuario from '../../utils/types/iUsuario';
import Styles from './entrar.module.scss';

interface iFormData {
    nomeCompleto: string;
    email: string;
    nomeUsuarioSistema: string;
    senha: string;
    confirmarSenha: string;
}

export default function CriarConta() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const refNomeCompleto = useRef<HTMLInputElement | any>(null);
    const refEmail = useRef<HTMLInputElement | any>(null);
    const refNomeUsuarioSistema = useRef<HTMLInputElement | any>(null);
    const refSenha = useRef<HTMLInputElement | any>(null);
    const refConfirmarSenha = useRef<HTMLInputElement | any>(null);
    const refBtn = useRef<HTMLButtonElement | any>(null);

    const msgTermos = `Ao criar uma conta,<br/>você está de acordo com os termos de serviço<br/>e a política de privacidade do ${CONSTS_SISTEMA.NOME_SISTEMA}`;

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const [formData, setFormData] = useState<iFormData>({ nomeCompleto: '', email: '', nomeUsuarioSistema: '', senha: '', confirmarSenha: '' });
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Ao clicar no botão para entrar;
    async function handleSubmit() {
        nProgress.start();
        refBtn.current.disabled = true;

        // Verificações;
        const isTrocouSenha = true;
        let isContinuarUm = validarDadosCriarConta(formData, refNomeCompleto, refEmail, refNomeUsuarioSistema, refSenha, refConfirmarSenha, isTrocouSenha);
        if (!isContinuarUm) {
            refBtn.current.disabled = false;
            return false;
        }

        // Atribuir o nome formatado para a variavel nome, novamente;
        formData.nomeCompleto = padronizarNomeCompletoUsuario(formData.nomeCompleto);

        // Criar conta;
        const url = CONSTS_AUTENTICAR.API_URL_POST_REGISTRAR;
        const dto = {
            nomeCompleto: formData.nomeCompleto,
            email: formData.email,
            nomeUsuarioSistema: formData.nomeUsuarioSistema,
            senha: formData.senha,
            usuarioTipoId: 2, // Usuário comum;
            dataCriacao: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss'),
            foto: '',
            isAtivo: true,
            isPremium: false,
            IsVerificado: false
        };

        const resposta = await Fetch.postApi(url, dto) as iUsuario;
        if (!resposta || resposta?.erro) {
            nProgress.done();
            refEmail.current.select();
            refSenha.current.value = '';
            refConfirmarSenha.current.value = '';
            formData.senha = '';
            refBtn.current.disabled = false;
            Aviso.error((resposta?.mensagemErro ?? 'Parece que ocorreu um erro interno. Tente novamente mais tarde'), 10000);
            return false;
        }

        // Voltar à tela principal;
        Router.push('/').then(() => {
            Auth.set(resposta as unknown as iContextDadosUsuario);
            setIsAuth(true);
            nProgress.done();
        });
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            refBtn.current && refBtn.current.click();
        }
    }

    function handleKeyPressNaoPermitirEspaco(e: ChangeEvent<HTMLInputElement>) {
        e.target.value = e.target.value.replace(' ', '');
    }

    if (isAuth) {
        Router.push({ pathname: CONSTS_TELAS.ERRO, query: { erro: CONSTS_ERROS.AUTENTICADO } });
        return false;
    }

    return (
        <Fragment>
            <Head>
                <title>Criar conta • {CONSTS_SISTEMA.NOME_SISTEMA}</title>
            </Head>

            {/* Conteúdo */}
            <section className={Styles.container}>
                <div className={Styles.containerInner}>
                    <span className={Styles.titulo}>Crie sua conta no {CONSTS_SISTEMA.NOME_SISTEMA}</span>

                    <div>
                        <input className='input margem1' type='text' placeholder='Nome completo'
                            name='nomeCompleto' onChange={handleChange} ref={refNomeCompleto} onKeyPress={handleKeyPress}
                        />

                        <input className='input margem1' type='text' placeholder='Seu melhor e-mail'
                            name='email' onChange={handleChange} ref={refEmail} onKeyPress={handleKeyPress}
                        />

                        <input className='input margem1' type='text' placeholder='Nome de usuário'
                            name='nomeUsuarioSistema'
                            onChange={(e) => (handleChange(e), handleKeyPressNaoPermitirEspaco(e))}
                            ref={refNomeUsuarioSistema} onKeyPress={handleKeyPress}
                        />

                        <input className='input margem1' type='password' placeholder='Senha'
                            name='senha' onChange={handleChange} ref={refSenha} onKeyPress={handleKeyPress}
                        />

                        <input className='input margem1' type='password' placeholder='Confirme sua senha'
                            name='confirmarSenha' onChange={handleChange} ref={refConfirmarSenha} onKeyPress={handleKeyPress}
                        />

                        <ReactTooltip multiline={true} />
                        <div className={`${Styles.botaoCustom} margem1`} onClick={() => handleSubmit()} data-tip={msgTermos}>
                            <Botao texto='Criar conta' url={null} isNovaAba={false} handleFuncao={null} Svg={null} refBtn={refBtn} isEnabled={true} />
                        </div>
                    </div>

                    <div className={Styles.divCode}>
                        <code>
                            Já tem uma conta? Entre agora mesmo <Link href={CONSTS_TELAS.ENTRAR} title='Criar nova conta'><b className='cor-principal'>aqui</b></Link>.
                        </code>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}