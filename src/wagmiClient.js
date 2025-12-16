import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
// Only import active chains:
import { base, baseSepolia } from 'wagmi/chains'; 
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

// Use the standard, pre-configured active chain objects
const chains = [base, baseSepolia];

// Configure chains with standard providers
const { publicClient, webSocketPublicClient }  configureChains(
  chains,
  [publicProvider()]
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
