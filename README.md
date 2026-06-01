# Nexa Faucet UI

A simple, modern faucet UI for distributing tokens on the Nexa network via Tenderly RPC.

## Features

✅ MetaMask wallet connection  
✅ Configured for Tenderly RPC endpoint  
✅ Beautiful, responsive UI  
✅ Transaction tracking  
✅ Easy to customize and deploy  

## Quick Start

### Prerequisites
- Node.js 16+
- MetaMask browser extension
- A faucet smart contract deployed on Nexa

### Installation

```bash
# Clone the repository
git clone https://github.com/KINGRABBI4life/faucet-ui.git
cd faucet-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

### Configuration

1. **Update your faucet contract address:**
   - Open `src/components/Faucet.jsx`
   - Replace `FAUCET_CONTRACT_ADDRESS` with your deployed contract address
   - Update `FAUCET_ABI` if your contract has different functions

2. **Update RPC endpoint (if needed):**
   - Default: `https://virtual.rpc.tenderly.co/Fortunesquare/mine/private/Nexa/44e9cdbf-f800-4a44-8d2e-cd04cac1a26f`
   - Modify in `src/components/Faucet.jsx`

### Build for Production

```bash
npm run build
```

The `dist` folder is ready for deployment.

## Deployment

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or via GitHub:
1. Push to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy

### Deploy to Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

## Smart Contract Setup

Before using the faucet, you need:

1. A deployed faucet smart contract on Nexa
2. The contract should have a `requestTokens(address recipient)` function
3. Sufficient token balance in the contract

### Example Contract (Solidity)

```solidity
pragma solidity ^0.8.0;

contract SimpleFaucet {
    address public owner;
    IERC20 public token;
    uint256 public claimAmount = 1e18; // 1 token
    
    constructor(address _token) {
        owner = msg.sender;
        token = IERC20(_token);
    }
    
    function requestTokens(address recipient) public {
        require(token.balanceOf(address(this)) >= claimAmount, "Insufficient balance");
        token.transfer(recipient, claimAmount);
    }
}
```

## Support

For issues or questions, create a GitHub issue or reach out on X [@KINGRABBI4life](https://x.com/KINGRABBI4life)

## License

MIT
