// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract SLA_Registry {
    mapping (address => uint256) public applied;
    mapping (address => bool) public approved;
    mapping (address => bool) public approvers;
    mapping (address => uint256) public SLAIndex;
    mapping (address => uint256) public SLAType;
    address[] public operators;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function applyFor(uint256 _type) external {
        applied[msg.sender] = _type;
    }

    function approve(address _applicant, bool _approved) external {
        require(approvers[msg.sender] == true);
        require(applied[_applicant] != 0);
        approved[_applicant] = _approved;
        if (_approved == true) {
            SLAIndex[_applicant] = operators.length;
            SLAType[_applicant] = applied[_applicant];
            operators.push(_applicant);
        }
        delete applied[_applicant];
    }

    function deregister(address _operator) external {
        require(approvers[msg.sender] == true);
        require(approved[_operator] == true);
        approved[_operator] = false;
        operators[SLAIndex[_operator]] = operators[operators.length - 1];
        SLAIndex[operators[operators.length - 1]] = SLAIndex[_operator];
        delete operators[operators.length - 1];
        delete SLAIndex[_operator];
        delete SLAType[_operator];
    }

    function addApprover(address _approver, bool _status) external {
        require(msg.sender == owner);
        approvers[_approver] = _status;
    }

    function getOperators() external view returns (address[] memory) {
        return operators;
    }

    function amountOperators() external view returns (uint256) {
        return operators.length;
    }

    function transferOwnership(address newOwner) external {
        require(msg.sender == owner);
        owner = newOwner;
    }


}




pragma solidity ^0.8.11;

contract SLA_Registry2 {
    mapping (address => uint256) public SLAIndex;
    mapping (address => uint256) public SLAType;
    address[] public operators;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function applyFor(address indexer, uint256 _type) external {
        SLAIndex[indexer] = operators.length;
        SLAType[indexer] = _type;
        operators.push(indexer);
    }

    function deregister(address _operator) external {
        operators[SLAIndex[_operator]] = operators[operators.length - 1];
        SLAIndex[operators[operators.length - 1]] = SLAIndex[_operator];
        delete operators[operators.length - 1];
        delete SLAIndex[_operator];
        delete SLAType[_operator];
    }

    function getOperators() external view returns (address[] memory) {
        return operators;
    }

    function amountOperators() external view returns (uint256) {
        return operators.length;
    }

    function transferOwnership(address newOwner) external {
        require(msg.sender == owner);
        owner = newOwner;
    }


}