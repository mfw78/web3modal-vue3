import * as list from "../providers"
import {
  CACHED_PROVIDER_KEY,
  CONNECT_EVENT,
  ERROR_EVENT,
  INJECTED_PROVIDER_ID
} from "../constants"
import {
  filterMatches,
  findMatchingRequiredOptions,
  getInjectedProvider,
  getLocal,
  getProviderDescription,
  getProviderInfoById,
  isMobile,
  removeLocal,
  setLocal
} from "../helpers"
import { EventController } from "./events"
import { AbstractConnector, Connectors } from "@/providers/connectors"
import { ProviderInfo } from "../providers"

export interface Options {
  disableInjectedProvider: boolean,
  cacheProvider: boolean,
  providerOptions: any,
  network: string
}

export interface ProviderInfoExtended extends ProviderInfo {
  t: Connectors
  connector: AbstractConnector
}

export type UserOption = {
  name: string,
  logo: any,
  description: string,
  onClick: () => Promise<void>
}

export class ProviderController {
  eventController: EventController
  cachedProvider: string
  disableInjectedProvider: boolean
  shouldCacheProvider: boolean
  network: string
  providers: ProviderInfoExtended[] 
  providerOptions: any
  injectedProvider: any

  constructor(opts: Options) {
    this.eventController = new EventController()
    this.cachedProvider = getLocal(CACHED_PROVIDER_KEY) || ""
    this.disableInjectedProvider = opts.disableInjectedProvider
    this.shouldCacheProvider = opts.cacheProvider
    this.providerOptions = opts.providerOptions
    this.network = opts.network
    this.injectedProvider = getInjectedProvider()

    this.providers = Object.keys(list.connectors).map((id) => {
      let providerInfo: ProviderInfo
      if (id === INJECTED_PROVIDER_ID) {
        providerInfo = this.injectedProvider || list.providers.FALLBACK
      } else {
        providerInfo = getProviderInfoById(id)
      }
      // parse custom display options
      if (this.providerOptions[id]) {
        const options = this.providerOptions[id]
        if (typeof options.display !== "undefined") {
          providerInfo = {
            ...providerInfo,
            ...this.providerOptions[id].display
          }
        }
      }
      return {
        ...providerInfo,
        t: list.connectors,
        connector: list.connectors[id],
        package: providerInfo.package
      }
    })
    // parse custom providers
    Object.keys(this.providerOptions)
      .filter((key) => key.startsWith("custom-"))
      .map((id) => {
        if (id && this.providerOptions[id]) {
          const options = this.providerOptions[id]
          if (
            typeof options.display !== "undefined" &&
            typeof options.connector !== "undefined"
          ) {
            this.providers.push({
              ...list.providers.FALLBACK,
              id,
              ...options.display,
              connector: options.connector
            })
          }
        }
      })
  }

  shouldDisplayProvider(id: string) {
    const provider = this.getProvider(id)
    if (typeof provider !== "undefined") {
      const providerPackageOptions = this.providerOptions[id]
      if (providerPackageOptions) {
        const isProvided = !!providerPackageOptions.package
        if (isProvided) {
          const requiredOptions = provider.package ? provider.package.required : undefined
          if (requiredOptions && requiredOptions.length) {
            const providedOptions = providerPackageOptions.options
            if (providedOptions && Object.keys(providedOptions).length) {
              const matches = findMatchingRequiredOptions(requiredOptions, providedOptions)
              if (requiredOptions.length === matches.length) {
                return true
              }
            }
          } else {
            return true
          }
        }
      }
    }
    return false
  }

  getUserOptions() {
    const mobile = isMobile()

    const defaultProviderList = this.providers.map(({ id }) => id)

    const displayInjected = !!this.injectedProvider && !this.disableInjectedProvider
    const onlyInjected = displayInjected && mobile

    const providerList = []

    if (onlyInjected) {
      providerList.push(INJECTED_PROVIDER_ID)
    } else {
      if (displayInjected) {
        providerList.push(INJECTED_PROVIDER_ID)
      }

      defaultProviderList.forEach((id: string) => {
        if (id !== INJECTED_PROVIDER_ID) {
          const result = this.shouldDisplayProvider(id)
          if (result) {
            providerList.push(id)
          }
        }
      })
    }

    const userOptions: UserOption[] = []

    providerList.forEach((id) => {
      const provider: ProviderInfoExtended = this.getProvider(id)

      if (typeof provider !== "undefined") {
        const { id, name, logo, connector } = provider
        userOptions.push({
          name,
          logo,
          description: getProviderDescription(provider),
          onClick: () => this.connectTo(id, connector)
        })
      }
    })
    return userOptions
  }

  getProvider(id: string) {
    return filterMatches(this.providers, (x: { id: string }) => x.id === id, undefined)
  }

  getProviderOption(id: string, key: string) {
    return this.providerOptions && this.providerOptions[id] && this.providerOptions[id][key]
      ? this.providerOptions[id][key]
      : {}
  }

  clearCachedProvider() {
    this.cachedProvider = ""
    removeLocal(CACHED_PROVIDER_KEY)
  }

  setCachedProvider(id: string) {
    this.cachedProvider = id
    setLocal(CACHED_PROVIDER_KEY, id)
  }

  async connectTo(id: string, connector: AbstractConnector) {
    try {
      const providerPackage = this.getProviderOption(id, "package")
      const providerOptions = this.getProviderOption(id, "options")
      const opts = { network: this.network || undefined, ...providerOptions }
      const provider = await connector(providerPackage, opts)
      this.eventController.trigger(CONNECT_EVENT, provider)
      if (this.shouldCacheProvider && this.cachedProvider !== id) {
        this.setCachedProvider(id)
      }
    } catch (error) {
      this.eventController.trigger(ERROR_EVENT)
    }
  }

  async connectToCachedProvider() {
    const provider = this.getProvider(this.cachedProvider)
    if (typeof provider !== "undefined") {
      await this.connectTo(provider.id, provider.connector)
    }
  }

  on(event: any, callback: any) {
    this.eventController.on({
      event,
      callback
    })

    return () =>
      this.eventController.off({
        event,
        callback
      })
  }

  off(event: any, callback: any) {
    this.eventController.off({
      event,
      callback
    })
  }
}
