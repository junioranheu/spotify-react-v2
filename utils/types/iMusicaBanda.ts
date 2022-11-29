import iBanda from './iBanda';
import iMusica from './iMusica';

export default interface iMusicaBanda {
    musicaBandaId: number

    musicaId: number;
    musicas: iMusica;

    bandaId: number;
    bandas: iBanda;

    isAtivo: boolean;
    dataRegistro: Date;

    erro: boolean;
    codigoErro: number | null;
    mensagemErro: string | null;
}