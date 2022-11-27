interface iParametros {
    isMusicaCurtida: boolean;
}

export default function Coracao({ isMusicaCurtida }: iParametros) {
    return (
        <div className={`coracao ${(isMusicaCurtida && 'animarCoracao')}`}></div>
    )
}