import nProgress from 'nprogress';
import { MutableRefObject } from 'react';
import { Aviso } from '../aviso';
import validarEmail from './validar.email';

export default function validarCompletoEmail
    (
        isExibirAvisos: boolean,
        email: string,
        refEmail: MutableRefObject<any> | null,
        refSenha: MutableRefObject<any> | null,
        refConfirmarSenha: MutableRefObject<any> | null
    ) {

    if (!email) {
        nProgress.done();
        isExibirAvisos && Aviso.warn('Parece que você esqueceu de colocar o seu <b>e-mail</b>', 5000);
        refEmail && refEmail.current.select();

        if (refSenha) {
            refSenha.current.value = '';
        }

        if (refConfirmarSenha) {
            refConfirmarSenha.current.value = '';
        }

        return false;
    }

    // Verificação de e-mail #2: e-mail válido?;
    if (validarEmail(email) === false) {
        nProgress.done();
        isExibirAvisos && Aviso.warn('Parece que esse <b>e-mail</b> não é válido...', 5000);
        refEmail && refEmail.current.select();

        if (refSenha) {
            refSenha.current.value = '';
        }

        if (refConfirmarSenha) {
            refConfirmarSenha.current.value = '';
        }

        return false;
    }

    return true;
}