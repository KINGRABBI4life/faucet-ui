// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract SimpleFaucet {
    address public owner;
    IERC20 public token;
    uint256 public claimAmount = 1e18; // 1 token (18 decimals)
    uint256 public claimInterval = 1 days; // Can claim once per day
    
    mapping(address => uint256) public lastClaim;
    
    event TokensClaimed(address indexed user, uint256 amount, uint256 timestamp);
    event ClaimAmountUpdated(uint256 newAmount);
    event ClaimIntervalUpdated(uint256 newInterval);
    event FundsWithdrawn(address indexed owner, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor(address _tokenAddress) {
        owner = msg.sender;
        token = IERC20(_tokenAddress);
    }
    
    /**
     * @dev User claims tokens from the faucet
     * Can only claim once per claimInterval
     */
    function requestTokens() public {
        require(
            block.timestamp >= lastClaim[msg.sender] + claimInterval,
            "You can only claim once per day"
        );
        
        require(
            token.balanceOf(address(this)) >= claimAmount,
            "Faucet balance is insufficient"
        );
        
        lastClaim[msg.sender] = block.timestamp;
        require(
            token.transfer(msg.sender, claimAmount),
            "Transfer failed"
        );
        
        emit TokensClaimed(msg.sender, claimAmount, block.timestamp);
    }
    
    /**
     * @dev Owner can update claim amount
     */
    function setClaimAmount(uint256 _newAmount) public onlyOwner {
        claimAmount = _newAmount;
        emit ClaimAmountUpdated(_newAmount);
    }
    
    /**
     * @dev Owner can update claim interval
     */
    function setClaimInterval(uint256 _newInterval) public onlyOwner {
        claimInterval = _newInterval;
        emit ClaimIntervalUpdated(_newInterval);
    }
    
    /**
     * @dev Get remaining time until user can claim again (0 if ready)
     */
    function getTimeUntilNextClaim(address user) public view returns (uint256) {
        uint256 nextClaimTime = lastClaim[user] + claimInterval;
        if (block.timestamp >= nextClaimTime) {
            return 0;
        }
        return nextClaimTime - block.timestamp;
    }
    
    /**
     * @dev Get faucet balance
     */
    function getFaucetBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }
    
    /**
     * @dev Owner can withdraw remaining tokens
     */
    function withdrawTokens(uint256 _amount) public onlyOwner {
        require(
            token.balanceOf(address(this)) >= _amount,
            "Insufficient balance"
        );
        require(
            token.transfer(owner, _amount),
            "Withdrawal failed"
        );
        emit FundsWithdrawn(owner, _amount);
    }
    
    /**
     * @dev Change owner
     */
    function transferOwnership(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), "Invalid address");
        owner = _newOwner;
    }
}
