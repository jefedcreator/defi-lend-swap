import { ethers, network } from "hardhat";
import { hrtime } from "process";
const uniRouter ="0xf164fC0Ec4E93095b804a4795bBe1e041497b92a";
const usdt ="0xdAC17F958D2ee523a2206206994597C13D831ec7";
const usdc = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const usdcHolder = "0x3b15cec2d922ab0ef74688bcc1056461049f89cb";
const uni = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
const amountIn = 100e6
const wrappedEth = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
const cUSDT = "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9"
const comptroller ="0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b"
const lend = "0x7B4f352Cd40114f12e82fC675b5BA8C7582FC513"


async function swap() {
    // const usdtSigner = await ethers.getSigner(usdtHolder);
    const usdcSigner = await ethers.getSigner(usdcHolder);
    const router = await ethers.getContractAt("IRouter", uniRouter,usdcSigner);
    const usdtContract = await ethers.getContractAt("IERC20", usdt,usdcSigner);
    const usdcContract = await ethers.getContractAt("IERC20", usdc,usdcSigner);
    const cusdContract = await ethers.getContractAt("IERC20", cUSDT,usdcSigner);
    const uniContract = await ethers.getContractAt("IERC20",uni);
    const Lend = await ethers.getContractAt("Compound",lend,usdcSigner)
    // const Lend = await ethers.getContractFactory("Compound")
    // const greeter = await Lend.deploy()

    // await greeter.deployed();

    // console.log("lend address:", greeter.address);
    console.log(`balance before ${await usdtContract.balanceOf(usdcHolder)}`);
    
    await network.provider.send('hardhat_setBalance',[
            usdcHolder,
            '0x1000000000000000000000000000',
        ]);
      const usdtBal = await ethers.provider.getBalance(usdcHolder);
        console.log(usdtBal);
      
    await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [usdcHolder],
      });
    console.log(`approving ${uniRouter} to spend ${amountIn}`);
    await usdcContract.approve(uniRouter, amountIn);
    console.log(`swapping ${amountIn} USDC`);
    let usdtBalance = await usdcContract.balanceOf(usdcHolder);
    console.log("balance -> ",  Number(usdtBalance), "\n")


    await router.swapExactTokensForTokens(amountIn,0,[usdc,wrappedEth,usdt],usdcHolder,1746778404);
    console.log(`Balance now is ${await usdtContract.balanceOf(usdcHolder)}`)

    // console.log(`approving ${cUSDT} to spend ${amountIn}`);
    // await usdtContract.approve(cUSDT, "10000000000000000");

    const lending = await Lend.supplyErc20ToCompound(usdt,cUSDT,1000000)
    console.log(lending);
}
swap().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });