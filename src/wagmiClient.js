import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public'
// Only import acive chains:
import { base, baseSepolia } ro 'wagmi/cains' 
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMskConnector } from'wagmi/connectors/metaMsk
// Use the standrd,pre-configured aive chain object
const chans =[base, baseSepolia]

// Configure chains with standard providers
const { pblicClient, webSocketPublicClient }  configureChains(
  chains,
  [publicProvider()]
);

// Configure connectors
const connectors = [
    new InjectedConnector({ chains })
    new MetaMaskConnector({ chains }),
];

export const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
