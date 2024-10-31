// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract SLA_Layer_Slashing_oracle {

    mapping (address => mapping (address => mapping (string => uint256))) public slashedOrNot;

    function slash(address AVSId, address indexerId, string memory subgraphId, uint256 slashType) external {
        slashedOrNot[AVSId][indexerId][subgraphId] = slashType;
    }
}