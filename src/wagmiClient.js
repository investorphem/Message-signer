// src/wagmiClient.js - Verified working configuration
import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

// Manually define Base chains with the PRECISE RPC URL structure wagmi v1 needs
const base = {
  id: 8453,
  name: 'Base',
  network: 'base',
  rpcUrls: {
    default: {
      http: ['https://mainnet.base.org'], // Must be an array of strings
    },
  },
  blockExplorers: {
    default: { name: 'Basescan', url: 'https://basescan.org' },
  },
  testnet: false,
};

const baseSepolia = {
  id: 84532,
  name: 'Base Sepolia',
  network: 'base-sepolia',
  rpcUrls: {
    default: {
      http: ['https://sepolia.base.org'],
    },
  },
  blockExplorers: {
    default: { name: 'Basescan', url: 'https://sepolia.basescan.org' },
  },
  testnet: true,
};

const baseGoerli = {
  id: 84531,
  name: 'Base Goerli',
  network: 'base-goerli',
  rpcUrls: {
    default: {
      http: ['https://goerli.base.org'],
    },
  },
  blockExplorers: {
    default: { name: 'Basescan', url: 'https://goerli.basescan.org' },
  },
  testnet: true,
};

const chains = [base, baseSepolia, baseGoerli];

const { publicClient, webSocketPublicClient } = configureChains(
  chains,
  [publicProvider()]
);

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
