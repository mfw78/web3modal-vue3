export { };

declare global {
    interface Window {
        updateWeb3Modal: any
    }
}

import { App } from "vue";
export declare const Web3ModalVuePlugin: { install: (app: App, ...options: any[]) => any };
export default Web3ModalVuePlugin;