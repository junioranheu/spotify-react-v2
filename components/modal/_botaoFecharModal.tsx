import Styles from './_modal.module.scss';

interface iParametros {
    fecharModal: () => void;
}

export default function BotaoFecharModal({ fecharModal }: iParametros) {
    return (
        <button aria-label='Fechar' title='Fechar' type='button' className={Styles.botaoFechar} onClick={() => fecharModal()}>
            <span>
                <svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='presentation' focusable='false'
                    style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '3', overflow: 'visible' }}>
                    <path d='m6 6 20 20'></path>
                    <path d='m26 6-20 20'></path>
                </svg>
            </span>
        </button>
    )
}