import moment from 'moment';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import { ChangeEvent, Fragment, useContext, useRef, useState } from 'react';
import Botao from '../../../components/outros/botao';
import Input from '../../../components/outros/input';
import TopHat from '../../../components/outros/topHat';
import Musica from '../../../components/svg/musica';
import Styles from '../../../styles/form.module.scss';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_MUSICAS from '../../../utils/consts/data/constMusicas';
import CONSTS_ERROS from '../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { UsuarioContext } from '../../../utils/context/usuarioContext';
import { Aviso } from '../../../utils/outros/aviso';
import validarDataNascimento from '../../../utils/outros/validacoes/validar.dataNascimento';
import iFormMusicaData from '../../../utils/types/iFormMusicaData';
import iMusica from '../../../utils/types/iMusica';
import DivSelecionarArquivo from './outros/divSelecionarArquivo';

export default function Index() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const refBtn = useRef<HTMLButtonElement | any>(null);

    const [formData, setFormData] = useState<iFormMusicaData>({
        nome: '',
        dataLancamento: '00/00/0000',
        localMp3Nome: '',
        localMp3Base64: '',
        urlYoutube: ''
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e?.target?.name]: e?.target?.value });
    }

    async function handleSubmit() {
        nProgress.start();
        refBtn.current.disabled = true;

        if (!formData.nome) {
            instrucaoErro('O campo <b>título</b> é obrigatório!', true);
            return false;
        }

        if (!formData.localMp3Base64 && !formData.urlYoutube) {
            instrucaoErro('Você deve selecionar a música <b>localmente</b> ou usando um <b>link do Youtube</b>', true);
            return false;
        }

        const url = CONSTS_MUSICAS.API_URL_POST_ADICIONAR;
        const dto = {
            nome: formData.nome,
            dataLancamento: formData.dataLancamento && formData.dataLancamento !== '00/00/0000' ? moment(formData.dataLancamento).format('yyyy-MM-DD') : null,
            mp3Base64: formData.localMp3Base64,
            urlYoutube: formData.urlYoutube
        };

        const resposta = await Fetch.postApi(url, dto) as iMusica;
        if (!resposta || resposta?.erro) {
            instrucaoErro((resposta?.mensagemErro ? `Parece que ${resposta?.mensagemErro.toLowerCase()}. Tente novamente mais tarde` : 'Algo deu errado! Tente novamente mais tarde'), true);
            return false;
        }

        // Voltar à tela principal;
        Router.push('/').then(() => {
            Aviso.success(`A música <b>${formData.nome}</b> adicionada com sucesso!`, 7000);
            nProgress.done();
        });
    }

    function instrucaoErro(msg: string, isExibirAviso: boolean) {
        nProgress.done();
        refBtn.current.disabled = false;

        if (isExibirAviso) {
            Aviso.warn(msg, 5000);
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
                            <Botao texto='Subir música' url={null} isNovaAba={false} handleFuncao={() => handleSubmit()} Svg={null} refBtn={refBtn} isEnabled={true} />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}