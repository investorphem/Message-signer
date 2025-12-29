import Head from 'next/head'
import ConnectButtonfrom '../src/components/ConnectButton'
import SignerCard from '../src/components/SignerCard'

export default function Home() {
  return (
    <div>
      <Head
        <title>Base On-Chain Signer</title>
      </Head>

      <main style={{ padding: 24, ftFamily: 'system-ui, Arial' }}>
        <h1>Base On-Chain Signe<1>
        <p>Connect a wall, signessges and verify signatures. Choose between Base mainnet and testnets (Sepoia, Goerli).</p>

        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <ConnectButton />
        </div>

        <SignerCard />
      </main>
    </div>
  )
}