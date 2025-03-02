import { AbstractConnector } from "."
import { getChainId } from "../../helpers"

const ConnectToMewConnect: AbstractConnector = (MewConnectProvider, opts) => {
  return new Promise(async (resolve, reject) => {
    let infuraId = ""
    let rpc
    let chainId = 1
    if (opts) {
      infuraId = opts.infuraId || ""
      rpc = opts.rpc || undefined
      if (opts.infuraId && !rpc) {
        rpc = `wss://mainnet.infura.io/ws/v3/${infuraId}`
      }
      chainId = opts.network && getChainId(opts.network) ? getChainId(opts.network) : 1
    }
    if (!MewConnectProvider.Provider.isConnected) {
      const mewConnect = new MewConnectProvider.Provider()
      const provider = mewConnect.makeWeb3Provider(chainId, rpc, true)

      mewConnect.on("disconnected", () => {
        // Do nothing
      })
      try {
        const address = await mewConnect.enable()
        console.log(address) // todo remove dev item
        resolve(provider)
      } catch (e) {
        reject(e)
      }
    }
  })
}

export default ConnectToMewConnect
