// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function decimals() external view returns (uint256);
}

interface WETH {
    function deposit() external payable;
}

contract SLA_Fee_Splitter {
    IERC20 public USDC = IERC20(0x73d35BB43476FBEc5ce399260aAbb25ba0Aa1C84);

    function makePAyment(address indexer, address operator) external {
        uint256 amount = 5000 * 10 ** USDC.decimals();
        USDC.transferFrom(msg.sender, indexer, amount/2);
        USDC.transferFrom(msg.sender, operator, amount/2);
    }
}


pragma solidity ^0.8.11;

contract SLA_Payments {
    
    address public owner;
    address public indexer;
    address public restakers;
    uint256 public restakerFeeBips = 5000;
    uint256 public indexerFeeBips = 5000;


    constructor() {
        owner = msg.sender;
    }

    function payFee() external payable {
        uint256 amount = msg.value;
        uint256 restakerFeeAmount = restakerFeeBips * amount / 10000;
        uint256 indexerFeeAmount = indexerFeeBips * amount / 10000;
        payable(restakers).transfer(restakerFeeAmount);
        payable(indexer).transfer(indexerFeeAmount);
    }

    function payFeeWithToken(address paymentToken, uint256 amount) external {
        uint256 restakerFeeAmount = restakerFeeBips * amount / 10000;
        uint256 indexerFeeAmount = indexerFeeBips * amount / 10000;

        IERC20(paymentToken).transferFrom(msg.sender, indexer, indexerFeeAmount);
        IERC20(paymentToken).transferFrom(msg.sender, restakers, restakerFeeAmount);
    }


    function setFeeBips(uint256 restakerBips, uint256 indexerBips) external {
        require(msg.sender == owner);
        require(restakerBips + indexerBips == 10000);
        indexerFeeBips = restakerBips;
        restakerFeeBips = indexerBips;
    }

    function setFeeAddressses(address newIndexer, address newRestakers) external {
        require(msg.sender == owner);
        indexer = newIndexer;
        restakers = newRestakers;
    }

    function transferOwnership(address newOwner) external {
        require(msg.sender == owner);
        owner = newOwner;
    }

}