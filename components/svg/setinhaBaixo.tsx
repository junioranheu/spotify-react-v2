import iSvg from '../../utils/types/iSvg';

export default function SetinhaBaixo({ width, cor }: iSvg) {
    return (
        <svg role='img' width={width ?? '1rem'} viewBox='0 0 16 16'>
            <path fill={cor ?? ''} d='M14 6l-6 6-6-6h12z'></path>
        </svg>
    )
}