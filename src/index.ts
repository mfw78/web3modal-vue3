import { Plugin } from "vue"

import { web3Modal } from "./components/Web3Modal"

const plugin: Plugin = {
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

export { plugin as Web3ModalVuePlugin }
export { web3Modal as Web3ModalComponent } from "./components/Web3Modal"