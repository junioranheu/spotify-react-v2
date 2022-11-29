export default interface iBanda {
    bandaId: number
    nome: string;
    sobre: string;
    foto?: string | null;
    seguidores: number;
    corDominante?: string | null;

    isAtivo: boolean;
    dataRegistro: Date;

    erro: boolean;
    codigoErro: number | null;
    mensagemErro: string | null;
}