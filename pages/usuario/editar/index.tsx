import Head from 'next/head';
import Router from 'next/router';
import { ChangeEvent, Fragment, useContext, useRef, useState } from 'react';
import Botao from '../../../components/outros/botao';
import Input from '../../../components/outros/input';
import TopHat from '../../../components/outros/topHat';
import Coracao from '../../../components/svg/coracao';
import Styles from '../../../styles/form.module.scss';
import CONSTS_ERROS from '../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { UsuarioContext } from '../../../utils/context/usuarioContext';
import validarCompletoEmail from '../../../utils/outros/validacoes/validar.completo.email';
import validarCompletoNomeCompleto from '../../../utils/outros/validacoes/validar.completo.nomeCompleto';
import validarCompletoNomeUsuarioSistema from '../../../utils/outros/validacoes/validar.completo.nomeUsuarioSistema';

interface iFormData {
    nomeCompleto: string;
    nomeUsuarioSistema: string;
    email: string;
    senha: string;
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
        senha: ''
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormDataDadosPessoais({ ...formDataDadosPessoais, [e?.target?.name]: e?.target?.value });
    }

    if (!isAuth) {
        Router.push({ pathname: CONSTS_TELAS.ERRO, query: { erro: CONSTS_ERROS.SEM_ACESSO } });
        return false;
    }

    return (
        <Fragment>
            <Head>
                <title>{CONSTS_SISTEMA.NOME_SISTEMA} — Atualizar dados</title>
            </Head>

            <section className={Styles.main}>
                <div className={Styles.mainInner}>
                    <TopHat Svg={<Coracao width='12px' cor='var(--branco-escuro)' />} titulo='Atualizar dados' backgroundColor='var(--super-preto)' fontColor='var(--branco-escuro)' />
 
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
                        <div className={Styles.divBotao}>
                            <Botao texto='Salvar alterações' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={refBtn} isEnabled={false} />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}