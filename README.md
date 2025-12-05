# Base On-Chain Signer

A simple Next.js dApp that lets users connect a wallet (MetaMask / Injected), sign plain messages and EIP-712 typed data, and verify signatures. Users can choose between Base **Mainnet** and **Testnets** (Sepolia & Goerli) from the UI.

## Features
- Connect wallet (MetaMask/injected) via wagmi
- Sign plain messages (personal_sign)
- Sign EIP-712 typed messages
- Verify signatures client-side
- Choose network (Mainnet / Sepolia / Goerli) from the app
- Ready to deploy to Vercel

## How to run locally
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Notes
- Public Base RPC endpoints are rate-limited and not for production. For production, use a dedicated node provider.
- If signing typed data, ensure your wallet is switched to the selected network (the app will attempt to switch it).
