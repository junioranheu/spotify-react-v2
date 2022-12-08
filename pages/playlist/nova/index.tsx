import { TwitterPicker } from '@hello-pangea/color-picker'; // https://www.npmjs.com/package/@hello-pangea/color-picker
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import { ChangeEvent, Fragment, useContext, useRef, useState } from 'react';
import Botao from '../../../components/outros/botao';
import Input from '../../../components/outros/input';
import TopHat from '../../../components/outros/topHat';
import Mais from '../../../components/svg/mais';
import DivUpload from '../../../components/upload/divUpload';
import useEmoji from '../../../hooks/outros/useEmoji';
import Styles from '../../../styles/form.module.scss';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_PLAYLISTS from '../../../utils/consts/data/constPlaylists';
import CONSTS_UPLOAD from '../../../utils/consts/data/constUpload';
import CONSTS_ERROS from '../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import UPLOAD_SETTINGS from '../../../utils/consts/outros/uploadSettings';
import { UsuarioContext } from '../../../utils/context/usuarioContext';
import ajustarUrl from '../../../utils/outros/ajustarUrl';
import { Aviso } from '../../../utils/outros/aviso';
import iPlaylist from '../../../utils/types/iPlaylist';

interface iFormDataPlaylist {
    nome: string;
    sobre: string | null;
    foto: string | null;
    corDominante: string | null;
}

export default function Index() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    const refBtn = useRef<HTMLButtonElement | any>(null);
    const emoji = useEmoji();

    const [arquivoUploadCapa, setArquivoUploadCapa] = useState<string | null>(''); // ('/1.webp');
    const [formData, setFormData] = useState<iFormDataPlaylist>({
        nome: '',
        sobre: '',
        foto: arquivoUploadCapa,
        corDominante: ''
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e?.target?.name]: e?.target?.value });
    }

    async function handleSubmit() {
        nProgress.start();
        formData.foto = arquivoUploadCapa;
        refBtn.current.disabled = true;

        if (!formData.nome) {
            instrucaoErro('O campo <b>título da playlist</b> é obrigatório!', true);
            return false;
        }

        if (!formData.foto) {
            instrucaoErro('Você deve selecionar uma <b>imagem de capa</b> para sua playlist!', true);
            return false;
        }

        const url = CONSTS_PLAYLISTS.API_URL_POST_ADICIONAR;
        const dto = {
            nome: formData.nome,
            sobre: formData.sobre,
            foto: formData.foto ?? '',
            corDominante: formData.corDominante ?? '#1B1039'
        };

        const resposta = await Fetch.postApi(url, dto) as iPlaylist;
        if (!resposta || resposta?.erro) {
            instrucaoErro((resposta?.mensagemErro ? `Parece que ${resposta?.mensagemErro.toLowerCase()}. Tente novamente mais tarde` : 'Algo deu errado! Tente novamente mais tarde'), true);
            return false;
        }

        // Voltar à tela principal;
        const urlAlvo = `${CONSTS_TELAS.GERENCIAR_PLAYLIST_ID}/${resposta.playlistId}/${ajustarUrl(resposta.nome)}`;
        Router.push(urlAlvo).then(() => {
            Aviso.success(`A playlist <b>${formData.nome}</b> foi criada com sucesso!`, 7000);
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
                <title>Criar nova playlist • {CONSTS_SISTEMA.NOME_SISTEMA}</title>
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
                                imagem={formData.foto ?? ''}
                                apiPasta={CONSTS_UPLOAD.API_URL_GET_CAPA}
                                titulo='Capa da playlist'
                                infoAleatoriaUm={`Escolhe uma imagem da hora aí ${emoji}`}
                                infoAleatoriaDois={`Peso máximo: ${UPLOAD_SETTINGS.LIMITE_MB} MB`}
                                textoBotaoDireita='Alterar capa'
                                limitarAspectRatio={null}
                                arquivoUpload={arquivoUploadCapa}
                                setArquivoUpload={setArquivoUploadCapa}
                            />
                        </div>

                        <span className='separadorHorizontal'></span>
                        <div className={Styles.divInputPicker}>
                            <span className={Styles.titulo}>Cor predominante da playlist</span>
                            <TwitterPicker
                                className={Styles.componenteColorPicker}
                                defaultColor='#1B1039'
                                onChange={(e) => setFormData({ ...formData, ['corDominante']: e?.hex })}
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