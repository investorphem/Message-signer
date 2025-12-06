import { useState, useEffect } from 'react';
// Import account/network hooks from 'wagmi'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'; 
// Import contract-specific hooks from '@wagmi/core'
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from '@wagmi/core'; 
import { MESSAGE_BOARD_CONTRACT_ADDRESS, MESSAGE_BOARD_ABI } from '../constants';

const NETWORKS = [
  { id: 8453, label: 'Base Mainnet', rpc: 'https://mainnet.base.org' }
];

export default function SignerCard() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [message, setMessage] = useState('Hello Base, on-chain!');
  const [selected, setSelected] = useState(NETWORKS.id);

  const { data: hash, writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const { data: allMessages, refetch: refetchMessages } = useReadContract({
    address: MESSAGE_BOARD_CONTRACT_ADDRESS,
    abi: MESSAGE_BOARD_ABI,
    functionName: 'getAllMessages',
    watch: true, 
  });

  useEffect(() => {
    if (switchNetwork && selected && chain?.id !== selected) {
        try { switchNetwork(selected); } catch (e) { /* ignore */ }
    }
    if (isConfirmed) {
        refetchMessages();
        alert('Message successfully sent and confirmed on-chain!');
    }
  }, [selected, switchNetwork, chain, isConfirmed, refetchMessages]);


  async function sendOnChainMessage() {
    if (!isConnected || !address) return alert('Connect wallet first');
    if (chain?.id !== selected) return alert(`Please switch to ${NETWORKS.label} first.`);
    if (!message.trim()) return alert('Message cannot be empty');

    try {
      await writeContractAsync({
        address: MESSAGE_BOARD_CONTRACT_ADDRESS,
        abi: MESSAGE_BOARD_ABI,
        functionName: 'sendMessage',
        args: [message],
      });
    } catch (e) { 
        alert('Transaction failed or was rejected: ' + e.message);
    }
  }

  return (
    <div style={{ marginTop: 20, padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
      <h3>Send On-Chain Message</h3>

      <div style={{ marginBottom: 12 }}>
        <label>Target network: </label>
        <select value={selected} onChange={(e) => setSelected(Number(e.target.value))} style={{ marginLeft: 8 }}>
          {NETWORKS.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
        </select>
        <div style={{ marginTop: 6 }}>Wallet chain: {chain ? `${chain.name} (id ${chain.id})` : '—'}</div>
      </div>

      <label>Message</label>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} style={{ width: '100%' }} />
      <div style={{ marginTop: 8 }}>
        <button onClick={sendOnChainMessage} disabled={!isConnected || isConfirming}>
          {isConfirming ? 'Sending...' : 'Send Message On-Chain'}
        </button>
      </div>

      {hash && <p style={{ marginTop: 8 }}>Transaction Hash: <a href={`basescan.org{hash}`} target="_blank" rel="noopener noreferrer">{hash}</a></p>}
      
      <hr style={{ margin: '16px 0' }} />

      <h4>Recent Messages On-Chain</h4>
      <div style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {allMessages && allMessages.length > 0 ? (
          [...allMessages].reverse().map((msg, index) => (
            <div key={index} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
              <p><strong>From:</strong> {msg.sender}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p><strong>Time:</strong> {new Date(Number(msg.timestamp) * 1000).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No messages found on chain.</p>
        )}
      </div>
    </div>
  );
}
