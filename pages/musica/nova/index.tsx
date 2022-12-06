import moment from 'moment';
import Head from 'next/head';
import Router from 'next/router';
import { ChangeEvent, Fragment, useContext, useRef, useState } from 'react';
import Botao from '../../../components/outros/botao';
import Input from '../../../components/outros/input';
import TopHat from '../../../components/outros/topHat';
import BotaoPlay from '../../../components/svg/botaoPlay';
import CONSTS_ERROS from '../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { UsuarioContext } from '../../../utils/context/usuarioContext';
import validarCompletoEmail from '../../../utils/outros/validacoes/validar.completo.email';
import validarCompletoNomeCompleto from '../../../utils/outros/validacoes/validar.completo.nomeCompleto';
import validarCompletoNomeUsuarioSistema from '../../../utils/outros/validacoes/validar.completo.nomeUsuarioSistema';
import validarCPF from '../../../utils/outros/validacoes/validar.cpf';
import validarDataNascimento from '../../../utils/outros/validacoes/validar.dataNascimento';
import validarNumeroTelefone from '../../../utils/outros/validacoes/validar.numeroTelefone';
import Styles from './nova.module.scss';

interface iFormData {
    nomeCompleto: string;
    nomeUsuarioSistema: string;
    email: string;
    senha: string;
    dataAniversario: string | Date | null;
    cpf: string | null;
    telefone: string | null;
}

export default function Index() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const refBtn = useRef<HTMLButtonElement | any>(null);
    const [isModalAlterarSenha, setIsModalAlterarSenha] = useState<boolean>(false);
    const minCaracteresNomeCompleto = 3;

    const [formDataDadosPessoais, setFormDataDadosPessoais] = useState<iFormData>({
        nomeCompleto: '',
        email: '',
        nomeUsuarioSistema: '',
        senha: '',
        dataAniversario: '',
        cpf: '',
        telefone: '',
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormDataDadosPessoais({ ...formDataDadosPessoais, [e?.target?.name]: e?.target?.value });
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
                    <TopHat Svg={<BotaoPlay width='12px' cor='var(--branco-escuro)' />} titulo='Subir nova música' backgroundColor='var(--super-preto)' fontColor='var(--branco-escuro)' />

                    <div className={`${Styles.sessao} margem0_5`}>
                        <Input
                            titulo='Nome completo'
                            placeholder=''
                            name='nomeCompleto'
                            tipo='text'
                            isDisabled={false}
                            minCaracteres={minCaracteresNomeCompleto}
                            dataTip={`O seu nome completo deve ter pelo menos ${minCaracteresNomeCompleto} caracteres. E não se esqueça do seu sobrenome!`}
                            value={formDataDadosPessoais.nomeCompleto}
                            mascara=''
                            referencia={null}
                            isExibirIconeDireita={true}
                            isExisteValidacaoExtra={true}
                            handleValidacaoExtra={validarCompletoNomeCompleto(false, formDataDadosPessoais.nomeCompleto, null, null, null)}
                            handleChange={handleChange}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <span className='separadorHorizontal'></span>
                        <Input
                            titulo='E-mail'
                            placeholder=''
                            name='email'
                            tipo='text'
                            isDisabled={false}
                            minCaracteres={0}
                            dataTip='Coloque seu melhor e-mail aqui 🖖'
                            value={formDataDadosPessoais.email}
                            mascara=''
                            referencia={null}
                            isExibirIconeDireita={true}
                            isExisteValidacaoExtra={true}
                            handleValidacaoExtra={validarCompletoEmail(false, formDataDadosPessoais.email, null, null, null)}
                            handleChange={handleChange}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <span className='separadorHorizontal'></span>
                        <Input
                            titulo='Nome de usuário do sistema'
                            placeholder=''
                            name='nomeUsuarioSistema'
                            tipo='text'
                            isDisabled={false}
                            minCaracteres={0}
                            dataTip={`Esse aqui vai ser seu @ aqui no ${CONSTS_SISTEMA.NOME_SISTEMA}`}
                            value={formDataDadosPessoais.nomeUsuarioSistema}
                            mascara=''
                            referencia={null}
                            isExibirIconeDireita={true}
                            isExisteValidacaoExtra={true}
                            handleValidacaoExtra={validarCompletoNomeUsuarioSistema(false, formDataDadosPessoais.nomeUsuarioSistema, null, null, null)}
                            handleChange={handleChange}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <span className='separadorHorizontal'></span>
                        <div className={Styles.divInputSenha}>
                            <Input
                                titulo='Senha'
                                placeholder=''
                                name='senha'
                                tipo='password'
                                isDisabled={true}
                                minCaracteres={0}
                                dataTip=''
                                value={formDataDadosPessoais.senha}
                                mascara=''
                                referencia={null}
                                isExibirIconeDireita={false}
                                isExisteValidacaoExtra={false}
                                handleValidacaoExtra={null}
                                handleChange={() => null}
                                handleKeyPress={() => null}
                                handleBlur={() => null}
                            />

                            <div>
                                <Botao texto='Alterar senha' url={null} isNovaAba={false} handleFuncao={() => setIsModalAlterarSenha(true)} Svg={null} refBtn={refBtn} isEnabled={true} />
                            </div>
                        </div>

                        <span className='separadorHorizontal'></span>
                        <Input
                            titulo='Aniversário'
                            placeholder=''
                            name='dataAniversario'
                            tipo='date'
                            isDisabled={false}
                            minCaracteres={0}
                            dataTip='Qual é a fortunada data do seu nascimento?'
                            value={moment(formDataDadosPessoais?.dataAniversario).format('yyyy-MM-DD')}
                            mascara=''
                            referencia={null}
                            isExibirIconeDireita={true}
                            isExisteValidacaoExtra={true}
                            handleValidacaoExtra={validarDataNascimento(moment(formDataDadosPessoais?.dataAniversario).format('yyyy-MM-DD'))}
                            handleChange={handleChange}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <span className='separadorHorizontal'></span>
                        <Input
                            titulo='CPF'
                            placeholder='___.___.___-__'
                            name='cpf'
                            tipo='text'
                            isDisabled={false}
                            minCaracteres={0}
                            dataTip='Seu CPF aqui, por favor. Não use geradores, hein?'
                            value={formDataDadosPessoais.cpf}
                            mascara='999.999.999-99'
                            referencia={null}
                            isExibirIconeDireita={true}
                            isExisteValidacaoExtra={true}
                            handleValidacaoExtra={validarCPF(formDataDadosPessoais.cpf?.toString())}
                            handleChange={handleChange}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <span className='separadorHorizontal'></span>
                        <Input
                            titulo='Telefone'
                            placeholder='(__) _____-____'
                            name='telefone'
                            tipo='text'
                            isDisabled={false}
                            minCaracteres={0}
                            dataTip='Juramos que não vamos te enviar trava-zaps'
                            value={formDataDadosPessoais.telefone}
                            mascara='(99) 99999-9999'
                            referencia={null}
                            isExibirIconeDireita={true}
                            isExisteValidacaoExtra={true}
                            handleValidacaoExtra={validarNumeroTelefone(formDataDadosPessoais.telefone?.toString())}
                            handleChange={handleChange}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <span className='separadorHorizontal'></span>
                        <div className='divBotaoInvertido'>
                            <Botao texto='Salvar alterações dos seus dados pessoais' url={null} isNovaAba={false} handleFuncao={() => handleSubmit()} Svg={null} refBtn={refBtn} isEnabled={true} />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}