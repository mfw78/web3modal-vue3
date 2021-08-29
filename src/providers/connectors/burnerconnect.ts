import { AbstractConnector } from "."

const ConnectToBurnerConnect: AbstractConnector = async (BurnerConnectProvider, opts) => {
  opts.defaultNetwork = opts.defaultNetwork || opts.network
  const provider = new BurnerConnectProvider(opts)
  await provider.enable()
  return provider
}
export default ConnectToBurnerConnect
