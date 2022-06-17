pragma solidity 0.8.10;

import "hardhat/console.sol";

interface IUSDT {
    function transfer(address _to, uint _value) external view;
    function balanceOf(address _owner) external returns (uint); 
    function approve(address spender, uint256 amount) external returns (bool);
}