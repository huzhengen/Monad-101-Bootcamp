// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GridMarket {
    struct Grid {
        address owner;
        string nickname;
        string imageUrl;
        uint256 price;
    }

    uint256 public constant GRID_SIZE = 10;
    uint256 public constant INITIAL_PRICE = 0.1 ether;
    
    mapping(uint256 => mapping(uint256 => Grid)) public grids;
    mapping(address => uint256) public userBalances;

    event GridPurchased(uint256 x, uint256 y, address buyer, string nickname, string imageUrl);
    event GridUpdated(uint256 x, uint256 y, string nickname, string imageUrl);

    constructor() {
        // 初始化所有方格的价格
        for (uint256 x = 0; x < GRID_SIZE; x++) {
            for (uint256 y = 0; y < GRID_SIZE; y++) {
                grids[x][y].price = INITIAL_PRICE;
            }
        }
    }

    function purchaseGrid(uint256 x, uint256 y, string memory nickname, string memory imageUrl) external payable {
        require(x < GRID_SIZE && y < GRID_SIZE, "Invalid grid coordinates");
        require(msg.value >= grids[x][y].price, "Insufficient payment");
        require(grids[x][y].owner == address(0), "Grid already owned");

        grids[x][y] = Grid({
            owner: msg.sender,
            nickname: nickname,
            imageUrl: imageUrl,
            price: msg.value
        });

        emit GridPurchased(x, y, msg.sender, nickname, imageUrl);
    }

    function updateGrid(uint256 x, uint256 y, string memory nickname, string memory imageUrl) external {
        require(x < GRID_SIZE && y < GRID_SIZE, "Invalid grid coordinates");
        require(grids[x][y].owner == msg.sender, "Not the owner");

        grids[x][y].nickname = nickname;
        grids[x][y].imageUrl = imageUrl;

        emit GridUpdated(x, y, nickname, imageUrl);
    }

    function getGrid(uint256 x, uint256 y) external view returns (address, string memory, string memory, uint256) {
        require(x < GRID_SIZE && y < GRID_SIZE, "Invalid grid coordinates");
        Grid memory grid = grids[x][y];
        return (grid.owner, grid.nickname, grid.imageUrl, grid.price);
    }
} 