import { Aviso } from './aviso';
import emojiAleatorio from './gerarEmojiAleatorio';

export default function avisoFuncaoNaoDesenvolvida() {
    const msg = `Essa função ainda não foi desenvolvida! ${emojiAleatorio()}`;
    // console.log(msg);
    Aviso.warn(msg, 10000);
}