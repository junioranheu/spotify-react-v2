import { createPortal } from 'react-dom';

export default function ModalWrapper({ children, isOpen }) {
    return (isOpen ? createPortal(children, document.querySelector('#modalWrapper')) : null); 
} 