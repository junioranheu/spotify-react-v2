import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useContext, useEffect, useState } from 'react';
import ImgCinza from '../../../assets/image/cinza.webp';
import useIsTelaModoProibirMusicasAtributoIsJaTocada from '../../../hooks/outros/useIsTelaModoProibirMusicasAtributoIsJaTocada';
import CONSTS_UPLOAD from '../../../utils/consts/data/constUpload';
import CONSTS_MODAL from '../../../utils/consts/outros/modal.tamanho';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { FilaMusicasStorage, MusicaContext, MusicaStorage } from '../../../utils/context/musicaContext';
import gerarNumeroAleatorio from '../../../utils/outros/gerarNumeroAleatorio';
import handleFullScreen from '../../../utils/outros/handleFullScreen';
import iMusica from '../../../utils/types/iMusica';
import iPlaylistMusica from '../../../utils/types/iPlaylistMusica';
import ModalAvisoLogin from '../../modal/modal.aviso/login';
import ModalLayout from '../../modal/_modal.layout';
import ModalWrapper from '../../modal/_modal.wrapper';
import Coracao from '../../outros/coracao';
import Aleatorio from '../../svg/barra.player/aleatorio';
import BotaoAvancar from '../../svg/barra.player/botaoAvancar';
import BotaoPlay from '../../svg/barra.player/botaoPlay';
import BotaoStop from '../../svg/barra.player/botaoStop';
import BotaoVoltar from '../../svg/barra.player/botaoVoltar';
import Dispositivo from '../../svg/barra.player/dispositivo';
import Fila from '../../svg/barra.player/fila';
import FullScreen from '../../svg/barra.player/fullscreen';
import Loop from '../../svg/barra.player/loop';
import Microfone from '../../svg/barra.player/microfone';
import Toggle from '../../svg/barra.player/toggle';
import Styles from './barra.player.module.scss';
import ProgressBarPlayer from './outros/progressBar.player';
import ProgressBarVolume from './outros/progressBar.volume';
import ProgressBarVolumeIcone from './outros/progressBar.volume.icone';

