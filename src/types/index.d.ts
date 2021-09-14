import { web3Modal } from "@/components/Web3Modal";
import { App } from "vue";
export declare const Web3ModalVuePlugin: { install: (app: App, ...options: any[]) => any };
export declare type Web3ModalComponent = typeof web3Modal;
export default Web3ModalVuePlugin;