// SPDX-License-Identifier:GPL-3.0
pragma solidity ^0.8.4;

/**
 @title Ballot 
@dev Implements voting process along with vote delegation
 */
contract BuyEarth {
    uint256 private constant PRICE = 0.001 ether;
    address private owner;
    uint256[100] private squares;

    constructor() {
        owner = msg.sender;
    }

    event SquarePurchased(uint8 idx, address buyer, uint256 color);

    function getSquares() public view returns (uint256[] memory) {
        uint256[] memory _squares = new uint256[](100);
        for (uint256 i = 0; i < 100; i++) {
            _squares[i] = squares[i];
        }
        return _squares;
    }

    function buySquare(uint8 idx, uint256 color) public payable {
        require(idx >= 0 && idx < 100, "Invalid index");
        require(msg.value >= PRICE, "Insufficient payment");

        (bool sent, ) = owner.call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        squares[idx] = color;

        emit SquarePurchased(idx, msg.sender, color);

    }
}
