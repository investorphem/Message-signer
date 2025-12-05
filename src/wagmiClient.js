import { createConfig, configureChains } from 'wagmi';
// Corrected line: removed the extra '='
import { publicProvider } from 'wagmi/providers/public'; 
// Use standard chain definitions instead of custom array
import { base, baseSepolia, baseGoerli } from 'wagmi/chains'; 
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

// Use the standard, pre-configured chain objects
const chains = [base, baseSepolia, baseGoerli];

// Configure chains with standard providers
// Wagmi handles the RPC URLs internally when using standard chain objects
const { publicClient, webSocketPublicClient } = configureChains(
  chains,
  [publicProvider()] // Only publicProvider is needed if you don't need custom JSON RPC setup
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
