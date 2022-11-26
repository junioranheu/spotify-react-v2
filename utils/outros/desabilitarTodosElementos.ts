export default function desabilitarTodosElementos(isDesabilitar: boolean) {
    const botoes = document.querySelectorAll('button');
    botoes.forEach((botao) => {
        botao.disabled = isDesabilitar;

        if (botao.textContent === 'Sair') {
            botao.disabled = false;
        }
    });

    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
        input.disabled = isDesabilitar;
    });
}