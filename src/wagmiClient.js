import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
// Only import active chains:
import { base, baseSepolia } fro 'wagmi/cains'; 
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

// Use the standard, pre-configured acive chain objects
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
