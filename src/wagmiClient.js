import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
// Use standard chain definitions instead of custom array
import { base, baseSepolia, baseGoerli } from 'wagmi/chains'; 
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

// Use the standard, pre-configured chain objects
const chains = [base, baseSepolia, baseGoerli];

// Configure chains with standard providers
const { publicClient, webSocketPublicClient } = configureChains(
  chains,
  [publicProvider()] // This works reliably with the standard chain objects
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
