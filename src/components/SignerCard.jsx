import { useState, useEffect } from 'react'
import { useWalletClient, useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
// Import standard chain objects here as well
import { base, baseSepolia, baseGoerli } from 'wagmi/chains'; 
import { ethers } from 'ethers'

// Map standard chains to a simple format for the dropdown menu
const NETWORKS = [
  { id: base.id, label: base.name, rpc: base.rpcUrls.default.http[0] },
  { id: baseSepolia.id, label: baseSepolia.name, rpc: baseSepolia.rpcUrls.default.http[0] },
  { id: baseGoerli.id, label: baseGoerli.name, rpc: baseGoerli.rpcUrls.default.http[0] }
];

export default function SignerCard() {
  const { data: walletClient } = useWalletClient()
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const [message, setMessage] = useState('Hello Base!')
  const [signature, setSignature] = useState('')
  const [recovered, setRecovered] = useState('')
  const [typedSig, setTypedSig] = useState('')
  // Initialize 'selected' state using a value that exists in our NETWORKS array
  const [selected, setSelected] = useState(NETWORKS[0].id) 

  useEffect(() => {
    // Attempt to switch wallet network when selected changes
    if (switchNetwork && selected) {
      try { switchNetwork(selected) } catch (e) { /* ignore */ }
    }
  }, [selected, switchNetwork])

  async function signMessage() {
    if (!walletClient) return alert('Connect wallet first')
    try {
      const sig = await walletClient.signMessage({ message })
      setSignature(sig)
    } catch (e) { alert('Sign failed: ' + e.message) }
  }

  function verifyMessage() {
    try {
      const rec = ethers.verifyMessage(message, signature)
      setRecovered(rec)
      const ok = rec.toLowerCase() === (address || '').toLowerCase()
      alert(ok ? 'Valid signature (matches connected address)' : 'Invalid signature')
    } catch (e) { alert('Verify failed: ' + e.message) }
  }

  const domain = (chainId) => ({
    name: 'BaseSigner',
    version: '1',
    chainId,
    verifyingContract: '0x0000000000000000000000000000000000000000'
  })

  const types = {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' }
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' }
    ]
  }

  const value = (addr) => ({
    from: { name: 'Alice', wallet: '0x0000000000000000000000000000000000000000' },
    to: { name: 'Bob', wallet: addr || '0x0000000000000000000000000000000000000000' },
    contents: 'Hello from Base EIP-712 example'
  })

  async function signTyped() {
    if (!walletClient) return alert('Connect wallet first')
    try {
      const sig = await walletClient.signTypedData({
        domain: domain(selected),
        types,
        message: value(address)
      })
      setTypedSig(sig)
    } catch (e) { alert('Typed sign failed: ' + e.message) }
  }

  async function verifyTyped() {
    try {
      const digest = ethers.TypedDataEncoder.hash(domain(selected), types, value(address))
      const rec = ethers.recoverAddress(digest, typedSig)
      alert('Recovered: ' + rec)
    } catch (e) { alert('Typed verify failed: ' + e.message) }
  }

  return (
    <div style={{ marginTop: 20, padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
      <h3>Sign & Verify</h3>

      <div style={{ marginBottom: 12 }}>
        <label>Choose network: </label>
        <select value={selected} onChange={(e) => setSelected(Number(e.target.value))} style={{ marginLeft: 8 }}>
          {NETWORKS.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
        </select>
        <div style={{ marginTop: 6 }}>Wallet chain: {chain ? `${chain.name} (id ${chain.id})` : '—'}</div>
      </div>

      <label>Message</label>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} style={{ width: '100%' }} />
      <div style={{ marginTop: 8 }}>
        <button onClick={signMessage}>Sign Message</button>
        <button onClick={verifyMessage} style={{ marginLeft: 8 }}>Verify</button>
      </div>

      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{signature}</pre>
      {recovered && <div>Recovered: {recovered}</div>}

      <hr style={{ margin: '16px 0' }} />

      <h4>EIP-712 Typed Data</h4>
      <div>Typed signing will use the selected network's chainId ({selected}).</div>
      <div style={{ marginTop: 8 }}>
        <button onClick={signTyped}>Sign Typed Data</button>
        <button onClick={verifyTyped} style={{ marginLeft: 8 }}>Verify Typed Sig</button>
      </div>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{typedSig}</pre>
    </div>
  )
}
