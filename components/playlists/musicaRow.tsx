import ImgCinza from '@assets//image/cinza.webp';
import GifEqualiser from '@assets//image/equaliser.gif';
import Coracao from '@components/outros/coracao';
import Reticencias from '@components/svg/reticencias';
import useUsuarioContext from '@hooks/api/context/useUsuarioContext';
import { Fetch } from '@utils/api/fetch';
import CONSTS_MUSICAS from '@utils/consts/data/constMusicas';
import CONSTS_UPLOAD from '@utils/consts/data/constUpload';
import CONSTS_MODAL from '@utils/consts/outros/modal.tamanho';
import CONSTS_TELAS from '@utils/consts/outros/telas';
import { MusicaContext, MusicaStorage } from '@utils/context/musicaContext';
import { Aviso } from '@utils/outros/aviso';
import formatarSegundos from '@utils/outros/formatarSegundos';
import Image, { StaticImageData } from 'next/image';
import { Dispatch, Fragment, useContext, useEffect, useState } from 'react';
import { debounce } from 'ts-debounce'; // debounce: https://www.npmjs.com/package/ts-debounce | Delay React onMouseOver event: https://stackoverflow.com/a/68349975
import ModalLayout from '../modal/_modal.layout';
import ModalWrapper from '../modal/_modal.wrapper';
import ModalAdicionarMusica from '../modal/modal.adicionarMusicaNaPlaylist/modal.adicionarMusica';
import ModalAvisoLogin from '../modal/modal.aviso/login';
import BotaoPlay from '../svg/botaoPlay';
import Styles from './musicaRow.module.scss';
import SubMenu from './subMenu';

interface iParametros {
    i: number;
    musicaId: number;
    foto?: string | null;
    titulo?: string | null;
    banda?: string | null;
    album?: string | null;
    tempo?: number | null;
    isDesativarUm: boolean;
    setIsMusicaClicadaParaSetarLista?: Dispatch<boolean> | null; // Setar que o usuário clicou para ouvir uma música;
}

