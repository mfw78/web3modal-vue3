import {providers} from "ethers"
import injected from "./injected"
import walletconnect from "./walletconnect"
import portis from "./portis"
import fortmatic from "./fortmatic"
import torus from "./torus"
import arkane from "./arkane"
import authereum from "./authereum"
import burnerconnect from "./burnerconnect"
import mewconnect from "./mewconnect"
import dcentwallet from "./dcentwallet"
import bitski from "./bitski"
import frame from "./frame"

export type AbstractConnector = (provider: any, opts: any) => Promise<any>

export type Connectors = { [id: string] : AbstractConnector }

export const connectors: Connectors = {
  'injected': injected,
  'walletconnect': walletconnect,
  'portis': portis,
  'torus': torus,
  'fortmatic': fortmatic,
  'arkane': arkane,
  'authereum': authereum,
  'burnerconnect': burnerconnect,
  'mewconnect': mewconnect,
  'dcentwallet': dcentwallet,
  'bitski': bitski,
  'frame': frame,
}

declare global {
  interface web3 {
    currentProvider: any
  }

  interface Window {
    ethereum?: providers.ExternalProvider | any
    web3?: web3 | any
    Arkane?: any
  }
}