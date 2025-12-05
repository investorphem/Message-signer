import Head from 'next/head'
import ConnectButton from '../src/components/ConnectButton'
import SignerCard from '../src/components/SignerCard'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Base On-Chain Signer</title>
      </Head>

      <main style={{ padding: 24, fontFamily: 'system-ui, Arial' }}>
        <h1>Base On-Chain Signer</h1>
        <p>Connect a wallet, sign messages and verify signatures. Choose between Base mainnet and testnets (Sepolia, Goerli).</p>

        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <ConnectButton />
        </div>

        <SignerCard />
      </main>
    </div>
  )
}
