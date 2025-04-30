// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract BuyEarth {
    uint256 private constant PRICE = 0.001 ether;
    address private owner;
    uint[100] private squares;

    event SquarePurchased(address indexed buyer, uint8 indexed squareIndex, uint color);

    constructor() {
        owner = msg.sender;
    }

    function getSquares() public view returns (uint[] memory) {
        uint[] memory _squares = new uint[](100);
        for (uint i = 0; i < 100; i++) {
            _squares[i] = squares[i];
        }
        return _squares;
    }

    function buySquare(uint8 idx, uint color) public payable {
        require(idx < 100, "Invalid index");
        require(msg.value == PRICE, "Insufficient payment");
        (bool sent, ) = owner.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        squares[idx] = color;
        emit SquarePurchased(msg.sender, idx, color);
    }
}