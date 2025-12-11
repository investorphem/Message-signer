import { useState, useEffect } from 'react';
// All necessary hooks are imported from 'wagmi' dir 
import { useAccount, useNetwork, useSwitchNetwork, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'; 
// Import both the ABI and the dictionary of addresses
import { CONTRACT_ADDRESSES, MESSAGE_BOARD_ABI } from '../constants';

const NETWORKS = [
  { id: 8453, label: 'Base Mainnet', rpc: 'https://mainnet.base.org' },
  { id: 84532, label: 'Base Sepolia (testnet)', rpc: 'https://sepolia.base.org' }
];

export default function SignerCard() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [message, setMessage] = useState('Hello Base, on-chain!');
  const [selected, setSelected] = useState(NETWORKS[0].id); // Default to Mainnet ID

  // Dynamically determine the contract address based on the selected network in the UI
  const contractAddress = CONTRACT_ADDRESSES[selected];

  const { data: hash, writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  
  // Use the dynamic address for reading messages
  const { data: allMessages, refetch: refetchMessages } = useReadContract({
    address: contractAddress, // Use the dynamic address
    abi: MESSAGE_BOARD_ABI,
    functionName: 'getAllMessages',
    watch: true, // Automatically refetch when an event occurs
    chainId: selected // Ensure we read from the selected chain ID
  });

  useEffect(() => {
    // Prompt user to switch networks if they aren't on the currently selected network
    if (switchNetwork && selected && chain?.id !== selected) {
        try { switchNetwork(selected); } catch (e) { /* ignore */ }
    }
    if (isConfirmed) {
        refetchMessages();
        alert('Message successfully sent and confirmed on-chain!');
    }
    // Also refetch when the user manually changes the network dropdown selection
    refetchMessages(); 
  }, [selected, switchNetwork, chain, isConfirmed, refetchMessages]);


  async function sendOnChainMessage() {
    if (!isConnected || !address) return alert('Connect wallet first');
    const currentNetwork = NETWORKS.find(n => n.id === selected)?.label || 'selected network';
    if (chain?.id !== selected) return alert(`Please switch to ${currentNetwork} first.`);
    if (!message.trim()) return alert('Message cannot be empty');

    try {
      // Use the dynamic address for writing a message
      await writeContractAsync({
        address: contractAddress, 
        abi: MESSAGE_BOARD_ABI,
        functionName: 'sendMessage',
        args: [message],
        chainId: selected
      });
    } catch (e) { 
        alert('Transaction failed or was rejected: ' + e.message);
    }
  }

  const getExplorerUrl = (txHash, chainId) => {
    if (chainId === 8453) return `basescan.org{txHash}`;
    if (chainId === 84532) return `sepolia.basescan.org{txHash}`;
    return '#';
  };

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

      {hash && <p style={{ marginTop: 8 }}>Transaction Hash: <a href={getExplorerUrl(hash, selected)} target="_blank" rel="noopener noreferrer">{hash}</a></p>}
      
      <hr style={{ margin: '16px 0' }} />

      <h4>Recent Messages On-Chain ({NETWORKS.find(n => n.id === selected)?.label})</h4>
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
          <p>No messages found on this chain.</p>
        )}
      </div>
    </div>
  );
}
