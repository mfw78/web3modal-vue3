import { Plugin } from "vue"

import { web3Modal } from "./components/Web3Modal"

export const Web3ModalVuePlugin: Plugin = {
    install: (app, options?) => {
        app.component("web3-modal", web3Modal)
        /*app.mixin({
            computed: {
                classes (this: DefineComponent) {
                    // Do stuff here. Even with `this`
                }
            }
        })*/
    }
}

export const Web3ModalComponent = web3Modal