import { useState } from 'react'
import { ethers } from 'ethers'
import './Faucet.css'

const FAUCET_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000' // TODO: Update with your faucet contract
const RPC_ENDPOINT = 'https://virtual.rpc.tenderly.co/Fortunesquare/mine/private/Nexa/44e9cdbf-f800-4a44-8d2e-cd04cac1a26f'

// Simple faucet ABI (update based on your contract)
const FAUCET_ABI = [
  'function requestTokens(address recipient) public',
  'function getBalance() public view returns (uint256)',
]

function Faucet({ account }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [txHash, setTxHash] = useState('')
  const [error, setError] = useState('')

  const requestTokens = async () => {
    if (!account) {
      setError('Please connect your wallet first')
      return
    }

    try {
      setLoading(true)
      setError('')
      setMessage('')
      setTxHash('')

      // Check if contract address is set
      if (FAUCET_CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
        setError('❌ Faucet contract address not configured. Please update FAUCET_CONTRACT_ADDRESS in src/components/Faucet.jsx')
        setLoading(false)
        return
      }

      // Connect to Tenderly RPC
      const provider = new ethers.JsonRpcProvider(RPC_ENDPOINT)

      // Get signer from MetaMask
      const browserProvider = new ethers.BrowserProvider(window.ethereum)
      const signer = await browserProvider.getSigner()

      // Create contract instance
      const faucet = new ethers.Contract(FAUCET_CONTRACT_ADDRESS, FAUCET_ABI, signer)

      // Request tokens
      setMessage('⏳ Requesting tokens...')
      const tx = await faucet.requestTokens(account)

      setMessage('⏳ Waiting for transaction confirmation...')
      const receipt = await tx.wait()

      setTxHash(receipt.transactionHash)
      setMessage('✅ Tokens received! Check your wallet.')
    } catch (err) {
      console.error('Error:', err)
      if (err.code === 'ACTION_REJECTED') {
        setError('❌ Transaction rejected by user')
      } else if (err.message.includes('CALL_EXCEPTION')) {
        setError('❌ Contract call failed. Check contract address and ABI.')
      } else {
        setError('❌ Error: ' + (err.reason || err.message))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="faucet-container">
      <div className="faucet-content">
        <h2>Claim Your Tokens</h2>
        <p className="faucet-description">Click below to claim free tokens to your wallet</p>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        {txHash && (
          <div className="tx-info">
            <p>Transaction Hash:</p>
            <a
              href={`https://dashboard.tenderly.co/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tx-link"
            >
              {txHash.slice(0, 10)}...{txHash.slice(-8)}
            </a>
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={requestTokens}
          disabled={loading}
          style={{ marginTop: '20px' }}
        >
          {loading ? '⏳ Processing...' : '🪂 Claim Tokens'}
        </button>
      </div>

      <div className="faucet-info">
        <h3>ℹ️ Setup Instructions</h3>
        <ol>
          <li>Deploy your faucet smart contract on Nexa</li>
          <li>Update FAUCET_CONTRACT_ADDRESS in Faucet.jsx</li>
          <li>Fund the faucet contract with tokens</li>
          <li>Users can then claim tokens here</li>
        </ol>
      </div>
    </div>
  )
}

export default Faucet
