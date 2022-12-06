export default function padronizarNomeCompletoUsuario(nome: string) {
    // Trim o nome, já que o usuário pode colocar espaços a mais;
    nome = nome.replace(/\s+/g, ' ').trim();

    // Colocar letra maiúscula apenas nas primeiras letras, no nome;
    nome = nome.toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
    });

    // Colocar todas as palavras do nome em um array;
    var palavrasNome = nome.split(' ');

    // Todas palavras que tiverem < 4 caracteres, faça toLowerCase();
    // Por causa dos nomes "do, dos, da, das" e etc;
    var nomeFormatado = '';
    for (var i = 0; i < palavrasNome.length; i++) {
        if (i === 0) {
            if (palavrasNome[i].length < 4 && i > 0) {
                nomeFormatado = palavrasNome[i].toLowerCase();
            } else {
                nomeFormatado = palavrasNome[i];
            }
        } else {
            if (palavrasNome[i].length < 4 && i > 0) {
                nomeFormatado = nomeFormatado + ' ' + palavrasNome[i].toLowerCase();
            } else {
                nomeFormatado = nomeFormatado + ' ' + palavrasNome[i];
            }
        }
    }

    nome = nomeFormatado;
    return nome;
}