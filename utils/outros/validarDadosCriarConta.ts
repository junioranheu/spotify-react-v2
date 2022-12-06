import nProgress from 'nprogress';
import { MutableRefObject } from 'react';
import validarCompletoEmail from './validacoes/validar.completo.email';
import validarCompletoNomeCompleto from './validacoes/validar.completo.nomeCompleto';
import validarCompletoNomeUsuarioSistema from './validacoes/validar.completo.nomeUsuarioSistema';
import validarCompletoSenha from './validacoes/validar.completo.senha';

export default function validarDadosCriarConta
    (
        form: any,
        refNomeCompleto: MutableRefObject<any> | null,
        refEmail: MutableRefObject<any> | null,
        refNomeUsuario: MutableRefObject<any> | null,
        refSenha: MutableRefObject<any> | null,
        refConfirmarSenha: MutableRefObject<any> | null,
        isTrocouSenha: boolean
    ) {

    // Nome completo;
    const isNomeCompletoOk = validarCompletoNomeCompleto(true, form.nomeCompleto, refNomeCompleto, refSenha, refConfirmarSenha);
    if (!isNomeCompletoOk) {
        nProgress.done();
        return false;
    }

    // E-mail;
    const isEmailOk = validarCompletoEmail(true, form.email, refEmail, refSenha, refConfirmarSenha);
    if (!isEmailOk) {
        nProgress.done();
        return false;
    }

    // Nome de usuário do sistema;
    const isNomeUsuarioSistemaOk = validarCompletoNomeUsuarioSistema(true, form.nomeUsuarioSistema, refNomeUsuario, refSenha, refConfirmarSenha);
    if (!isNomeUsuarioSistemaOk) {
        nProgress.done();
        return false;
    }

    // Se a chamada vem da tela de criar nova conta, verifique a senha também;
    if (isTrocouSenha) {
        const isSenhaOk = validarCompletoSenha(true, false, form.senha, form.confirmarSenha, refSenha, refConfirmarSenha);

        if (!isSenhaOk) {
            nProgress.done();
            return false;
        }
    }

    return true;
}