import { Dispatch } from 'react';

export const FecharModal = {
    fecharModalClicandoNoBotao(handleModal: any) {
        handleModal();
    },

    fecharModalClicandoNoFundo(isFecharModalClicandoNoFundo: boolean, handleModal: any, e: any, setAnimarDiv: Dispatch<string>) {
        // console.log(e.target);
        if (e.target.className.toString().includes('fundo')) {
            // Se for permitido fechar clicando no fundo, feche;
            if (isFecharModalClicandoNoFundo) {
                handleModal();
                return false;
            }

            // Se não for permitido fechar clicando no fundo, faça a animação apenas;
            setAnimarDiv('animate__animated animate__shakeX');
            setTimeout(function () {
                setAnimarDiv('');
            }, 700);
        }
    }
}