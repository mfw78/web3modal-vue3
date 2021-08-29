import { connectors } from "./connectors"
import { injected } from "./injected"
import { providers } from "./providers"

export type ProviderType = number

export const ProviderType_HARDWARE: ProviderType = 1
export const ProviderType_INJECTED: ProviderType = 2
export const ProviderType_WEB: ProviderType = 3
export const ProviderType_QRCODE: ProviderType = 4

export interface ProviderInfo {
  id: string
  name: string
  description?: string
  logo: any
  type: ProviderType
  check: string
  package?: {
    required: string[] | string[][]
  }
}

export type ProviderInfoList = { [id: string]: ProviderInfo }

export { connectors, injected, providers }
