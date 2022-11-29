import iUsuarioTipo from './iUsuarioTipo';

export default interface iUsuario {
    usuarioId: number;
    nomeCompleto: string;
    email: string;
    nomeUsuarioSistema: string;
    token: string | null;
    usuarioTipoId: number;
    usuariosTipos: iUsuarioTipo;
    foto: string | null;
    dataRegistro: Date | null;
    dataOnline: Date | null;
    isAtivo: boolean;
    isPremium: boolean | null;
    isVerificado: boolean | null;

    erro: boolean;
    codigoErro: number | null;
    mensagemErro: string | null;
}