export default function MusicaRow({ i, musicaId, foto, titulo, banda, album, tempo, isDesativarUm, setIsMusicaClicadaParaSetarLista }: iParametros) {

    const [isAuth, setIsAuth] = useUsuarioContext();

    const _musicaContext = useContext(MusicaContext); // Contexto da música;
    const [musicaContext, setMusicaContext] = [_musicaContext?._musicaContext[0], _musicaContext?._musicaContext[1]];
    const [isPlayingContext, setIsPlayingContext] = [_musicaContext?._isPlaying[0], _musicaContext?._isPlaying[1]];

    const [modalAvisoLoginDescricao, setModalAvisoLoginDescricao] = useState('');
    const [isModalAvisoLoginOpen, setIsModalAvisoLoginOpen] = useState(false);

    const [isModalAdicionarMusicaNaPlaylistOpen, setIsModalAdicionarMusicaNaPlaylistOpen] = useState(false);

    const [isMusicaCurtida, setIsMusicaCurtida] = useState<boolean>(false);
    function handleCoracao() {
        setIsMusicaCurtida(!isMusicaCurtida);
    }

    const [imagemBanda, setImagemBanda] = useState<StaticImageData | string>(ImgCinza);
    useEffect(() => {
        if (foto) {
            const img = `${CONSTS_UPLOAD.API_URL_GET_CAPA}/${foto}`;
            setImagemBanda(img);
        }
    }, [foto]);

    async function handleSetarMusica(musicaId: number) {
        // Se o usuário estiver deslogado;
        // if (!isAuth) {
        //     setModalAvisoLoginDescricao('Inicie uma sessão para escutar essa música!');
        //     setIsModalAvisoLoginOpen(true);
        //     return false;
        // }

        if (!musicaId) {
            Aviso.custom('Houve um erro ao identificar esta música', 5000);
            return false;
        }

        const url = `${CONSTS_MUSICAS.API_URL_GET_BY_ID}/${musicaId}`;
        const musica = await Fetch.getApi(url);
        // console.log(musica);

        // Salvar no Context e no localStorage;
        MusicaStorage.set(musica);
        setMusicaContext(musica);

        // Forçar play;
        setIsPlayingContext(true);

        // Setar que o usuário clicou para ouvir uma música;
        setIsMusicaClicadaParaSetarLista && setIsMusicaClicadaParaSetarLista(true);
    }

    const [posicaoClickIconeReticencias, setPosicaoClickIconeReticencias] = useState<number>(0);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);
    const debounceFecharSubMenu = debounce(() => setIsSubMenuOpen(false), 500); // Delay React onMouseOver event: https://stackoverflow.com/a/68349975
    function handleSubMenu(e: any) {
        setIsSubMenuOpen(true);
        debounceFecharSubMenu.cancel();

        // Pegar a posição do "reticências" clicado, para ajustar o "css/top" do submenu;
        const y = e.clientY;
        if (y) {
            setPosicaoClickIconeReticencias(y);
        }
    }

    return (
        <Fragment>
            {/* Modal de aviso de login */}
            <ModalWrapper isOpen={isModalAvisoLoginOpen}>
                <ModalLayout handleModal={() => setIsModalAvisoLoginOpen(!isModalAvisoLoginOpen)} isExibirApenasLogo={true} titulo={null} tamanho={CONSTS_MODAL.PEQUENO} isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalAvisoLogin
                        handleModal={() => setIsModalAvisoLoginOpen(!isModalAvisoLoginOpen)}
                        titulo={null}
                        descricao={modalAvisoLoginDescricao}
                        isExibirBotao={true}
                        textoBotao='Entrar agora mesmo'
                        urlBotao={CONSTS_TELAS.ENTRAR}
                        isNovaAba={null}
                    />
                </ModalLayout>
            </ModalWrapper>

            {/* Modal para adicionar nova música à playlist */}
            <ModalWrapper isOpen={isModalAdicionarMusicaNaPlaylistOpen}>
                <ModalLayout handleModal={() => setIsModalAdicionarMusicaNaPlaylistOpen(!isModalAdicionarMusicaNaPlaylistOpen)} isExibirApenasLogo={true} titulo={null} tamanho={CONSTS_MODAL.PEQUENO} isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalAdicionarMusica
                        musicaId={musicaId}
                        titulo={titulo ?? ''}
                        setIsModalAdicionarMusicaNaPlaylistOpen={setIsModalAdicionarMusicaNaPlaylistOpen}
                    />
                </ModalLayout>
            </ModalWrapper>

            {/* Submenu */}
            {
                isSubMenuOpen && (
                    <SubMenu
                        posicaoClick={posicaoClickIconeReticencias}
                        musicaId={musicaId}
                        debounceFecharSubMenu={debounceFecharSubMenu}
                        handleSubMenu={handleSubMenu}
                        setIsModalAdicionarMusicaNaPlaylistOpen={setIsModalAdicionarMusicaNaPlaylistOpen}
                    />
                )
            }

            {/* Conteúdo */}
            <div className={Styles.divMusica}>
                <div className={Styles.divEsquerda}>
                    {
                        isDesativarUm ? (
                            <div className={Styles.divContador}>
                                <span className={`${(i > 1 ? Styles.contador : Styles.contadorItem1)} ${(i === 1 && Styles.verde)}`}>
                                    {((musicaId === musicaContext?.musicaId && isPlayingContext) ? <Image src={GifEqualiser} width={14} height={14} alt='' /> : i)}
                                </span>

                                <span className={`${(i > 1 ? Styles.esconderPlay : Styles.esconderItem1)}`} onClick={() => handleSetarMusica(musicaId)}>
                                    <BotaoPlay width='14' cor='var(--cinza-claro)' />
                                </span>
                            </div>
                        ) : (
                            <div className={Styles.divContador}>
                                <span className={Styles.contador}>
                                    {((musicaId === musicaContext?.musicaId && isPlayingContext) ? <Image src={GifEqualiser} width={14} height={14} alt='' /> : i)}
                                </span>

                                <span className={Styles.esconderPlay} onClick={() => handleSetarMusica(musicaId)}>
                                    <BotaoPlay width='14' cor='var(--cinza-claro)' />
                                </span>
                            </div>
                        )
                    }

                    <div className={Styles.divImg}>
                        <Image src={imagemBanda} width={40} height={40} alt='' />
                    </div>

                    <div className={Styles.divInfoMusica}>
                        <span className={`${Styles.verdeOnHover} ${(isDesativarUm && Styles.verde)}`}>{titulo}</span>
                        <span>{banda}</span>
                    </div>
                </div>

                <div className={Styles.divMeio}>
                    <span>{album}</span>
                </div>

                <div className={Styles.divDireita}>
                    <span onClick={() => handleCoracao()} title={`Curtir/descurtir "${titulo}"`}>
                        <Coracao isMusicaCurtida={isMusicaCurtida} />
                    </span>

                    <span className={Styles.tempo}>{formatarSegundos(tempo ?? 0, false)}</span>

                    {
                        isAuth && (
                            <span className='pointer cor-principal-hover' onClick={(e) => handleSubMenu(e)}  >
                                <Reticencias width='16' cor='var(--cinza-claro)' />
                            </span>
                        )
                    }
                </div>
            </div>
        </Fragment>
    )
}
