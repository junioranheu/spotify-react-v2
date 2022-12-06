export default function validarSenha(senha: string, minCaracteres: number) {
    var number = /([0-9])/;
    var alphabets = /([a-zA-Z])/;
    // var special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

    if (senha.length < minCaracteres) {
        return false;
    } else {
        if (senha.match(number) && senha.match(alphabets)) { // && senha.match(special_characters)
            return true;
        } else {
            return false;
        }
    }
}