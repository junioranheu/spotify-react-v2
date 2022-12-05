import { createContext, useState } from 'react';
import horarioBrasilia from '../outros/horarioBrasilia';
import iContextDadosUsuario from '../types/context.dadosUsuario';

interface iContext {
    isAuthContext: [isAuth: boolean, setIsAuth: any];
}

const _item = '_auth';
export const UsuarioContext = createContext<iContext | null>(null);

export const UsuarioProvider = (props: any) => {
    const [isAuth, setIsAuth] = useState<boolean>(Auth.get() ? true : false);

    return (
        <UsuarioContext.Provider value={{
            isAuthContext: [isAuth, setIsAuth]
        }}>
            {props.children}
        </UsuarioContext.Provider>
    );
}

export const Auth = {
    set(data: iContextDadosUsuario): void {
        const dadosUsuario = {
            usuarioId: data.usuarioId,
            nomeCompleto: data.nomeCompleto,
            nomeUsuarioSistema: data.nomeUsuarioSistema,
            email: data.email,
            usuarioTipoId: data.usuarioTipoId,
            foto: data.foto,
            isVerificado: data.isVerificado,
            token: data.token,
            refreshToken: data.refreshToken,
            dataAutenticacao: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
        };

        let parsedData = JSON.stringify(dadosUsuario);
        localStorage.setItem(_item, parsedData);
    },

    get(): iContextDadosUsuario | null {
        if (typeof window !== 'undefined') {
            let data = localStorage.getItem(_item);

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
        localStorage.removeItem(_item);
    },

    update(data: iContextDadosUsuario): void {
        const dadosUsuario = {
            usuarioId: (data.usuarioId ?? Auth.get()?.usuarioId),
            nomeCompleto: (data.nomeCompleto ?? Auth.get()?.nomeCompleto),
            nomeUsuarioSistema: (data.nomeUsuarioSistema ?? Auth.get()?.nomeUsuarioSistema),
            email: (data.email ?? Auth.get()?.email),
            usuarioTipoId: (data.usuarioTipoId ?? Auth.get()?.usuarioTipoId),
            foto: (data.foto ?? Auth.get()?.foto),
            isVerificado: (data.isVerificado ?? Auth.get()?.isVerificado),
            token: (data.token ?? Auth.get()?.token),
            refreshToken: (data.refreshToken ?? Auth.get()?.refreshToken),
            dataAutenticacao: (data.dataAutenticacao ?? Auth.get()?.dataAutenticacao)
        };

        let parsedData = JSON.stringify(dadosUsuario);
        localStorage.setItem(_item, parsedData);
    }
}