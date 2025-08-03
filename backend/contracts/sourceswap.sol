// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IHTSToken {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract BondingCurveHTS {
    IHTSToken public token;
    address public creator;
    uint256 public basePrice = 1e16; // 0.01 HBAR
    uint256 public slope = 1e15;
    uint256 public supply;

    constructor(address tokenAddress) {
        token = IHTSToken(tokenAddress);
        creator = msg.sender;
    }

    function getPrice(uint256 n) public view returns (uint256) {
        return basePrice + slope * (supply + n);
    }

    function getCurrentPrice() external view returns (uint256) {
        return getPrice(0); // next token
    }

    function buy() external payable {
        uint256 n = tokensToMint(msg.value);
        require(n > 0, "Insufficient payment");

        uint256 creatorAmount = (n * 20) / 100;
        uint256 buyerAmount = n - creatorAmount;

        require(token.transferFrom(creator, msg.sender, buyerAmount), "Transfer to buyer failed");
        require(token.transferFrom(creator, creator, creatorAmount), "Transfer to creator failed");

        supply += n;
    }

    function sell(uint256 amount) external {
        require(amount > 0 && amount <= supply, "Invalid amount");

        uint256 payout = 0;
        for (uint256 i = 0; i < amount; i++) {
            uint256 price = basePrice + slope * (supply - i);
            payout += price;
        }

        require(address(this).balance >= payout, "Contract has insufficient HBAR");

        require(token.transferFrom(msg.sender, creator, amount), "Token transfer failed");

        supply -= amount;
        payable(msg.sender).transfer(payout);
    }

    function tokensToMint(uint256 value) public view returns (uint256) {
        uint256 n = 0;
        uint256 cost = 0;
        while (cost < value) {
            uint256 price = getPrice(n);
            if (cost + price > value) break;
            cost += price;
            n++;
        }
        return n;
    }

    // Fallback to receive HBAR
    receive() external payable {}
}
