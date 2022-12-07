import moment from 'moment';
import Head from 'next/head';
import Router from 'next/router';
import { ChangeEvent, Fragment, useContext, useState } from 'react';
import Botao from '../../../components/outros/botao';
import Input from '../../../components/outros/input';
import TopHat from '../../../components/outros/topHat';
import Musica from '../../../components/svg/musica';
import Styles from '../../../styles/form.module.scss';
import CONSTS_ERROS from '../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { UsuarioContext } from '../../../utils/context/usuarioContext';
import validarDataNascimento from '../../../utils/outros/validacoes/validar.dataNascimento';
import DivSelecionarArquivo from './divSelecionarArquivo';
import iFormData from './iFormData';

export default function Index() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];
    
    const [formData, setFormData] = useState<iFormData>({
        nome: '',
        dataLancamento: moment().format('yyyy-MM-DD'),
        localMp3Nome: '',
        localMp3Base64: '',
        urlYoutube: 'https://www.youtube.com/watch?v=uuFfyIZ8qWI&t=3s&ab_channel=BatalhadoTanque'
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e?.target?.name]: e?.target?.value });
    }

    // Ao clicar no botão para entrar;
    async function handleSubmit() {
        console.log(formData);
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

    // function instrucaoErro(msg: string, isExibirAviso: boolean) {
    //     nProgress.done();
    //     refSenha.current.value = '';
    //     formData.senha = '';
    //     refUsuario.current.select();
    //     refBtn.current.disabled = false;

    //     if (isExibirAviso) {
    //         Aviso.warn(msg, 5000);
    //     }
    // }

    if (!isAuth) {
        Router.push({ pathname: CONSTS_TELAS.ERRO, query: { erro: CONSTS_ERROS.SEM_ACESSO } });
        return false;
    }

    return (
        <Fragment>
            <Head>
                <title>{CONSTS_SISTEMA.NOME_SISTEMA} — Subir música</title>
            </Head>

            <section className={Styles.main}>
                <div className={Styles.mainInner}>
                    <TopHat Svg={<Musica width='0.8rem' />} titulo='Subir nova música' backgroundColor='var(--super-preto)' fontColor='var(--branco-escuro)' />

                    <div className={`${Styles.sessao} margem0_5`}>
                        <Input
                            titulo='Título da música'
                            placeholder=''
                            name='nome'
                            tipo='text'
                            isDisabled={false}
                            minCaracteres={2}
                            dataTip='O título da música deve ter pelo menos 2 caracteres!'
                            value={formData.nome}
                            mascara=''
                            referencia={null}
                            isExibirIconeDireita={true}
                            isExisteValidacaoExtra={false}
                            handleValidacaoExtra={null}
                            handleChange={handleChange}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <span className='separadorHorizontal'></span>
                        <Input
                            titulo='Data de lançamento da música'
                            placeholder=''
                            name='dataLancamento'
                            tipo='date'
                            isDisabled={false}
                            minCaracteres={0}
                            dataTip='Essa é pra quem sabe ou tem memória boa'
                            value={moment(formData?.dataLancamento).format('yyyy-MM-DD')}
                            mascara=''
                            referencia={null}
                            isExibirIconeDireita={true}
                            isExisteValidacaoExtra={true}
                            handleValidacaoExtra={validarDataNascimento(moment(formData?.dataLancamento).format('yyyy-MM-DD'))}
                            handleChange={handleChange}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <DivSelecionarArquivo
                            formData={formData}
                            setFormData={setFormData}
                            handleChange={handleChange}
                        />

                        <span className='separadorHorizontal'></span>
                        <div className={Styles.divBotao}>
                            <Botao texto='Subir música' url={null} isNovaAba={false} handleFuncao={() => handleSubmit()} Svg={null} refBtn={null} isEnabled={true} />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}