import { AbstractConnector } from "."

const ConnectToFrame: AbstractConnector = async (ethProvider) => {
  try {
    const provider = ethProvider("frame")
    provider.isFrameNative = true
    return provider
  } catch (err) {
    console.error(err)
  }
}

export default ConnectToFrame
