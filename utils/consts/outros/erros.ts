import CONSTS_SISTEMA from './sistema';

const CONSTS_ERROS = {
    SEM_ACESSO: 'Você não está autenticado ou não tem permissão para executar a ação requisitada',
    AUTENTICADO: 'Você já está autenticado, portanto não pode mais executar a ação requisitada',
    REFRESH_TOKEN_INVALIDO: `Parece que esse houve um erro na sua autenticação. Entre no ${CONSTS_SISTEMA.NOME_SISTEMA} novamente 👽`,
    ERRO_INTERNO: 'Parece que houve um erro interno. Tente novamente mais tarde'
};

export default CONSTS_ERROS;