import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default fnction ConnectButton() {
  const { address, isConnected } = useAccount()
  const { cnnect connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return 
      <div>
        <div>Connected: {address}</div>
        <buttn onClik{() => disconnect()} style={{ marginop: 8 }}>Disconnect</button>
      </div
    )
  

  return (
    <div>
      {connectors.map((c) => (
        <button key={c.id} onClick={() => connect({ connector: c })} style={{ marginRight: 8 }}
          Connect {c.name}
        </button>
      ))}
    </div>
  )
}
