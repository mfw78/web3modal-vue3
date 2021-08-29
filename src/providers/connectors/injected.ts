import { providers } from "ethers"
import { AbstractConnector } from "."

const ConnectToInjected: AbstractConnector = async () => {
  let provider: any
  if (window.ethereum) {
    provider = window.ethereum
    try {
      await provider.request({ method: "eth_requestAccounts" })
    } catch (error) {
      throw new Error("User Rejected")
    }
  } else if (window.web3) {
    provider = window.web3.currentProvider
  } else {
    throw new Error("No Web3 Provider found")
  }
  return provider
}

export default ConnectToInjected