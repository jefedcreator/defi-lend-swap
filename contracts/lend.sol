//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./IERC20.sol";
import "./CTokenInterface.sol";
import "./IUSDT.sol";

contract Swapper{
    IERC20 internal USDC;
    IUSDT internal USDT;
    CTokenInterface internal cUSDT;
    
    function swapAndLend(uint amount,address _USDC, address _USDT,address _cErc20Contract) public {
        USDC = IERC20(_USDC);
        USDT = IUSDT(_USDT);
        cUSDT = CTokenInterface(_cErc20Contract);
        require(USDC.balanceOf(msg.sender)>= amount, "Insufficent balance");
        require(USDT.balanceOf(address(this))>= amount, "Insufficent funds");
        USDC.transferFrom(msg.sender, address(this), amount);
        USDT.transfer(msg.sender, amount);
        // // Approve transfer on the ERC20 contract
        USDT.approve(address(cUSDT), amount);
        // USDT.transferFrom(msg.sender, address(this), amount);
        // // // Mint cTokens
        cUSDT.mint(amount);
    }
}
    