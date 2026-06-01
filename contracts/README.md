# Smart Contracts

This directory contains the smart contracts for the faucet.

## Contracts

### SimpleFaucet.sol
Main faucet contract that distributes ERC20 tokens.

**Features:**
- Distributes tokens to users
- Rate limiting (1 claim per day per user)
- Owner can adjust claim amount and interval
- Owner can withdraw remaining tokens

**Constructor Parameters:**
- `_tokenAddress`: Address of the ERC20 token to distribute

**Main Functions:**
```solidity
function requestTokens() public
// User calls this to claim tokens

function setClaimAmount(uint256 _newAmount) public onlyOwner
// Owner updates how many tokens per claim

function setClaimInterval(uint256 _newInterval) public onlyOwner
// Owner updates claim cooldown period

function getTimeUntilNextClaim(address user) public view returns (uint256)
// Check how long user must wait before next claim
```

### TestToken.sol
Simple ERC20 token for testing (optional).

**Note:** For production, use an existing token contract.

## Deployment Instructions

### Option 1: Using Hardhat

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
```

Create `scripts/deploy.js`:
```javascript
const hre = require("hardhat");

async function main() {
  // Deploy TestToken (or use existing token address)
  const TestToken = await hre.ethers.getContractFactory("TestToken");
  const testToken = await TestToken.deploy();
  await testToken.deployed();
  console.log("TestToken deployed to:", testToken.address);

  // Deploy Faucet with TestToken address
  const SimpleFaucet = await hre.ethers.getContractFactory("SimpleFaucet");
  const faucet = await SimpleFaucet.deploy(testToken.address);
  await faucet.deployed();
  console.log("SimpleFaucet deployed to:", faucet.address);

  // Transfer some tokens to faucet
  await testToken.transfer(faucet.address, hre.ethers.utils.parseEther("10000"));
  console.log("Faucet funded with 10000 tokens");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Deploy:
```bash
npx hardhat run scripts/deploy.js --network nexa
```

### Option 2: Using Tenderly

1. Go to your Tenderly dashboard
2. Use Tenderly's contract deployment tool
3. Deploy `SimpleFaucet.sol` with your token address

### Option 3: Using Remix IDE

1. Go to https://remix.ethereum.org
2. Create new files and paste the contract code
3. Compile and deploy using your MetaMask wallet

## Configuration

After deployment, update `src/components/Faucet.jsx` with:

```javascript
const FAUCET_CONTRACT_ADDRESS = '0x...' // Your deployed faucet address
```

## Testing

```bash
npx hardhat test
```

## Security Notes

- This is a simple contract for demonstration
- For production, consider:
  - Formal security audit
  - More sophisticated rate limiting
  - Access control mechanisms
  - Emergency pause functionality
