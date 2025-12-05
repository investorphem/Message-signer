import { createClient, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { connectorsForWallets } from '@wagmi/core'
import { injectedWallet, metaMaskWallet } from '@wagmi/core/wallets'

const chainsInput = [
  { id: 8453, name: 'Base', network: 'base', rpc: 'https://mainnet.base.org' },         // mainnet
  { id: 84532, name: 'Base Sepolia', network: 'base-sepolia', rpc: 'https://sepolia.base.org' }, // sepolia testnet
  { id: 84531, name: 'Base Goerli', network: 'base-goerli', rpc: 'https://goerli.base.org' } // goerli testnet (if available)
]

// convert to wagmi chain objects
const chains = chainsInput.map(c => ({
  id: c.id,
  name: c.name,
  network: c.network,
  rpcUrls: { default: c.rpc },
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  blockExplorers: { default: { name: 'Base Explorer', url: c.rpc.replace('https://','https://') } }
}))

const rpcMap = {}
chains.forEach(c => {
  rpcMap[c.id] = () => ({ http: chainsInput.find(x => x.id === c.id).rpc })
})

const { provider, webSocketProvider } = configureChains(
  chains,
  [jsonRpcProvider(({ chain }) => ({ http: rpcMap[chain.id]() })), publicProvider()]
)

const connectors = connectorsForWallets([
  { groupName: 'Recommended', wallets: [injectedWallet({ chains }), metaMaskWallet({ chains })] }
])

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})
