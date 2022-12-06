import nProgress from 'nprogress';
import { MutableRefObject } from 'react';
import { Aviso } from '../aviso';
import validarSenha from './validar.senha';

export default function validarCompletoSenha
    (
        isExibirAvisos: boolean,
        isValidarSenhaFrontEnd: boolean,
        senha: string,
        confirmarSenha: string,
        refSenha: MutableRefObject<any> | null,
        refConfirmarSenha: MutableRefObject<any> | null
    ) {

    // Verificação de senha #1: senha preenchida?;
    if (!senha) {
        nProgress.done();
        isExibirAvisos && Aviso.warn('Parece que você esqueceu de colocar sua <b>senha</b>', 5000);
        refSenha && refSenha.current.select();
        return false;
    }

    // Verificação da senha #2: realizar uma série de verificações, se alguma retornar falso, aborte;
    if (isValidarSenhaFrontEnd) {
        if (validarSenha(senha, 6) === false) {
            nProgress.done();
            return false;
        }
    }

    // Checar se os dois campos de senha coincidem;
    if (senha !== confirmarSenha) {
        nProgress.done();
        isExibirAvisos && Aviso.warn('As <b>senhas</b> não estão idênticas! Tente novamente', 5000);
        refSenha && refSenha.current.select();

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