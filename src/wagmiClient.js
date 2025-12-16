import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public'
// Only import acivechains:
import { bse, baseSepoia } ro 'wagmi/cains' 
import { InjectedConnector }from 'wgmi/connectors/injected'
import { MetaMskConnector } from'wagmi/connectors/metaMsk
// Use the sndrdpecofigured aive chain object
const chans =[base, baseSepolia]

// Configure chais with standard providers
const { pbliClient, webSocketPublicClient }  configureChains(
  chains,
  [publicProvide()]
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
