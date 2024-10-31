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
}

interface ISLA_Registry {
    function SLAType(address indexer) external view returns (uint256);
    function SLAIndex(address indexer) external view returns (uint256);
    function operators() external view returns (address[] memory);
}

pragma solidity ^0.8.11;

contract SLA_Coverage {

    address public owner;
    IERC20 public USDC = IERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
    ISLA_Registry public registry = ISLA_Registry(0xD321dc13822f09e6c70f85384ddb781dB729979B);

    struct SubgraphPlan {
        string subgraphID;
        string plan;
    }

    mapping (string => uint256) public startTimeA;
    mapping (string => uint256) public startTimeB;
    mapping (string => uint256) public startTimeC;

    mapping (string => bool) public readIndexerInterests;
    mapping (address => string[]) public deals;

    mapping (string => mapping(uint256 => address)) public SLAIndexer;

    string[] public subgraphsA;
    string[] public subgraphsB;
    string[] public subgraphsC;

    uint256 public durationA = 60 * 60; //1 hour
    uint256 public durationB = 60 * 60 * 24; //1 day
    uint256 public durationC = 60; //60 seconds, 1 minute

    address[] public indexers;

    constructor() {
        owner = msg.sender;
    }

    function SLAPlanA(string memory subgraphID) external {
        //USDC.transferFrom(msg.sender, address(this), 10 ** 6); // removed for testing
        if (startTimeA[subgraphID] == 0) {
            subgraphsA.push(subgraphID);
        }
        startTimeA[subgraphID] = block.timestamp;
    }

    function SLAPlanB(string memory subgraphID) external {
        //USDC.transferFrom(msg.sender, address(this), 2 * 10 ** 6); // removed for testing
        if (startTimeB[subgraphID] == 0) {
            subgraphsB.push(subgraphID);
        }
        startTimeB[subgraphID] = block.timestamp;
    }

    function SLAPlanC(string memory subgraphID) external {
        //USDC.transferFrom(msg.sender, address(this), 3 * 10 ** 6); // removed for testing
        if (startTimeC[subgraphID] == 0) {
            subgraphsC.push(subgraphID);
        }
        startTimeC[subgraphID] = block.timestamp;
    }

    function showRegisteredAndPrepaidAVSs(uint256 SLAPlanType, uint256 start, uint256 end) external view returns (string[] memory){
        string[] memory subgraphs = new string[](end - start);
        uint256 i;
        if (SLAPlanType == 1) {
            for (i = start; i < end; i++) {
                subgraphs[i-start] = subgraphsA[i];
            }
        }
        else if (SLAPlanType == 2) {
            for (i = start; i < end; i++) {
                subgraphs[i-start] = subgraphsB[i];
            }
        }
        else if (SLAPlanType == 3) {
            for (i = start; i < end; i++) {
                subgraphs[i-start] = subgraphsC[i];
            }
        }

        return subgraphs;
    }

    function getTotalSubgraphsInsured(uint256 SLAPlanType) external view returns (uint256) {
        uint256 total;
        if (SLAPlanType == 1) {
            total = subgraphsA.length;
        }
        else if (SLAPlanType == 2) {
            total = subgraphsB.length;
        }
        else if (SLAPlanType == 3) {
            total = subgraphsC.length;
        }
        return total;
    }

    function SLAPlanIsActive(string memory subgraphID, uint256 SLAPlanType) public view returns (bool) {
        bool active = false;
        if (SLAPlanType == 1) {
            if (startTimeA[subgraphID] + durationA <= block.timestamp) {
                active = true;
            }
        }
        else if (SLAPlanType == 2) {
            if (startTimeB[subgraphID] + durationB <= block.timestamp) {
                active = true;
            }
        }
        else if (SLAPlanType == 3) {
            if (startTimeC[subgraphID] + durationC <= block.timestamp) {
                active = true;
            }
        }
        return active;
    }

    function commitToSLA(string memory subgraphID, uint256 SLAPlanType) external {
        require(registry.SLAType(msg.sender) != 0);
        require(SLAIndexer[subgraphID][SLAPlanType] == address(0));
        SLAIndexer[subgraphID][SLAPlanType] = msg.sender;
        deals[msg.sender].push(subgraphID);
        bool found = false;
        for (uint256 i = 0; i < indexers.length; i++) {
            if (indexers[i] == msg.sender) {
                found = true;
                break;
            }
        }
        if (found == false) {
            indexers.push(msg.sender);
        }
    }

    function uncommitFromSLA(string memory subgraphID, uint256 SLAPlanType) external {
        require(SLAPlanIsActive(subgraphID, SLAPlanType) == false);
        uint256 end = deals[SLAIndexer[subgraphID][SLAPlanType]].length - 1;
        for (uint256 i=0; i <= end; i++) {
            if (keccak256(bytes(deals[SLAIndexer[subgraphID][SLAPlanType]][i])) == keccak256(bytes(subgraphID))) {
                deals[SLAIndexer[subgraphID][SLAPlanType]][i] = deals[SLAIndexer[subgraphID][SLAPlanType]][end];
                delete deals[SLAIndexer[subgraphID][SLAPlanType]][end];
                break;
            }
        }
        SLAIndexer[subgraphID][SLAPlanType] = address(0);
    }

    function makeDeal(address indexer, string[] memory subgraphId) external {}

    function removeDeal(address indexer, string memory subgraphID, uint256 SLAPlanType) external {
        require(SLAPlanIsActive(subgraphID, SLAPlanType) == false);
        uint256 end = deals[indexer].length - 1;
        for (uint256 i=0; i <= end; i++) {
            if (keccak256(bytes(deals[indexer][i])) == keccak256(bytes(subgraphID))) {
                deals[indexer][i] = deals[indexer][end];
                delete deals[indexer][end];
                break;
            }
        }
        SLAIndexer[subgraphID][SLAPlanType] = address(0);
    }

    //register an indexer for multiple subgraphs at once
    //for testing only can intake indexer adddress
    function registerIndexerInterest(address indexer, string[] memory subgraphID, uint256[] memory SLAPlanType) external {
        require(registry.SLAType(indexer) != 0);
        for (uint256 i=0; i<subgraphID.length; i++) {
            require(SLAIndexer[subgraphID[i]][SLAPlanType[i]] == address(0));
            SLAIndexer[subgraphID[i]][SLAPlanType[i]] = indexer;
            deals[indexer].push(subgraphID[i]);
        }
    }

    function distributeFunds() external {
        uint256 balance = USDC.balanceOf(address(this));
        USDC.transferFrom(address(this), owner, balance/2);
        USDC.transferFrom(address(this), owner, balance/2);
    }

    function transferOwnership(address newOwner) external {
        require(msg.sender == owner);
        owner = newOwner;
    }

    function getSLAPlansBySubgraphIDs(string[] memory subgraphIDs) external view returns (SubgraphPlan[] memory) {
        SubgraphPlan[] memory plans = new SubgraphPlan[](subgraphIDs.length);

        for (uint256 i = 0; i < subgraphIDs.length; i++) {
            string memory subgraphID = subgraphIDs[i];
            if (startTimeA[subgraphID] != 0) {
                plans[i] = SubgraphPlan(subgraphID, "bronze");
            } else if (startTimeB[subgraphID] != 0) {
                plans[i] = SubgraphPlan(subgraphID, "silver");
            } else if (startTimeC[subgraphID] != 0) {
                plans[i] = SubgraphPlan(subgraphID, "gold");
            } else {
                plans[i] = SubgraphPlan(subgraphID, "none");
            }
        }

        return plans;
    }
}