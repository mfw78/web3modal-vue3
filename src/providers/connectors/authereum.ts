import { AbstractConnector } from "."

const ConnectToAuthereum: AbstractConnector = (Authereum, opts = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const authereum = new Authereum({
        ...opts,
        networkName: opts.networkName || opts.network
      })
      const provider = authereum.getProvider()
      provider.authereum = authereum
      await provider.enable()
      resolve(provider)
    } catch (error) {
      return reject(error)
    }
  })
}

export default ConnectToAuthereum
