pragma solidity 0.8.10;

import "hardhat/console.sol";


interface IUSDT {
    function transfer(address to, uint256 amount) external;
    function transferFrom(address from, address to, uint256 amount) external;
    function balanceOf(address _owner) external returns (uint); 
    function approve(address spender, uint256 amount) external;
}