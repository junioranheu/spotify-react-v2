import moment from 'moment';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import { ChangeEvent, Fragment, useContext, useEffect, useRef, useState } from 'react';
import Botao from '../../../components/outros/botao';
import Input from '../../../components/outros/input';
import InputSelect from '../../../components/outros/select';
import TopHat from '../../../components/outros/topHat';
import Musica from '../../../components/svg/musica';
import Styles from '../../../styles/form.module.scss';
import { Fetch } from '../../../utils/api/fetch';
import CONSTS_MUSICAS from '../../../utils/consts/data/constMusicas';
import CONSTS_PLAYLISTS from '../../../utils/consts/data/constPlaylists';
import CONSTS_ERROS from '../../../utils/consts/outros/erros';
import CONSTS_SISTEMA from '../../../utils/consts/outros/sistema';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import { Aviso } from '../../../utils/outros/aviso';
import validarDataNascimento from '../../../utils/outros/validacoes/validar.dataNascimento';
import iFormDataMusica from '../../../utils/types/iFormData.musica';
import iMusica from '../../../utils/types/iMusica';
import iPlaylist from '../../../utils/types/iPlaylist';
import DivSelecionarArquivo from './outros/divSelecionarArquivo';

export default function Index() {

    const usuarioContext = useContext(UsuarioContext); // Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];
    const usuarioId = Auth?.get()?.usuarioId ?? 0;

    const refBtn = useRef<HTMLButtonElement | any>(null);

    const [listaPlaylistsUsuario, setListaPlaylistsUsuario] = useState<iPlaylist[]>();
    const [selectMultiPlaylist, setSelectMultiPlaylist] = useState<any>();
    useEffect(() => {
        async function getPlaylists(usuarioId: string) {
            nProgress.start();
            const url = `${CONSTS_PLAYLISTS.API_URL_GET_BY_USUARIO_ID}/${usuarioId}`;
            const playlists = await Fetch.getApi(url) as iPlaylist[] ?? null;

            // @ts-ignore;
            if (playlists.erro) {
                return false;
            }

            setListaPlaylistsUsuario(playlists);
            nProgress.done();
        }

        if (usuarioId) {
            getPlaylists(usuarioId.toString());
        }
    }, [usuarioId]);

    const [formData, setFormData] = useState<iFormDataMusica>({
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

        // Tratar o "selectMultiPlaylist" para uma lista de ids;
        let listaPlaylists = [] as any;
        if (selectMultiPlaylist) {
            selectMultiPlaylist.forEach((el: any) => {
                listaPlaylists.push(el.value);
            });
        }

        const url = CONSTS_MUSICAS.API_URL_POST_ADICIONAR;
        const dto = {
            nome: formData.nome,
            dataLancamento: formData.dataLancamento && formData.dataLancamento !== '00/00/0000' ? moment(formData.dataLancamento).format('yyyy-MM-DD') : null,
            mp3Base64: formData.localMp3Base64,
            urlYoutube: formData.urlYoutube,
            listaPlaylists: listaPlaylists
        };

        const resposta = await Fetch.postApi(url, dto) as iMusica;
        if (!resposta || resposta?.erro) {
            instrucaoErro((resposta?.mensagemErro ? `Parece que ${resposta?.mensagemErro.toLowerCase()}. Tente novamente mais tarde` : 'Algo deu errado! Tente novamente mais tarde'), true);
            return false;
        }

        // Voltar à tela principal;
        Router.push('/').then(() => {
            Aviso.success(`A música <b>${formData.nome}</b> foi subida com sucesso!`, 7000);
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
                <title>Subir nova música • {CONSTS_SISTEMA.NOME_SISTEMA}</title>
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
                        <span className={Styles.titulo}>Para quais playlists essa música vai?</span>
                        <InputSelect
                            selectMulti={selectMultiPlaylist}
                            setSelectMulti={setSelectMultiPlaylist}
                            lista={listaPlaylistsUsuario}
                            nomePropKey='playlistId'
                            nomePropLabel='nome'
                            isMulti={true}
                            placeholder=''
                            noOptionsMessage='Nenhuma playlist. Crie uma agora mesmo!'
                            className='margem0_5'
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