import iMusicaBanda from './iMusicaBanda';

export default interface iMusica {
    musicaId: number;
    nome: string;
    ouvintes: number;
    duracaoSegundso: number;
    dataLancamento: Date | null;

    isAtivo: boolean;
    dataRegistro: Date | null;

    musicasBandas?: iMusicaBanda[] | null;

    erro: boolean;
    codigoErro: number | null;
    mensagemErro: string | null;
}