import { AbstractConnector } from "."

const ConnectToDcentWallet: AbstractConnector = async (DcentProvider, opts) => {
  const provider = new DcentProvider(opts)
  await provider.enable()
  return provider
}
export default ConnectToDcentWallet
