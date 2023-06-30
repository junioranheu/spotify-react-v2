import CONSTS_SISTEMA from '@utils/consts/outros/sistema';
import { useEffect } from 'react';

export default function useInstrucoesPadroes() {

    useEffect(() => {
        function handleScrollTop() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }

        function handleConsole() {
            setTimeout(function () {
                process.env.NODE_ENV === 'production' && console.clear();
                console.log(`%cDesenvolvido por @junioranheu. ${CONSTS_SISTEMA.NOME_SISTEMA}`, 'color: red; font-family:monospace; font-size: 26px');
            }, 1000);
        }

        function handleBloquearInspecionarElemento() {
            if (process.env.NODE_ENV === 'production') {
                document.addEventListener('contextmenu', function (e) {
                    e.preventDefault();
                });

                document.onkeydown = function (e) {
                    if (e.keyCode == 123) {
                        return false;
                    }

                    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
                        return false;
                    }

                    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
                        return false;
                    }

                    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
                        return false;
                    }

                    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
                        return false;
                    }
                }
            }
        }

        handleScrollTop();
        handleConsole();
        handleBloquearInspecionarElemento();
    }, []);

}