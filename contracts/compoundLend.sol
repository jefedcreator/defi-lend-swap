//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.10;
import "./CTokenInterface.sol"; 
import "./IERC20.sol";


contract Compound {
    function supplyErc20ToCompound(
        address _erc20Contract,
        address _cErc20Contract,
        uint256 amount
    ) public {
        // Create a reference to the usdt asset contract, like DAI.
        IERC20 usdt = IERC20(_erc20Contract);

        // Create a reference to the corresponding cToken contract, like cDAI
        CTokenInterface cToken = CTokenInterface(_cErc20Contract);

        // // Approve transfer on the ERC20 contract
        usdt.approve(address(cToken), amount);
        usdt.transferFrom(msg.sender, address(this), amount);

        // // Mint cTokens
        cToken.mint(amount);
    }
}