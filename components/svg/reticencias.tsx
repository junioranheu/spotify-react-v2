import iSvg from '@utils/types/iSvg';

export default function Reticencias({ width, cor }: iSvg) {
    return (
        <svg role='img' width={width ?? '1rem'} viewBox='0 0 16 16'>
            <path fill={cor ?? ''} d='M3 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM16 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'></path>
        </svg>
    )
}