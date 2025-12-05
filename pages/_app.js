import '../styles/globals.css'
import { WagmiConfig } from 'wagmi'
import { wagmiClient } from '../src/wagmiClient'

export default function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}
