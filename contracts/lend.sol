//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./CTokenInterface.sol";
import "./IUSDT.sol";
import "./IERC20.sol";
import "./IUniswapV2Router.sol";

contract Swapper{
    IERC20 internal USDC;
    IUSDT internal USDT;
    CTokenInterface internal cUSDT;
    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    
    function swapAndLend(
    uint amount,
    address _USDC, 
    address _USDT,
    address _cErc20Contract
    ) public {
        USDC = IERC20(_USDC);
        USDT = IUSDT(_USDT);
        cUSDT = CTokenInterface(_cErc20Contract);
        require(USDC.balanceOf(msg.sender)>= amount, "Insufficent balance");
        USDC.transferFrom(msg.sender, address(this), amount);
        USDC.approve(UNISWAP_V2_ROUTER, amount);
        address[] memory path;
        if (_USDC == WETH || _USDT == WETH) {
        path = new address[](2);
        path[0] = address(USDC);
        path[1] = address(USDT);
        } else {
        path = new address[](3);
        path[0] = address(USDC);
        path[1] = WETH;
        path[2] = address(USDT);
        }
        IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactTokensForTokens(amount, 0, path, msg.sender, block.timestamp);
        // // Approve transfer on the ERC20 contract
        USDT.transferFrom(msg.sender, address(this), amount);
        USDT.approve(address(cUSDT), amount);
        // // // Mint cTokens
        require(cUSDT.mint(amount) == 0, "Mint Failed");
        cUSDT.redeem(cUSDT.balanceOf(address(this)));
    }
}
    