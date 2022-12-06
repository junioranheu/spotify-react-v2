export default function validarEmail(email: string) {
    var regex = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}