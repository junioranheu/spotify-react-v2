import { UsuarioContext } from '@utils/context/usuarioContext';
import { useContext } from 'react';

export default function useUsuarioContext() {

    const usuarioContext = useContext(UsuarioContext);
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];

    return [isAuth, setIsAuth];

}