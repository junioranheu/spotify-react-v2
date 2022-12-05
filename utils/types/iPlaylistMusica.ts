import iMusica from './iMusica';
import iPlaylist from './iPlaylist';

export default interface iPlaylistMusica {
    playlistMusicaId: number;

    playlistId: number;
    playlists: iPlaylist;

    musicaId: number;
    musicas?: iMusica | null;

    isAtivo: boolean;
    dataRegistro: Date | null;

    erro: boolean;
    codigoErro: number | null;
    mensagemErro: string | null;

    // Adicionado para controle interno do front-end;
    isJaTocada: boolean;
}