import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useContext, useEffect, useState } from 'react';
import ImgCinza from '../../../assets/image/cinza.webp';
import useIsTelaModoProibirMusicasAtributoIsJaTocada from '../../../hooks/outros/useIsTelaModoProibirMusicasAtributoIsJaTocada';
import CONSTS_UPLOAD from '../../../utils/consts/data/constUpload';
import CONSTS_TELAS from '../../../utils/consts/outros/telas';
import { MusicaContext, MusicaStorage } from '../../../utils/context/musicaContext';
import { Aviso } from '../../../utils/outros/aviso';
import gerarNumeroAleatorio from '../../../utils/outros/gerarNumeroAleatorio';
import handleFullScreen from '../../../utils/outros/handleFullScreen';
import iMusica from '../../../utils/types/iMusica';
import iPlaylistMusica from '../../../utils/types/iPlaylistMusica';
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

    const _musicaContext = useContext(MusicaContext); // Contexto da música;
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
            Aviso.warn('Nenhuma música foi selecionada', 5000);
            return false;
        }

        setIsPlayingContext(!isPlayingContext);
    }

    // Função normal;
    function handleAvancar() {
        if (filaMusicasContext && filaMusicasContext?.length > 0) {
            let proximaMusica;

            // Caso o isModoAleatorio NÃO seja true, pegue o próximo, normalmente;
            if (!isModoAleatorio) {
                const index = filaMusicasContext?.findIndex(m => m.musicaId === musicaContext?.musicaId);
                proximaMusica = filaMusicasContext[index + 1]; // Avançar para a próxima;
            }

            // Caso o isModoAleatorio seja true, o handleAvancar não pode ser simplesmente "+1";
            if (isModoAleatorio) {
                // Caso seja a primeira tentativa (proximaMusica vazio) ou a música que foi randomizada é a mesma que já estava tocando, deve-se tentar novamente até que ache uma diferente;
                while (!proximaMusica || proximaMusica?.musicaId === musicaContext?.musicaId) {
                    // console.log('proximaMusica vázio ou a música random é igual a que estava tocando. Tentando randomizar novamente');
                    const random = gerarNumeroAleatorio(0, filaMusicasContext?.length - 1);
                    proximaMusica = filaMusicasContext[random]; // Buscar aleatóriamente; 
                }
            }

            // Caso "proximaMusica" esteja vazia (isso é: acabaram as próximas músicas), pegue a primeira da lista novamente;
            if (!proximaMusica) {
                // console.log('Não existe (index + 1)... voltar para o 0');
                proximaMusica = filaMusicasContext[0]; // Voltar para a primeira música, posição 0;
            }

            // Buscar o item "proximaMusica?.musicas" para adequar à necessidade do MusicaStorage (tipo iMusica);
            const musica = proximaMusica?.musicas as iMusica;
            // console.log(musica);

            // Salvar no Context e no localStorage;
            MusicaStorage.set(musica);
            setMusicaContext(musica);
        }
    }

    // Função modificada para não permitir musicas com o atributo "isJaTocada" === false;
    const modoProibirMusicasAtributoIsJaTocada = useIsTelaModoProibirMusicasAtributoIsJaTocada();
    function handleAvancarModoProibirMusicasAtributoIsJaTocada() {
        if (filaMusicasContext && filaMusicasContext?.length > 0) {
            let proximaMusica;
            const filaMusicasContextIsJaTocadaFalse = filaMusicasContext?.filter(x => x.isAtivo === true && x.isJaTocada === false) as iPlaylistMusica[];

            // Caso o isModoAleatorio NÃO seja true, pegue o próximo, normalmente;
            if (!isModoAleatorio) {
                proximaMusica = filaMusicasContextIsJaTocadaFalse[0]; // Avançar para a próxima música, que está obrigatoriamente na posição 0, porque as outras estão sendo filtradas acima (filaMusicasContextIsJaTocadaFalse); 
            }

            // Caso o isModoAleatorio seja true, o handleAvancar não pode ser simplesmente "+1", e sim pegar aleatóriamente;
            else if (isModoAleatorio) {
                proximaMusica = filaMusicasContextIsJaTocadaFalse[(Math.random() * filaMusicasContextIsJaTocadaFalse?.length) | 0];
            }

            // Caso "proximaMusica" esteja vazia (isso é: acabaram as próximas músicas), pegue o último da lista original: filaMusicasContext;
            // Isso é mais uma preventiva para não bugar de vez...
            if (!proximaMusica) {
                proximaMusica = filaMusicasContext[filaMusicasContext?.length - 1 ?? 0];
            }

            // Buscar o item "proximaMusica?.musicas" para adequar à necessidade do MusicaStorage (tipo iMusica);
            const musica = proximaMusica?.musicas as iMusica;
            // console.log(musica);

            // Salvar no Context e no localStorage;
            MusicaStorage.set(musica);
            setMusicaContext(musica);
        }
    }

    function handleVoltar() {
        if (filaMusicasContext && filaMusicasContext?.length > 0) {
            let musicaAnterior;

            // Independentemente do isModoAleatorio, pegue a música anterior, normalmente;
            const index = filaMusicasContext?.findIndex(m => m.musicaId === musicaContext?.musicaId);
            musicaAnterior = filaMusicasContext[index - 1]; // Avançar para a próxima;

            // Caso "musicaAnterior" esteja vazia (isso é: já é a primeira música), pegue a primeira da lista novamente;
            if (!musicaAnterior) {
                // console.log('Não existe (index - 1)... voltar para o 0');
                musicaAnterior = filaMusicasContext[0]; // Voltar para a primeira música, posição 0;
            }

            // Buscar o item "proximaMusica?.musicas" para adequar à necessidade do MusicaStorage (tipo iMusica);
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

    return (
        <section className={Styles.barraPlayer} id='sectionBarraPlayer'>
            {/* =-=-=-=-=-=-=-=-=-=-=-= Primeira div, esquerda =-=-=-=-=-=-=-=-=-=-=-= */}
            <div className={Styles.divInfo}>
                {
                    musicaContext && musicaContext?.musicaId && (
                        <Fragment>
                            <Image src={imagemBanda} width={56} height={56} alt='' />

                            <div className={Styles.infoMusica}>
                                <span className={Styles.infoTitulo} title={'xxxxxx'}>
                                    {musicaContext?.nome}
                                </span>

                                {/* @ts-ignore */}
                                <span className={Styles.infoDescricao} title={(musicaContext?.musicasBandas ? musicaContext?.musicasBandas[0]?.bandas.nome : '')}>
                                    {/* @ts-ignore */}
                                    {(musicaContext?.musicasBandas ? musicaContext?.musicasBandas[0]?.bandas.nome : '')}
                                </span>
                            </div>

                            <span className={Styles.spanIcone} onClick={() => setIsCurtido(!isCurtido)} title={`${isCurtido ? 'Descurtir' : 'Curtir'} música`}>
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
                    <span className={Styles.spanIcone} onClick={() => setIsModoAleatorio(!isModoAleatorio)} title={`${isModoAleatorio ? 'Desativar' : 'Ativar'} modo aleatório`}>
                        <Aleatorio cor={(isModoAleatorio ? 'var(--cor-principal)' : '')} />
                    </span>

                    <span className={Styles.spanIcone} onClick={() => handleVoltar()} title='Voltar uma música'>
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

                    <span className={Styles.spanIcone} onClick={() => (modoProibirMusicasAtributoIsJaTocada ? handleAvancarModoProibirMusicasAtributoIsJaTocada() : handleAvancar())} title='Avançar uma música'>
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
    )
}