import { createContext, useState } from 'react';
import iMusica from '../types/iMusica';

interface iContext {
    _musicaContext: [musicaContext: iMusica, setMusicaContext: any];
    _xxxContext: [xxxContext: boolean, setXxxContext: any];
}

const _item = '_musicContext';
export const MusicaContext = createContext<iContext | null>(null);

export const MusicaProvider = (props: any) => {
    const [musicaContext, setMusicaContext] = useState<iMusica>(MusicaStorage.get() ?? null);
    const [xxxContext, setXxxContext] = useState<boolean>(false);

    return (
        <MusicaContext.Provider value={{
            _musicaContext: [musicaContext, setMusicaContext],
            _xxxContext: [xxxContext, setXxxContext]
        }}>
            {props.children}
        </MusicaContext.Provider>
    );
}

export const MusicaStorage = {
    set(data: iMusica) {
        let parsedData = JSON.stringify(data);
        localStorage.setItem(_item, parsedData);
    },

    get() {
        if (typeof window !== 'undefined') {
            let data = localStorage.getItem(_item);

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
        localStorage.removeItem(_item);
    }
}