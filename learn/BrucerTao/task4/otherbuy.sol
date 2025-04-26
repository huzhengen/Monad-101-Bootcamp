// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PixelGrid {
    // 定义事件
    event SquareBought(uint256 indexed index, uint256 color, address buyer);
    
    // 存储每个格子的颜色
    uint256[] public squares;
    
    // 构造函数
    constructor() {
        squares = new uint256[](100);
    }
    
    // 购买格子函数
    function buySquare(uint256 index, uint256 color) public payable {
        require(index < 100, "Index out of range");
        require(msg.value >= 0.001 ether, "Insufficient payment");
        
        squares[index] = color;
        
        // 触发事件
        emit SquareBought(index, color, msg.sender);
    }
    
    // 获取所有格子颜色
    function getSquare() public view returns (uint256[] memory) {
        return squares;
    }
}