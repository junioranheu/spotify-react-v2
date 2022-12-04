import { createContext, useState } from 'react';
import iMusica from '../types/iMusica';
import iPlaylistMusica from '../types/iPlaylistMusica';

interface iContext {
    _musicaContext: [musicaContext: iMusica, setMusicaContext: any];
    _filaMusicasContext: [filaMusicasContext: iPlaylistMusica[], setFilaMusicasContext: any];
    _isPlaying: [isPlayingContext: boolean, setIsPlayingContext: any];
}

const _itemMusicaContext = '_musicaContext';
const _itemListaMusicasContext = '_listaMusicasContext';
export const MusicaContext = createContext<iContext | null>(null);

export const MusicaProvider = (props: any) => {
    const [musicaContext, setMusicaContext] = useState<iMusica>(MusicaStorage.get() ?? null); // Música atual;
    const [filaMusicasContext, setFilaMusicasContext] = useState<iPlaylistMusica[]>(FilaMusicasStorage.get() ?? null); // Fila de músicas;
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
    set(data: iMusica) {
        let parsedData = JSON.stringify(data);
        localStorage.setItem(_itemMusicaContext, parsedData);
    },

    get() {
        if (typeof window !== 'undefined') {
            let data = localStorage.getItem(_itemMusicaContext);

            if (!data) {
                return null;
            }

            let dataJson = JSON.parse(data);
            return dataJson;
        } else {
            return null;
        }
    },

    delete() {
        localStorage.removeItem(_itemMusicaContext);
    }
}

export const FilaMusicasStorage = {
    set(data: iPlaylistMusica[]) {
        let parsedData = JSON.stringify(data);
        localStorage.setItem(_itemListaMusicasContext, parsedData);
    },

    get() {
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

    delete() {
        localStorage.removeItem(_itemListaMusicasContext);
    }
}