## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

要监听合约事件并在有人购买像素格子时更新 UI，我们可以在合约中定义事件，前端使用 ethers.js 监听并更新界面。以下是简洁的示例代码：

智能合约 (Solidity)

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract PixelGrid {
    uint256 constant GRID_SIZE = 100;
    uint256 constant PRICE = 0.01 ether;

    struct Pixel {
    string color;
    address owner;
    }

    mapping(uint256 => mapping(uint256 => Pixel)) public pixels;

    event PixelMinted(uint256 indexed x, uint256 indexed y, address buyer, string color);

    function mint(uint256 x, uint256 y, string memory color) public payable {
    require(x < GRID_SIZE && y < GRID_SIZE, "Out of bounds");
    require(msg.value >= PRICE, "Insufficient funds");
    require(pixels[x][y].owner == address(0), "Already minted");

    pixels[x][y] = Pixel(color, msg.sender);
    emit PixelMinted(x, y, msg.sender, color);
    }
    }

前端代码 (JavaScript with ethers.js)

    import { ethers } from 'ethers';

    const contractABI = [
    "event PixelMinted(uint256 indexed x, uint256 indexed y, address buyer, string color)"
    ];
    const contractAddress = "YOUR_CONTRACT_ADDRESS";

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    function updateUI(x, y, color) {
    const pixel = document.querySelector(`#pixel-${x}-${y}`);
    if (pixel) {
    pixel.style.backgroundColor = color;
    }
    }

    async function listenForEvents() {
    try {
    contract.on('PixelMinted', (x, y, buyer, color) => {
    console.log(`Pixel (${x}, ${y}) minted with color ${color} by ${buyer}`);
    updateUI(x.toNumber(), y.toNumber(), color);
    });
    } catch (error) {
    console.error('Event error:', error);
    setTimeout(listenForEvents, 5000);
    }
    }

    window.addEventListener('load', async () => {
    if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    listenForEvents();
    } else {
    console.error('MetaMask not found');
    }
    });

HTML (UI)

    <div id="grid" style="display: grid; grid-template-columns: repeat(100, 10px);">
    <!-- Pixels dynamically added or updated -->
    </div>

说明
合约：PixelMinted 事件在 mint 时触发，记录坐标、购买者和颜色。
前端：通过 contract.on 监听事件，调用 `updateUI...