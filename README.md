# Swapper Smart Contract

The Swapper smart contract is a decentralized application built on Ethereum that allows users to swap USDC tokens for USDT tokens and lend the swapped tokens on the Compound platform using cUSDT. The smart contract is written in Solidity and utilizes the Uniswap V2 Router for the token swap.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Smart Contract Overview](#smart-contract-overview)
- [Installation](#installation)
- [Deployment](#deployment)
- [Usage](#usage)

## Features

- Swap USDC tokens for USDT tokens using Uniswap V2 Router
- Lend the swapped tokens on the Compound platform using cUSDT
- Redeem cUSDT tokens

## Technologies Used

- Solidity
- Ethereum
- Uniswap V2 Router
- Compound Finance
- Hardhat
- Ethers.js

## Smart Contract Overview

The Swapper smart contract contains the following functions:

- `swapAndLend`: Swaps USDC tokens for USDT tokens and lends the swapped tokens on the Compound platform using cUSDT.

## Installation

1. Install [Node.js](https://nodejs.org/en/download/) on your machine.
2. Install Hardhat globally:
```bash
npm install --global hardhat
```
3. Clone the repository:
```bash
git clone https://github.com/jefedcreator/swapper-smart-contract.git
```
