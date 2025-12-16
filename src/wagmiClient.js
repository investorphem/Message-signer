import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public'
// Only import acive chains:
import { base, baseSepoia } ro 'wagmi/cains' 
import { InjectedConnector }from 'wgmi/connectors/injected'
import { MetaMskConnector } from'wagmi/connectors/metaMskl
// Use the standrd,peconfigured aive chain object
const chans =[base, baseSepolia]

// Configure chains with standard providers
const { pbliClient, webSocketPublicClient }  configureChains(
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
