import { defineComponent, h } from "vue"
import { ProviderController, EventController, UserOption } from "../controllers"
import { CLOSE_EVENT, CONNECT_EVENT, ERROR_EVENT } from "../constants"
import { getThemeColors } from "../helpers"
import { themesList } from "../themes"

import Modal from "./Modal.vue"

export const web3Modal = defineComponent({
  name: "Web3Modal",
  components: { Modal },
  props: {
    lightboxOpacity: {
      type: Number,
      default: 0.4
    },
    theme: {
      type: String,
      default: themesList.default.name
    },
    cacheProvider: {
      type: Boolean,
      default: false
    },
    disableInjectedProvider: {
      type: Boolean,
      default: false
    },
    providerOptions: {
      type: Object,
      default: () => {
        return {}
      }
    },
    network: {
      type: String,
      default: ""
    }
  },
  setup(props, { expose }) {
    const emptyUserOptions: UserOption[] = []
    let show = false
    let themeColors = getThemeColors(props.theme)
    const eventController = new EventController()
    const providerController = new ProviderController({
      disableInjectedProvider: props.disableInjectedProvider,
      cacheProvider: props.cacheProvider,
      providerOptions: props.providerOptions,
      network: props.network
    })
    let userOptions = emptyUserOptions

    // computed
    const cachedProvider = (): string | null => {
      return providerController.cachedProvider
    }

    // methods
    const on = (event: any, callback: any) => {
      eventController.on({ event, callback })
      return () => eventController.off({ event, callback })
    }

    const connect = async () => {
      return new Promise((resolve, reject) => {
        on(CONNECT_EVENT, (provider: any) => resolve(provider))
        on(ERROR_EVENT, (error: Error) => reject(error))
        on(CLOSE_EVENT, () => reject(new Error("Modal closed by user")))
        toggleModal()
      })
    }

    const connectTo = async (id: string) => {
      return new Promise((resolve, reject) => {
        on(CONNECT_EVENT, (provider: any) => resolve(provider))
        on(ERROR_EVENT, (error: Error) => reject(error))
        on(CLOSE_EVENT, () => reject(new Error("Modal closed by user")))
        const provider = providerController.getProvider(id)
        if (!provider) {
          return reject(new Error(`Cannot connect to provider (${id}), check provider options`))
        }
        resolve(providerController.connectTo(provider.id, provider.connector))
      })
    }

    const toggleModal = () => {
      if (cachedProvider()) {
        providerController.connectToCachedProvider()
        return
      }
      /*if (this.userOptions && this.userOptions.length === 1 && this.userOptions[0].name) {
        this.userOptions[0].onClick();
        return;
      }*/
      _toggleModal()
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const off = (event: any, callback: any): void => {
      eventController.off({ event, callback })
    }

    const clearCachedProvider = () => {
      providerController.clearCachedProvider()
    }

    const setCachedProvider = (id: string) => {
      providerController.setCachedProvider(id)
    }

    const updateTheme = (theme: string) => {
      themeColors = getThemeColors(theme)
    }

    const _toggleModal = () => {
      const d = typeof window !== "undefined" ? document : ""
      const body = d ? d.body || d.getElementsByTagName("body")[0] : ""
      if (body) {
        if (show) {
          body.style.overflow = ""
        } else {
          body.style.overflow = "hidden"
        }
      }
      show = !show
    }

    const onError = (error: Error) => {
      if (show) {
        _toggleModal()
      }
      eventController.trigger(ERROR_EVENT, error)
    }

    const onConnect = (provider: any) => {
      if (show) {
        _toggleModal()
      }
      eventController.trigger(CONNECT_EVENT, provider)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onClose = () => {
      if (show) {
        _toggleModal()
      }
      eventController.trigger(CLOSE_EVENT)
    }

    providerController.on(CONNECT_EVENT, (provider: any) => onConnect(provider))
    providerController.on(ERROR_EVENT, (error: Error) => onError(error))
    userOptions = providerController.getUserOptions()

    expose({
      connect,
      connectTo,
      cachedProvider,
      setCachedProvider,
      clearCachedProvider,
      updateTheme,
      toggleModal
    })

    return () => h(
      Modal,
      {
        props: {
          show: show,
          themeColors: themeColors,
          userOptions: userOptions,
          lightboxOpacity: props.lightboxOpacity,
        },
        onClose: _toggleModal
      }
    )
  }
})
