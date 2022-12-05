import { createContext, useState } from 'react';
import iMusica from '../types/iMusica';
import iPlaylistMusica from '../types/iPlaylistMusica';

interface iContext {
    _musicaContext: [musicaContext: iMusica | null, setMusicaContext: any];
    _filaMusicasContext: [filaMusicasContext: iPlaylistMusica[] | null, setFilaMusicasContext: any];
    _isPlaying: [isPlayingContext: boolean, setIsPlayingContext: any];
}

const _itemMusicaContext = '_musicaContext';
const _itemListaMusicasContext = '_filaMusicasContext';
export const MusicaContext = createContext<iContext | null>(null);

export const MusicaProvider = (props: any) => {
    const [musicaContext, setMusicaContext] = useState<iMusica | null>(MusicaStorage.get() ?? null); // Música atual;
    const [filaMusicasContext, setFilaMusicasContext] = useState<iPlaylistMusica[] | null>(FilaMusicasStorage.get() ?? null); // Fila de músicas;
    const [isPlayingContext, setIsPlayingContext] = useState<boolean>(false); // Is playing? 😎

    return (
        <MusicaContext.Provider value={{
            _musicaContext: [musicaContext, setMusicaContext],
            _filaMusicasContext: [filaMusicasContext, setFilaMusicasContext],
            _isPlaying: [isPlayingContext, setIsPlayingContext]
        }}>
            {props.children}
        </MusicaContext.Provider>
    );
}

export const MusicaStorage = {
    set(data: iMusica): void {
        let parsedData = JSON.stringify(data);
        localStorage.setItem(_itemMusicaContext, parsedData);
    },

    get(): iMusica | null {
        if (typeof window !== 'undefined') {
            let data = localStorage.getItem(_itemMusicaContext);

            if (!data || data === undefined || data === 'undefined') {
                return null;
            }

            let dataJson = JSON.parse(data);
            return dataJson;
        } else {
            return null;
        }
    },

    delete(): void {
        localStorage.removeItem(_itemMusicaContext);
    }
}

export const FilaMusicasStorage = {
    set(data: iPlaylistMusica[]): void {
        let parsedData = JSON.stringify(data);
        localStorage.setItem(_itemListaMusicasContext, parsedData);
    },

    get(): iPlaylistMusica[] | null {
        if (typeof window !== 'undefined') {
            let data = localStorage.getItem(_itemListaMusicasContext);

            if (!data) {
                return null;
            }

            let dataJson = JSON.parse(data);
            return dataJson;
        } else {
            return null;
        }
    },

    delete(): void {
        localStorage.removeItem(_itemListaMusicasContext);
    },

    updateIsJaTocada(musicaId: number, flag: boolean): iPlaylistMusica[] {
        var listaMusicas = FilaMusicasStorage.get() as iPlaylistMusica[];
        const index = listaMusicas?.findIndex((m: iPlaylistMusica) => m.musicaId === musicaId);

        if (listaMusicas) {
            // @ts-ignore;
            // console.log(`Alterando a música ${listaMusicas[index].musicas.nome} para isJaTocada ${flag}`);

            listaMusicas[index].isJaTocada = flag;
            FilaMusicasStorage.set(listaMusicas);
        }

        return listaMusicas;
    }
}