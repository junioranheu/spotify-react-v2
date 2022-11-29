import horarioBrasilia from './horarioBrasilia';

export default function gerarOla() {
    var hora = horarioBrasilia().hour();
    // console.log(hora);

    if (hora >= 5 && hora < 12) {
        return 'Bom dia';
    } else if (hora >= 12 && hora < 18) {
        return 'Boa tarde';
    } else {
        return 'Boa noite';
    }
}