export default function BotaoPlay({ width, cor }) {
    return (
        <svg role='img' width={width} viewBox='0 0 16 16' style={{cursor: 'pointer'}}>
            <path fill={cor} d='M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z'></path>
        </svg>
    )
}