import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import { ChangeEvent, Fragment, useContext, useRef, useState } from 'react';
import Botao from '../../../components/outros/botao';
import Input from '../../../components/outros/input';
import TopHat from '../../../components/outros/topHat';
import Mais from '../../../components/svg/mais';
import DivUpload from '../../../components/upload/divUpload';
import Styles from '../../../styles/form.module.scss';
import CONSTS_UPLOAD from '../../../utils/consts/data/constUpload';
import CONSTS_ERROS from '../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import UPLOAD_SETTINGS from '../../../utils/consts/outros/uploadSettings';
import { UsuarioContext } from '../../../utils/context/usuarioContext';
import { Aviso } from '../../../utils/outros/aviso';

interface iFormDataPlaylist {
    nome: string;
    sobre: string | null;
    foto: string;
    corDominante: string | null;
}

export default function Index() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const refBtn = useRef<HTMLButtonElement | any>(null);

    // xxxxxxxxxx teste;
    const [arquivoUploadFotoPerfil, setArquivoUploadFotoPerfil] = useState<string>('');

    const [formData, setFormData] = useState<iFormDataPlaylist>({
        nome: '',
        sobre: '',
        foto: '',
        corDominante: ''
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e?.target?.name]: e?.target?.value });
    }

    async function handleSubmit() {
        nProgress.start();
        // refBtn.current.disabled = true;

        // if (!formData.nome) {
        //     instrucaoErro('O campo <b>título</b> é obrigatório!', true);
        //     return false;
        // }

        // if (!formData.localMp3Base64 && !formData.urlYoutube) {
        //     instrucaoErro('Você deve selecionar a música <b>localmente</b> ou usando um <b>link do Youtube</b>', true);
        //     return false;
        // }

        // const url = CONSTS_PLAYLISTS.API_URL_POST_ADICIONAR;
        // const dto = {
        //     nome: formData.nome,
        //     dataLancamento: formData.dataLancamento && formData.dataLancamento !== '00/00/0000' ? moment(formData.dataLancamento).format('yyyy-MM-DD') : null,
        //     mp3Base64: formData.localMp3Base64,
        //     urlYoutube: formData.urlYoutube
        // };

        // const resposta = await Fetch.postApi(url, dto) as iPlaylist;
        // if (!resposta || resposta?.erro) {
        //     instrucaoErro((resposta?.mensagemErro ? `Parece que ${resposta?.mensagemErro.toLowerCase()}. Tente novamente mais tarde` : 'Algo deu errado! Tente novamente mais tarde'), true);
        //     return false;
        // }

        // // Voltar à tela principal;
        // Router.push('/').then(() => {
        //     Aviso.success(`A playlist <b>${formData.nome}</b> foi criada com sucesso!`, 7000);
        //     nProgress.done();
        // });
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
                <title>{CONSTS_SISTEMA.NOME_SISTEMA} — Criar nova playlists</title>
            </Head>

            <section className={Styles.main}>
                <div className={Styles.mainInner}>
                    <TopHat Svg={<Mais width='0.75rem' cor='var(--branco-escuro)' />} titulo='Criar nova playlist' backgroundColor='var(--super-preto)' fontColor='var(--branco-escuro)' />

                    <div className={`${Styles.sessao} margem0_5`}>
                        <Input
                            titulo='Título da playlist'
                            placeholder=''
                            name='nome'
                            tipo='text'
                            isDisabled={false}
                            minCaracteres={3}
                            dataTip='O título da playlist deve ter pelo menos 3 caracteres!'
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
                            titulo='Descrição da playlist'
                            placeholder=''
                            name='sobre'
                            tipo='text'
                            isDisabled={false}
                            minCaracteres={0}
                            dataTip='Um textinho bonitinho, por favor'
                            value={formData.sobre}
                            mascara=''
                            referencia={null}
                            isExibirIconeDireita={false}
                            isExisteValidacaoExtra={false}
                            handleValidacaoExtra={null}
                            handleChange={handleChange}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <span className='separadorHorizontal'></span>
                        <div className={Styles.divInputConjunto}>
                            <DivUpload
                                imagem={formData?.foto ?? ''}
                                apiPasta={CONSTS_UPLOAD.API_URL_GET_CAPA}
                                titulo='Capa da playlist'
                                infoAleatoriaUm='Escolhe uma imagem da hora aí'
                                infoAleatoriaDois={`Peso máximo: ${UPLOAD_SETTINGS.LIMITE_MB} MB`}
                                textoBotaoDireita='Alterar capa'
                                limitarAspectRatio={null}
                                arquivoUpload={arquivoUploadFotoPerfil}
                                setArquivoUpload={setArquivoUploadFotoPerfil}
                            />
                        </div>

                        <span className='separadorHorizontal'></span>
                        <div className={Styles.divBotao}>
                            <Botao texto='Criar playlist' url={null} isNovaAba={false} handleFuncao={() => handleSubmit()} Svg={null} refBtn={refBtn} isEnabled={true} />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}