import { ProviderInfo, ProviderInfoList, ProviderType_INJECTED } from "@/providers"
// @ts-ignore
import CipherLogo from "../logos/cipher.svg"
// @ts-ignore
import CoinbaseLogo from "../logos/coinbase.svg"
// @ts-ignore
import DapperLogo from "../logos/dapper.png"
// @ts-ignore
import FrameLogo from "../logos/frame.svg"
// @ts-ignore
import imTokenLogo from "../logos/imtoken.svg"
// @ts-ignore
import LiqualityLogo from "../logos/liquality.png"
// @ts-ignore
import MetaMaskLogo from "../logos/metamask.svg"
// @ts-ignore
import NiftyWalletLogo from "../logos/niftyWallet.png"
// @ts-ignore
import OperaLogo from "../logos/opera.svg"
// @ts-ignore
import SafeLogo from "../logos/safe.svg"
// @ts-ignore
import StatusLogo from "../logos/status.svg"
// @ts-ignore
import TokenaryLogo from "../logos/tokenary.png"
// @ts-ignore
import TrustLogo from "../logos/trust.svg"
// @ts-ignore
import Web3DefaultLogo from "../logos/web3-default.svg"

export const FALLBACK: ProviderInfo = {
  id: "injected",
  name: "Web3",
  logo: Web3DefaultLogo,
  type: ProviderType_INJECTED,
  check: "isWeb3"
}

export const METAMASK: ProviderInfo = {
  id: "injected",
  name: "MetaMask",
  logo: MetaMaskLogo,
  type: ProviderType_INJECTED,
  check: "isMetaMask"
}

export const SAFE: ProviderInfo = {
  id: "injected",
  name: "Safe",
  logo: SafeLogo,
  type: ProviderType_INJECTED,
  check: "isSafe"
}

export const NIFTY: ProviderInfo = {
  id: "injected",
  name: "Nifty",
  logo: NiftyWalletLogo,
  type: ProviderType_INJECTED,
  check: "isNiftyWallet"
}

export const DAPPER: ProviderInfo = {
  id: "injected",
  name: "Dapper",
  logo: DapperLogo,
  type: ProviderType_INJECTED,
  check: "isDapper"
}

export const OPERA: ProviderInfo = {
  id: "injected",
  name: "Opera",
  logo: OperaLogo,
  type: ProviderType_INJECTED,
  check: "isOpera"
}

export const TRUST: ProviderInfo = {
  id: "injected",
  name: "Trust",
  logo: TrustLogo,
  type: ProviderType_INJECTED,
  check: "isTrust"
}

export const COINBASE: ProviderInfo = {
  id: "injected",
  name: "Coinbase",
  logo: CoinbaseLogo,
  type: ProviderType_INJECTED,
  check: "isToshi"
}

export const CIPHER: ProviderInfo = {
  id: "injected",
  name: "Cipher",
  logo: CipherLogo,
  type: ProviderType_INJECTED,
  check: "isCipher"
}

export const IMTOKEN: ProviderInfo = {
  id: "injected",
  name: "imToken",
  logo: imTokenLogo,
  type: ProviderType_INJECTED,
  check: "isImToken"
}

export const STATUS: ProviderInfo = {
  id: "injected",
  name: "Status",
  logo: StatusLogo,
  type: ProviderType_INJECTED,
  check: "isStatus"
}

export const TOKENARY: ProviderInfo = {
  id: "injected",
  name: "Tokenary",
  logo: TokenaryLogo,
  type: ProviderType_INJECTED,
  check: "isTokenary"
}

export const FRAMEINJECTED: ProviderInfo = {
  id: "injected",
  name: "Frame",
  logo: FrameLogo,
  type: ProviderType_INJECTED,
  check: "isFrame"
}

export const LIQUALITY: ProviderInfo = {
  id: "injected",
  name: "Liquality",
  logo: LiqualityLogo,
  type: ProviderType_INJECTED,
  check: "isLiquality"
}

export const injected: ProviderInfoList = {
  'FALLBACK': FALLBACK,
  'METAMASK': METAMASK,
  'SAFE': SAFE,
  'NIFTY': NIFTY,
  'DAPPER': DAPPER,
  'OPERA': OPERA,
  'COINBASE': COINBASE,
  'CIPHER': CIPHER,
  'IMTOKEN': IMTOKEN,
  'STATUS': STATUS,
  'TOKENARY': TOKENARY,
  'FRAMEINJECTED': FRAMEINJECTED,
  'LIQUALITY': LIQUALITY
}