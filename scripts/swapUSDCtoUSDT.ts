// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { BigNumber, BigNumberish, Signer } from "ethers";
import { ethers } from "hardhat";


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const usdc = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  const usdt = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
  const usdtOwner = "0x05c564414e1CFD2b2bA0e2C110fab7571480cF1b"
  const usdcOwner = "0x3b15cec2d922ab0ef74688bcc1056461049f89cb"
  const cUSDT = "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9"
  const deployedUsdc = await ethers.getContractAt("IERC20",usdc)
  const deployedUsdt = await ethers.getContractAt("IERC20", usdt)
  const lend = "0xcE0066b1008237625dDDBE4a751827de037E53D2"
  const lendAndSwap = await ethers.getContractAt("Swapper",lend);
  // const lendAndSwap = await ethers.getContractFactory("Swapper");
  //     const greeter = await lendAndSwap.deploy();

  //     await greeter.deployed();

  //   console.log("lend address:", greeter.address);
    

//   console.log("USDC Balance:", await deployedUsdc.balanceOf(lend));
//   console.log("USDT Balance:", await deployedUsdt.balanceOf(lend));

  //Impersonate usdc owner
  const usdcSigner:Signer = await ethers.getSigner(usdcOwner)
    //Impersonate account with USDC
  //@ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [usdcOwner],
  })

    //Impersonate usdt owner
    const usdtSigner:Signer = await ethers.getSigner(usdtOwner)
    //Impersonate account with USDT
    //@ts-ignore
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [usdtOwner],
    })

    // @ts-ignore
    //transfer usdt to contract
      await deployedUsdt.connect(usdtSigner).transfer(
        lend,
        "1000000"
      )

    console.log("USDT Balance after transfer:", await deployedUsdt.balanceOf(lend));

    //approve contract to spend usdc
    await deployedUsdc.connect(usdcSigner).approve(
        lend,
        "100000000000000000000000000000000000"
    )
    console.log("Approved!!!");

    console.log("Allowance is:",await  deployedUsdc.allowance(usdcOwner,lend));

    const swap = await lendAndSwap.connect(usdcSigner).swapAndLend(100000, usdc,usdt,cUSDT)
    console.log(swap);

    console.log("USDT Balance: after swap", await deployedUsdt.balanceOf(lend));
    
    console.log("USDT Balance of swapper, after swap", await deployedUsdt.balanceOf(usdcOwner));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
