import emojiAleatorio from '@utils/outros/gerarEmojiAleatorio';
import { useEffect, useState } from 'react';

export default function useEmoji() {

    const [emoji, setEmoji] = useState<string>('');
    useEffect(() => {
       setEmoji(emojiAleatorio());
    }, []);

    return emoji;
}