export default function BarraPlayer() {

    const _musicaContext = useContext(MusicaContext); // Contexto da m??sica;
    const [musicaContext, setMusicaContext] = [_musicaContext?._musicaContext[0], _musicaContext?._musicaContext[1]];
    const [isPlayingContext, setIsPlayingContext] = [_musicaContext?._isPlaying[0], _musicaContext?._isPlaying[1]];
    const [filaMusicasContext, setFilaMusicasContext] = [_musicaContext?._filaMusicasContext[0], _musicaContext?._filaMusicasContext[1]];

    const asPath = useRouter();
    const [url, setUrl] = useState<string>('');
    useEffect(() => {
        setUrl(asPath.pathname);
    }, [asPath]);

    const [volume, setVolume] = useState<number>(50);
    function handleVolume(vol: number) {
        setVolume(Math.floor(vol));
    }

    const [volumeAnteriorMutar, setVolumeAnteriorMutar] = useState<number>(0);
    function handleMutarDesmutar() {
        setVolumeAnteriorMutar(volume);

        if (volume > 0) {
            setVolume(0);
        } else {
            setVolume(volumeAnteriorMutar);
        }
    }

    function handlePlay() {
        if (!musicaContext?.musicaId) {
            setModalAvisoLoginDescricao('Nenhuma m??sica foi selecionada. Entre em alguma playlist e comece ouvir suas m??sicas agora mesmo!');
            setIsModalAvisoLoginOpen(true);
            return false;
        }

        setIsPlayingContext(!isPlayingContext);
    }

    // Fun????o normal;
    function handleAvancar() {
        if (!musicaContext?.musicaId) {
            setModalAvisoLoginDescricao('Nenhuma m??sica foi selecionada. Entre em alguma playlist e comece ouvir suas m??sicas agora mesmo!');
            setIsModalAvisoLoginOpen(true);
            return false;
        }

        if (filaMusicasContext && filaMusicasContext?.length > 0) {
            let proximaMusica;

            // Caso o isModoAleatorio N??O seja true, pegue o pr??ximo, normalmente;
            if (!isModoAleatorio) {
                const index = filaMusicasContext?.findIndex(m => m.musicaId === musicaContext?.musicaId);
                proximaMusica = filaMusicasContext[index + 1]; // Avan??ar para a pr??xima;
            }

            // Caso o isModoAleatorio seja true, o handleAvancar n??o pode ser simplesmente "+1";
            if (isModoAleatorio) {
                // Caso seja a primeira tentativa (proximaMusica vazio) ou a m??sica que foi randomizada ?? a mesma que j?? estava tocando, deve-se tentar novamente at?? que ache uma diferente;
                while (!proximaMusica || proximaMusica?.musicaId === musicaContext?.musicaId) {
                    // console.log('proximaMusica v??zio ou a m??sica random ?? igual a que estava tocando. Tentando randomizar novamente');
                    const random = gerarNumeroAleatorio(0, filaMusicasContext?.length - 1);
                    proximaMusica = filaMusicasContext[random]; // Buscar aleat??riamente; 
                }
            }

            // Caso "proximaMusica" esteja vazia (isso ??: acabaram as pr??ximas m??sicas), pegue a primeira da lista novamente;
            if (!proximaMusica) {
                // console.log('N??o existe (index + 1)... voltar para o 0');
                proximaMusica = filaMusicasContext[0]; // Voltar para a primeira m??sica, posi????o 0;
            }

            // Buscar o item "proximaMusica?.musicas" para adequar ?? necessidade do MusicaStorage (tipo iMusica);
            const musica = proximaMusica?.musicas as iMusica;
            // console.log(musica);

            // Salvar no Context e no localStorage;
            MusicaStorage.set(musica);
            setMusicaContext(musica);
        }
    }

    // Fun????o modificada para n??o permitir musicas com o atributo "isJaTocada" === false;
    const modoProibirMusicasAtributoIsJaTocada = useIsTelaModoProibirMusicasAtributoIsJaTocada();
    function handleAvancarModoProibirMusicasAtributoIsJaTocada() {
        if (filaMusicasContext && filaMusicasContext?.length > 0) {
            let proximaMusica;
            const filaMusicasContextIsJaTocadaFalse = filaMusicasContext?.filter(x => x.isAtivo === true && x.isJaTocada === false) as iPlaylistMusica[];

            // Caso o isModoAleatorio N??O seja true, pegue o pr??ximo, normalmente;
            if (!isModoAleatorio) {
                proximaMusica = filaMusicasContextIsJaTocadaFalse[0]; // Avan??ar para a pr??xima m??sica, que est?? obrigatoriamente na posi????o 0, porque as outras est??o sendo filtradas acima (filaMusicasContextIsJaTocadaFalse); 
            }

            // Caso o isModoAleatorio seja true, o handleAvancar n??o pode ser simplesmente "+1", e sim pegar aleat??riamente;
            else if (isModoAleatorio) {
                proximaMusica = filaMusicasContextIsJaTocadaFalse[(Math.random() * filaMusicasContextIsJaTocadaFalse?.length) | 0];
            }

            // Caso "proximaMusica" esteja vazia (isso ??: acabaram as pr??ximas m??sicas), pegue o ??ltimo da lista original: filaMusicasContext;
            // Isso ?? mais uma preventiva para n??o bugar de vez...
            if (!proximaMusica) {
                proximaMusica = filaMusicasContext[filaMusicasContext?.length - 1 ?? 0];
            }

            // Buscar o item "proximaMusica?.musicas" para adequar ?? necessidade do MusicaStorage (tipo iMusica);
            const musica = proximaMusica?.musicas as iMusica;
            // console.log(musica);

            // Salvar no Context e no localStorage;
            MusicaStorage.set(musica);
            setMusicaContext(musica);
        }
    }

    function handleVoltar() {
        if (!musicaContext?.musicaId) {
            setModalAvisoLoginDescricao('Nenhuma m??sica foi selecionada. Entre em alguma playlist e comece ouvir suas m??sicas agora mesmo!');
            setIsModalAvisoLoginOpen(true);
            return false;
        }

        if (filaMusicasContext && filaMusicasContext?.length > 0) {
            let musicaAnterior;

            // Setar o "isJaTocada" para false (reverso do processo normal) para controle interno (voltar ?? fila);
            const listaMusicasUpdate = FilaMusicasStorage.updateIsJaTocada(musicaContext?.musicaId ?? -1, false);
            listaMusicasUpdate && setFilaMusicasContext(listaMusicasUpdate);

            // Independentemente do isModoAleatorio, pegue a m??sica anterior, normalmente;
            const index = filaMusicasContext?.findIndex(m => m.musicaId === musicaContext?.musicaId);
            musicaAnterior = filaMusicasContext[index - 1]; // Avan??ar para a pr??xima;

            // Caso "musicaAnterior" esteja vazia (isso ??: j?? ?? a primeira m??sica), pegue a primeira da lista novamente;
            if (!musicaAnterior) {
                // console.log('N??o existe (index - 1)... voltar para o 0');
                musicaAnterior = filaMusicasContext[0]; // Voltar para a primeira m??sica, posi????o 0;
            }

            // Buscar o item "proximaMusica?.musicas" para adequar ?? necessidade do MusicaStorage (tipo iMusica);
            const musica = musicaAnterior?.musicas as iMusica;
            // console.log(musica);

            // Salvar no Context e no localStorage;
            MusicaStorage.set(musica);
            setMusicaContext(musica);
        }
    }

    const [imagemBanda, setImagemBanda] = useState<StaticImageData | string>(ImgCinza);
    useEffect(() => {
        if (musicaContext?.musicaId) {
            // @ts-ignore;
            const foto = musicaContext?.musicasBandas[0]?.bandas?.foto;

            if (foto) {
                const img = `${CONSTS_UPLOAD.API_URL_GET_CAPA}/${foto}`;
                setImagemBanda(img);
            } else {
                setImagemBanda(ImgCinza);
            }
        }
    }, [musicaContext?.musicaId, musicaContext?.musicasBandas]);

    const [isCurtido, setIsCurtido] = useState<boolean>(false);
    const [isModoAleatorio, setIsModoAleatorio] = useState<boolean>(false);
    const [isModoLoop, setIsModoLoop] = useState<boolean>(false);

    const [modalAvisoLoginDescricao, setModalAvisoLoginDescricao] = useState('');
    const [isModalAvisoLoginOpen, setIsModalAvisoLoginOpen] = useState(false);

    return (
        <Fragment>
            {/* Modal de aviso de login */}
            <ModalWrapper isOpen={isModalAvisoLoginOpen}>
                <ModalLayout handleModal={() => setIsModalAvisoLoginOpen(!isModalAvisoLoginOpen)} isExibirApenasLogo={true} titulo={null} tamanho={CONSTS_MODAL.PEQUENO} isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalAvisoLogin
                        handleModal={() => setIsModalAvisoLoginOpen(!isModalAvisoLoginOpen)}
                        titulo={null}
                        descricao={modalAvisoLoginDescricao}
                        isExibirBotao={false}
                        textoBotao={null}
                        urlBotao={null}
                        isNovaAba={false}
                    />
                </ModalLayout>
            </ModalWrapper>

            {/* Conte??do */}
            <section className={Styles.barraPlayer} id='sectionBarraPlayer'>
                {/* =-=-=-=-=-=-=-=-=-=-=-= Primeira div, esquerda =-=-=-=-=-=-=-=-=-=-=-= */}
                <div className={Styles.divInfo}>
                    {
                        musicaContext && musicaContext?.musicaId && (
                            <Fragment>
                                <Image src={imagemBanda} width={56} height={56} alt='' />

                                <div className={Styles.infoMusica}>
                                    <span className={Styles.infoTitulo} title={musicaContext?.nome ?? ''}>
                                        {musicaContext?.nome}
                                    </span>

                                    {/* @ts-ignore */}
                                    <span className={Styles.infoDescricao} title={(musicaContext?.musicasBandas ? musicaContext?.musicasBandas[0]?.bandas.nome : '')}>
                                        {/* @ts-ignore */}
                                        {(musicaContext?.musicasBandas ? musicaContext?.musicasBandas[0]?.bandas.nome : '')}
                                    </span>
                                </div>

                                <span className={Styles.spanIcone} onClick={() => setIsCurtido(!isCurtido)} title={`${isCurtido ? 'Descurtir' : 'Curtir'} m??sica`}>
                                    <Coracao isMusicaCurtida={isCurtido} />
                                </span>

                                <span className={Styles.spanIcone} onClick={() => null} title='Ativar/desativar modo picture-in-picture'>
                                    <Toggle />
                                </span>
                            </Fragment>
                        )
                    }
                </div>

                {/* =-=-=-=-=-=-=-=-=-=-=-= Segunda div, meio =-=-=-=-=-=-=-=-=-=-=-= */}
                <div className={Styles.divPlayer}>
                    <div className={Styles.divPlayerIcones}>
                        <span className={Styles.spanIcone} onClick={() => setIsModoAleatorio(!isModoAleatorio)} title={`${isModoAleatorio ? 'Desativar' : 'Ativar'} modo aleat??rio`}>
                            <Aleatorio cor={(isModoAleatorio ? 'var(--cor-principal)' : '')} />
                        </span>

                        <span className={Styles.spanIcone} onClick={() => handleVoltar()} title='Voltar uma m??sica'>
                            <BotaoVoltar />
                        </span>

                        <span className={Styles.btnPlay} onClick={() => handlePlay()}>
                            {
                                isPlayingContext ? (
                                    <BotaoStop />
                                ) : (
                                    <BotaoPlay />
                                )
                            }
                        </span>

                        <span className={Styles.spanIcone} onClick={() => (modoProibirMusicasAtributoIsJaTocada ? handleAvancarModoProibirMusicasAtributoIsJaTocada() : handleAvancar())} title='Avan??ar uma m??sica'>
                            <BotaoAvancar />
                        </span>

                        <span className={Styles.spanIcone} onClick={() => setIsModoLoop(!isModoLoop)} title={`${isModoLoop ? 'Desativar' : 'Ativar'} modo loop`}>
                            <Loop cor={(isModoLoop ? 'var(--cor-principal)' : '')} />
                        </span>
                    </div>

                    <div className={Styles.divPlayerInner}>
                        <ProgressBarPlayer
                            isModoLoop={isModoLoop}
                            volume={volume}
                            handleAvancar={(modoProibirMusicasAtributoIsJaTocada ? handleAvancarModoProibirMusicasAtributoIsJaTocada : handleAvancar)}
                        />
                    </div>
                </div>

                {/* =-=-=-=-=-=-=-=-=-=-=-= Terceira div, direita =-=-=-=-=-=-=-=-=-=-=-= */}
                <div className={Styles.divOpcoes}>
                    <span className={Styles.spanIcone} onClick={() => null} title='Visualizar letra'>
                        <Microfone />
                    </span>

                    <span className={Styles.spanIcone} title='Visualizar fila'>
                        <Link href={CONSTS_TELAS.FILA}>
                            <Fila cor={(url === CONSTS_TELAS.FILA ? 'var(--cor-principal)' : '')} />
                        </Link>
                    </span>

                    <span className={Styles.spanIcone} onClick={() => null} title='Transmitir para outro dispositivo'>
                        <Dispositivo />
                    </span>

                    {/* {
                    process.env.NODE_ENV === 'development' && <small>{volume}</small>
                } */}

                    <span className={Styles.spanIcone} onClick={() => handleMutarDesmutar()}>
                        <ProgressBarVolumeIcone volume={volume} />
                    </span>

                    <div className={Styles.divVolume} title={`Volume ${volume}`}>
                        <ProgressBarVolume handleVolume={handleVolume} volume={volume} />
                    </div>

                    <span className={Styles.spanIcone} onClick={() => handleFullScreen()}>
                        <FullScreen />
                    </span>
                </div>
            </section>
        </Fragment>
    )
}