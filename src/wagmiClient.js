import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

// Define the chains with RPC URLs included in the object structure
const chainsInput = [
  { id: 8453, name: 'Base', network: 'base', rpcUrl: 'https://mainnet.base.org' },
  { id: 84532, name: 'Base Sepolia', network: 'base-sepolia', rpcUrl: 'https://sepolia.base.org' },
  { id: 84531, name: 'Base Goerli', network: 'base-goerli', rpcUrl: 'https://goerli.base.org' }
];

// Convert to standard wagmi chain objects
const chains = chainsInput.map(c => ({
  id: c.id,
  name: c.name,
  network: c.network,
  rpcUrls: { default: { http: [c.rpcUrl] } }, // Wagmi v1 standard format
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  blockExplorers: { default: { name: 'Base Explorer', url: c.rpcUrl.replace('https://','https://') } }
}));

// Configure chains with providers. We define how to get the correct URL using jsonRpcProvider's api key config:
const { publicClient, webSocketPublicClient } = configureChains(
  chains,
  [
    jsonRpcProvider({
      apiOrRpcUrl: (chain) => {
        // Return the specific http endpoint for the current chain being configured
        return chain.rpcUrls.default.http[0];
      },
    }),
    publicProvider()
  ]
);

// Configure connectors using the new class structure
const connectors = [
    new InjectedConnector({ chains }),
    new MetaMaskConnector({ chains }),
];

export const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
