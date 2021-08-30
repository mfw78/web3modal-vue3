<template>
  <Modal
    :show="show"
    :theme-colors="themeColors"
    :user-options="userOptions"
    :lightbox-opacity="lightboxOpacity"
    @onClose="_toggleModal"
  />
</template>

<script lang="ts">
import { ProviderController, EventController, UserOption } from "../controllers"
import { CLOSE_EVENT, CONNECT_EVENT, ERROR_EVENT } from "../constants"
import { getThemeColors } from "../helpers"
import { themesList } from "../themes"

import Modal from "./Modal.vue"

export default {
  name: "web3-modal",
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
      default: () => {
        return {}
      }
    },
    network: {
      type: String,
      default: ""
    }
  },
  data() {
    const emptyUserOptions: UserOption[] = []
    return {
      show: false,
      themeColors: getThemeColors(this.theme),
      eventController: new EventController(),
      providerController: new ProviderController({
        disableInjectedProvider: this.$props.disableInjectedProvider,
        cacheProvider: this.$props.cacheProvider,
        providerOptions: this.$props.providerOptions,
        network: this.$props.network
      }),
      userOptions: emptyUserOptions
    }
  },
  computed: {
    cachedProvider(): string | null {
      return this.providerController.cachedProvider
    }
  },
  created() {
    this.providerController.on(CONNECT_EVENT, (provider: any) => this.onConnect(provider))
    this.providerController.on(ERROR_EVENT, (error: Error) => this.onError(error))
    this.userOptions = this.providerController.getUserOptions()
  },
  methods: {
    connect(): Promise<void> {
      return new Promise((resolve, reject) => {
        this.on(CONNECT_EVENT, (provider: any) => resolve(provider))
        this.on(ERROR_EVENT, (error: Error) => reject(error))
        this.on(CLOSE_EVENT, () => reject(new Error("Modal closed by user")))
        this.toggleModal()
      })
    },
    connectTo(id: string): Promise<void> {
      return new Promise((resolve, reject) => {
        this.on(CONNECT_EVENT, (provider: any) => resolve(provider))
        this.on(ERROR_EVENT, (error: Error) => reject(error))
        this.on(CLOSE_EVENT, () => reject(new Error("Modal closed by user")))
        const provider = this.providerController.getProvider(id)
        if (!provider) {
          return reject(new Error(`Cannot connect to provider (${id}), check provider options`))
        }
        resolve(this.providerController.connectTo(provider.id, provider.connector))
      })
    },
    toggleModal(): void {
      if (this.cachedProvider) {
        this.providerController.connectToCachedProvider()
        return
      }
      /*if (this.userOptions && this.userOptions.length === 1 && this.userOptions[0].name) {
        this.userOptions[0].onClick();
        return;
      }*/
      this._toggleModal()
    },
    on(event: any, callback: any) {
      this.eventController.on({ event, callback })
      return () => this.eventController.off({ event, callback })
    },
    off(event: any, callback: any): void {
      this.eventController.off({ event, callback })
    },
    clearCachedProvider(): void {
      this.providerController.clearCachedProvider()
    },
    setCachedProvider(id: string): void {
      this.providerController.setCachedProvider(id)
    },
    updateTheme(theme: string): void {
      this.themeColors = getThemeColors(theme)
    },
    _toggleModal(): void {
      const d = typeof window !== "undefined" ? document : ""
      const body = d ? d.body || d.getElementsByTagName("body")[0] : ""
      if (body) {
        if (this.show) {
          body.style.overflow = ""
        } else {
          body.style.overflow = "hidden"
        }
      }
      this.show = !this.show
    },
    onError(error: Error): void {
      if (this.show) {
        this._toggleModal()
      }
      this.eventController.trigger(ERROR_EVENT, error)
    },
    onConnect(provider: any): void {
      if (this.show) {
        this._toggleModal()
      }
      this.eventController.trigger(CONNECT_EVENT, provider)
    },
    onClose(): void {
      if (this.show) {
        this._toggleModal()
      }
      this.eventController.trigger(CLOSE_EVENT)
    }
  }
}
</script>
