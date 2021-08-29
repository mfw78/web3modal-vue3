import { Plugin } from "vue"

import Web3Modal from "./components/Web3Modal.vue"

export const Web3ModalVuePlugin: Plugin = {
    install: (app, options?) => {
        app.component("Web3Modal", Web3Modal)
        /*app.mixin({
            computed: {
                classes (this: DefineComponent) {
                    // Do stuff here. Even with `this`
                }
            }
        })*/
    } 
}