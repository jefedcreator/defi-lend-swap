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
git clone https://github.com/jefedcreator/defi-lend-swap.git
```
4. Navigate to the project folder:
```bash
cd swapper-smart-contract
```
5. Install dependencies:
```bash
npm install
```

## Deployment

1. Create a `.env` file in the project root folder with the following content:

```env
ALCHEMY_API_KEY=your_alchemy_api_key
MNEMONIC=your_metamask_mnemonic_phrase
```

Replace `your_alchemy_api_key` and `your_metamask_mnemonic_phrase` with your respective values.

2. Deploy the smart contract to the Ethereum network using Hardhat:

```bash
npx hardhat run --network mainnet scripts/deploy.js
```

## Usage

To interact with the Swapper smart contract, you can use ethers.js in your frontend application. Here's an example of how to call the `swapAndLend` function using ethers.js:

```javascript
import { ethers } from "ethers";
import swapperABI from "./Swapper.json";

const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.alchemyapi.io/v2/your_alchemy_api_key");
const signer = provider.getSigner();
const swapperAddress = "0xYourDeployedSwapperContractAddress";

const swapper = new ethers.Contract(swapperAddress, swapperABI, signer);

const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const cUSDTAddress = "0xf650C3d88D12dB855b8bf7D11Be6C55A4e07dCC9";

const swapAndLend = async (amount) => {
  const weiAmount = ethers.utils.parseUnits(amount, "mwei");
  await swapper.swapAndLend(weiAmount, usdcAddress,usdtAddress, cUSDTAddress);
};

// Example usage: swap 100 USDC for USDT and lend on Compound
swapAndLend("100")
.then(() => console.log("Swapped and lent successfully"))
.catch((error) => console.error("Error:", error));
```

Replace `your_alchemy_api_key` with your Alchemy API key.

This example shows how to call the `swapAndLend` function to swap 100 USDC for USDT and lend the swapped tokens on the Compound platform using cUSDT. To use this function in your frontend application, you will need to import the ethers.js library and the Swapper smart contract ABI. You will also need to connect to an Ethereum provider and obtain a signer from a connected wallet (e.g., MetaMask).

