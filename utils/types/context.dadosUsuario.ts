export default interface iContextDadosUsuario {
    usuarioId: number | null;
    nomeCompleto: string | null;
    nomeUsuarioSistema: string | null;
    email: string | null;
    usuarioTipoId: number | null;
    foto: string | null;
    isVerificado: boolean | null;
    token: string | null;
    refreshToken: string | null;
    dataAutenticacao: Date | null;
    genero: string | null;
    cep: string | null;
}