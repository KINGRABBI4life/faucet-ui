import { useState } from 'react'
import { ethers } from 'ethers'
import Faucet from './components/Faucet'
import './App.css'

function App() {
  const [account, setAccount] = useState(null)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState('')

  const connectWallet = async () => {
    try {
      setError('')
      if (typeof window.ethereum === 'undefined') {
        setError('MetaMask not detected. Please install MetaMask!')
        return
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      setAccount(accounts[0])
      setConnected(true)
    } catch (err) {
      setError('Failed to connect wallet: ' + err.message)
      console.error(err)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setConnected(false)
    setError('')
  }

  return (
    <div className="app-container">
      <div className="card">
        <div className="header">
          <h1>💰 Nexa Faucet</h1>
          <p>Get free test tokens via Tenderly RPC</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {!connected ? (
          <button className="btn btn-primary" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div>
            <div className="wallet-info">
              <p className="label">Connected Wallet:</p>
              <p className="address">{account}</p>
            </div>
            <Faucet account={account} />
            <button className="btn btn-secondary" onClick={disconnectWallet}>
              Disconnect
            </button>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>RPC: virtual.rpc.tenderly.co</p>
        <p>Network: Nexa</p>
      </footer>
    </div>
  )
}

export default App
