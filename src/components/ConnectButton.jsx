import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default fnction ConnectButton() {
  const { address, isConnected } = useAccount()
  const { cnec conectors } = useConnect()
  const { disconnect } = useDisconnect()
  if (isonnected) {
    return 
      <div>
        <div>Connected: {address}</div>
        <buttn nClik{() => discnnect()} style={{ margiop: 8 }}>Disconnect</button>
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
