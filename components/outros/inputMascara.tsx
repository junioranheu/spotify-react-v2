import { Dispatch, FocusEventHandler, KeyboardEventHandler, MutableRefObject } from 'react';
import InputMask from 'react-input-mask';
import UUID from '../../utils/outros/UUID';

interface iParametros {
    placeholder: string | null;
    name: string | null;
    tipo: string | null;
    isDisabled: boolean;
    value: string | null | undefined;
    mascara: string | null;
    referencia: MutableRefObject<any> | null;
    handleChange: Dispatch<any> | undefined;
    handleKeyPress: KeyboardEventHandler<HTMLInputElement> | undefined;
    handleControleInterno: Dispatch<any> | undefined;
    handleBlur: FocusEventHandler<HTMLInputElement> | undefined;
}

export default function InputMascara({ placeholder, name, tipo, isDisabled, value, mascara, referencia, handleChange, handleKeyPress, handleControleInterno, handleBlur }: iParametros) {
    return (
        <InputMask
            className='input'
            type={(tipo ?? 'text')}
            placeholder={(placeholder ?? '')}
            name={(name ?? UUID())}
            readOnly={isDisabled}
            disabled={isDisabled}
            autoComplete='new-password'
            ref={referencia}
            value={(value ?? '')}
            onChange={handleChange}
            onInput={handleControleInterno}
            onKeyPress={handleKeyPress}
            mask={(mascara ?? '')}
            onBlur={handleBlur}
        />
    )
}