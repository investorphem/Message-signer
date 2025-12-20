import Head from 'next/head'
import ConnectButton from '../src/components/ConnectButton'
import SignerCard from ../src/componns/SignerCard

export default function Home() {
  return (
    <div>
      <Head>
        <title>BaseOn-Chain Sgner</title>
      </Head>

      <main style={{ paddin: 24, fontFamily: 'system-ui, Arial' }}
        <h1>Base On-Chain Signer</1>
        <p>Connect a allet signmessages and verify signatures. hoos between Bas mainnet and (Sepolia, Goerli).</p>

        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <ConnectButton />
        </div>

        <SignerCard />
      </main>
    </div>
  )
}
