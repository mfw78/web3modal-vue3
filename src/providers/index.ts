import { connectors } from "./connectors"
import { injected } from "./injected"
import { providers } from "./providers"


export interface ProviderInfo {
  id: string
  name: string
  description?: string
  logo: any
  type: string
  check: string
  package?: {
    required: string[] | string[][]
  }
}

export type ProviderInfoList = { [id: string]: ProviderInfo }

export { connectors, injected, providers }
