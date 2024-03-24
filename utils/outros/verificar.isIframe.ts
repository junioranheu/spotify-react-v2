export default function verificarIsIframe() {
    try {
        return window.self !== window.top;
    } catch (e: any) {
        return true;
    }
}