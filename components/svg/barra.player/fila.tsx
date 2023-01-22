import iSvg from '@utils/types/iSvg';

export default function Fila({cor}:iSvg) {
    return (
        <svg role='img' className='svg16px' viewBox='0 0 16 16' >
            <path fill={cor ?? ''} d='M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 013.5 1h9a2.5 2.5 0 010 5h-9A2.5 2.5 0 011 3.5zm2.5-1a1 1 0 000 2h9a1 1 0 100-2h-9z'></path>
        </svg>
    )
}