import iPlaylistMusica from './iPlaylistMusica';
import iUsuario from './iUsuario';

export default interface iPlaylist {
    playlistId: number
    nome: string;
    sobre: string | null;
    foto: string | null;
    corDominante: string | null;

    usuarioId: number | null;
    usuarios: iUsuario | null;

    isAtivo: boolean;
    dataRegistro: Date;
    
    playlistsMusicas: iPlaylistMusica[];

    erro: boolean;
    codigoErro: number | null;
    mensagemErro: string | null;
}