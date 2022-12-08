import iMusicaBanda from './iMusicaBanda';
import iUsuario from './iUsuario';

export default interface iMusica {
    musicaId: number;
    nome: string;
    ouvintes: number;
    duracaoSegundos: number;
    dataLancamento: Date | null;

    usuarioId: number | null;
    usuarios: iUsuario | null;

    isAtivo: boolean;
    dataRegistro: Date | null;

    musicasBandas?: iMusicaBanda[] | iMusicaBanda | null;

    erro: boolean;
    codigoErro: number | null;
    mensagemErro: string | null;
}