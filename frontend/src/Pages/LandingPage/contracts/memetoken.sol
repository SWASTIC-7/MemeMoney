
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MemeToken is ERC20 {
    constructor(string memory name, string memory symbol, uint256 initialSupply, address owner) ERC20(name, symbol) {
        _mint(owner, initialSupply);
    }
}

contract MemeTokenFactory {
    address[] public allTokens;

    event TokenCreated(address token, string name, string symbol, uint256 supply, address owner);

    function createToken(string memory name, string memory symbol, uint256 initialSupply) external {
        MemeToken token = new MemeToken(name, symbol, initialSupply, msg.sender);
        allTokens.push(address(token));
        emit TokenCreated(address(token), name, symbol, initialSupply, msg.sender);
    }

    function getAllTokens() external view returns (address[] memory) {
        return allTokens;
    }
}
