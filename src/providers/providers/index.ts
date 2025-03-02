/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import WalletConnectLogo from "../logos/walletconnect-circle.svg"
// @ts-ignore
import PortisLogo from "../logos/portis.svg"
// @ts-ignore
import FortmaticLogo from "../logos/fortmatic.svg"
// @ts-ignore
import ArkaneLogo from "../logos/arkane.svg"
// @ts-ignore
import TorusLogo from "../logos/torus.svg"
// @ts-ignore
import AuthereumLogo from "../logos/authereum.svg"
// @ts-ignore
import BurnerWalletLogo from "../logos/burnerwallet.png"
// @ts-ignore
import MEWwallet from "../logos/mewwallet.png"
// @ts-ignore
import DcentWalletLogo from "../logos/dcentwallet.png"
// @ts-ignore
import BitskiLogo from "../logos/bitski.svg"
// @ts-ignore
import FrameLogo from "../logos/frame.svg"
import merge from 'lodash/merge';
import { ProviderInfo, ProviderInfoList, } from "@/providers"
import { injected } from "@/providers/injected"


export const WALLETCONNECT: ProviderInfo = {
  id: "walletconnect",
  name: "WalletConnect",
  logo: WalletConnectLogo,
  type: "qrcode",
  check: "isWalletConnect",
  package: {
    required: [["infuraId", "rpc"]]
  }
}

export const PORTIS: ProviderInfo = {
  id: "portis",
  name: "Portis",
  logo: PortisLogo,
  type: "web",
  check: "isPortis",
  package: {
    required: ["id"]
  }
}

export const FORTMATIC: ProviderInfo = {
  id: "fortmatic",
  name: "Fortmatic",
  logo: FortmaticLogo,
  type: "web",
  check: "isFortmatic",
  package: {
    required: ["key"]
  }
}

export const TORUS: ProviderInfo = {
  id: "torus",
  name: "Torus",
  logo: TorusLogo,
  type: "web",
  check: "isTorus"
}

export const ARKANE: ProviderInfo = {
  id: "arkane",
  name: "Arkane",
  logo: ArkaneLogo,
  type: "web",
  check: "isArkane",
  package: {
    required: ["clientId"]
  }
}

export const AUTHEREUM: ProviderInfo = {
  id: "authereum",
  name: "Authereum",
  logo: AuthereumLogo,
  type: "web",
  check: "isAuthereum"
}

export const BURNERCONNECT: ProviderInfo = {
  id: "burnerconnect",
  name: "Burner Connect",
  logo: BurnerWalletLogo,
  type: "web",
  check: "isBurnerProvider"
}

export const MEWCONNECT: ProviderInfo = {
  id: "mewconnect",
  name: "MEW wallet",
  logo: MEWwallet,
  type: "qrcode",
  check: "isMEWconnect",
  package: {
    required: [["infuraId", "rpc"]]
  }
}

export const DCENT: ProviderInfo = {
  id: "dcentwallet",
  name: "D'CENT",
  logo: DcentWalletLogo,
  type: "hardware",
  check: "isDcentWallet",
  package: {
    required: ["rpcUrl"]
  }
}

export const BITSKI: ProviderInfo = {
  id: "bitski",
  name: "Bitski",
  logo: BitskiLogo,
  type: "web",
  check: "isBitski",
  package: {
    required: ["clientId", "callbackUrl"]
  }
}

export const FRAME: ProviderInfo = {
  id: "frame",
  name: "Frame",
  logo: FrameLogo,
  type: "web",
  check: "isFrameNative"
}

export const otherProviders: ProviderInfoList = {
  'WALLETCONNECT': WALLETCONNECT,
  'PORTIS': PORTIS,
  'FORTMATIC': FORTMATIC,
  'TORUS': TORUS,
  'ARKANE': ARKANE,
  'AUTHEREUM': AUTHEREUM,
  'BURNERCONNECT': BURNERCONNECT,
  'MEWCONNECT': MEWCONNECT,
  'DCENT': DCENT,
  'BITSKI': BITSKI,
  'FRAME': FRAME
}

export const providers = merge(otherProviders, injected)