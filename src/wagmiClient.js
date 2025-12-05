import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
// Use standard chain definitions for Base networks:
import { base, baseSepolia, baseGoerli } from 'wagmi/chains'; 
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

// Use the standard, pre-configured chain objects
const chains = [base, baseSepolia, baseGoerli];

// Configure chains with standard providers
// This approach is robust and handles RPC URLs correctly during Vercel's build process
const { publicClient, webSocketPublicClient } = configureChains(
  chains,
  [publicProvider()] // Only publicProvider is needed now
);

// Configure connectors
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
