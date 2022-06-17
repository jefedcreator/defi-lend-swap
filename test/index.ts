import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { IERC20, Swapper } from "../typechain";

describe("Test swap contract", function () {
  let deploySwapper:Swapper
  let owner:SignerWithAddress
  let addr1:SignerWithAddress
  let addr2:SignerWithAddress
  let deployedUsdc: IERC20;
  let deployedUsdt:IERC20;
  let deployedcUsdt:IERC20;
  const usdc = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  const usdt = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
  const cUSDT = "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9"
  const usdcOwner = "0x3b15cec2d922ab0ef74688bcc1056461049f89cb"
  const UNISWAP = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
  const amount = 1000
  it("deploy Swap contract", function () {
    beforeEach(
      async () => {
          const swapper = await ethers.getContractFactory("Swapper");
          deploySwapper = await swapper.deploy();
          await deploySwapper.deployed();
          [owner, addr1, addr2] = await ethers.getSigners()
          const usdcSigner:Signer = await ethers.getSigner(usdcOwner)
    
          //@ts-ignore
          await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [usdcOwner],
          })
          deployedUsdc = await ethers.getContractAt("IERC20",usdc)
          deployedUsdt = await ethers.getContractAt("IERC20", usdt)
          deployedcUsdt = await ethers.getContractAt("IERC20", cUSDT)
          await deployedUsdc.connect(usdcSigner).approve(
            deploySwapper.address,
            "100000000000000000000000000000000000"
          )
          await deployedUsdt.connect(usdcSigner).approve(
            deploySwapper.address,
            "100000000000000000000000000000000000"
          )
         }
    )
  });
  it("User must possess USDC balance before swap", async function () {
    expect(deploySwapper.connect(owner).swapAndLend(amount,usdc,usdt,cUSDT)).to.be.revertedWith("Insufficent balance")
  });
  it("Should pass if User possess sufficient USDC balance before swap", async function () {
  const usdcSigner:Signer = await ethers.getSigner(usdcOwner)
    
    //@ts-ignore
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [usdcOwner],
    })
    expect(deploySwapper.connect(usdcSigner).swapAndLend(amount,usdc,usdt,cUSDT)).to.not.be.revertedWith("Insufficent balance")
  });
  it("USDC Contract should approve UNISWAP ROUTER contract for swap amount", async function () {
    const usdcSigner:Signer = await ethers.getSigner(usdcOwner)
    
    //@ts-ignore
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [usdcOwner],
    })
    deploySwapper.connect(usdcSigner).swapAndLend(amount,usdc,usdt,cUSDT)
    const allowance = await deployedUsdc.allowance(usdcOwner,UNISWAP)
    expect(Number(allowance)).to.be.greaterThanOrEqual(amount)
  });
  it("should receive significant USDT after swap", async function () {
    const usdcSigner:Signer = await ethers.getSigner(usdcOwner)
    
    //@ts-ignore
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [usdcOwner],
    })
    deploySwapper.connect(usdcSigner).swapAndLend(amount,usdc,usdt,cUSDT)
    const usdtBalance = await deployedUsdt.balanceOf(usdcOwner)
    expect(Number(usdtBalance)).to.be.greaterThanOrEqual(amount)
  });
  it("USDT Contract should approve cUSDT contract for lending amount", async function () {
    const usdcSigner:Signer = await ethers.getSigner(usdcOwner)
    
    //@ts-ignore
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [usdcOwner],
    })

    deploySwapper.connect(usdcSigner).swapAndLend(amount,usdc,usdt,cUSDT)
    const allowance = await deployedUsdt.allowance(usdcOwner,cUSDT)
    expect(Number(allowance)).to.be.greaterThanOrEqual(amount)
  });
  it("user cUSDT balance should be significant after lending USDT", async function () {
    const usdcSigner:Signer = await ethers.getSigner(usdcOwner)
    
    //@ts-ignore
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [usdcOwner],
    })

    deploySwapper.connect(usdcSigner).swapAndLend(amount,usdc,usdt,cUSDT)
    console.log(deploySwapper.address);
    const balance = await deployedUsdt.balanceOf(deploySwapper.address)
    expect(Number(balance)).to.be.greaterThanOrEqual(amount)
  });
});
