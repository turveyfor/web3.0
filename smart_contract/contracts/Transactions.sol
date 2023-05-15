// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    // 交易数量
    uint256 transactionCount = 0;

    // 交易事件
    event Transfer(address _from, address receiver, uint256 amount, string message, uint256 timestamp, string keyword);

    // 交易属性
    struct TransferStruct {
        // 交易ID
        address sender;
        // 交易接收者
        address receiver;
        // 交易数量
        uint amount;
        // 交易信息
        string message;
        // 交易时间戳
        uint256 timestamp;
        // 交易关键字
        string keyword;
    }

    TransferStruct[] transactions;

    constructor(){

    }

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        transactions.push(TransferStruct(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        ));
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;

    }

    function getAllTransactionCount() public view returns (uint256) {
        return transactionCount;

    }
}
