import { createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { base, baseSepolia, baseGoerli } from 'wagmi/chains'; 
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

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
