export default interface iUsuarioTipo {
    usuarioTipoId: number;
    tipo: string;
    descricao: string | null;
    isAtivo: boolean;
    dataRegistro: Date;
    
    erro: boolean;
    codigoErro: number | null;
    mensagemErro: string | null;
}