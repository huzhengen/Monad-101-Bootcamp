## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

要监听合约事件并在有人购买像素格子时及时更新 UI，我们需要：

在智能合约中定义并触发购买事件
在前端使用 ethers.js 设置事件监听
处理事件数据并更新 UI




智能合约代码 (Solidity)

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

    // 定义购买像素格子的事件
    event PixelPurchased(
        uint256 indexed x,
        uint256 indexed y,
        address indexed buyer,
        string color,
        uint256 price
    );

    // 购买格子函数
    function mint(uint256 x, uint256 y, string memory color) public payable {
        require(x < GRID_SIZE && y < GRID_SIZE, "Coordinates out of bounds");
        require(msg.value >= PRICE, "Insufficient payment");
        require(pixels[x][y].owner == address(0), "Pixel already minted");

        pixels[x][y] = Pixel(color, msg.sender);
        emit PixelPurchased(x, y, msg.sender, color, msg.value);
    }
}






前端代码 (JavaScript with ethers.js)

    import { ethers } from 'ethers';

     // 合约 ABI（仅包含必要的事件部分）
     const contractABI = [
    "event PixelPurchased(uint256 indexed x, uint256 indexed y, address indexed buyer, string color, uint256 price)",
    "function pixels(uint256 x, uint256 y) view returns (string color, address owner)"
     ];

    // 替换为实际的合约地址
    const contractAddress = "YOUR_CONTRACT_ADDRESS";

    // 初始化 provider 和 contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const pixelContract = new ethers.Contract(contractAddress, contractABI, provider);

    // 更新 UI 的函数
    function updatePixelOnUI(x, y, color, buyer) {
    // 假设 UI 中有一个 canvas 或 grid 元素来显示像素格子
    const pixelElement = document.getElementById(`pixel-${x}-${y}`);
    if (pixelElement) {
        pixelElement.style.backgroundColor = color;
        pixelElement.title = `Owner: ${buyer}`;
    } else {
        // 如果元素不存在，动态创建
        const gridContainer = document.getElementById('pixel-grid');
        const newPixel = document.createElement('div');
        newPixel.id = `pixel-${x}-${y}`;
        newPixel.className = 'pixel';
        newPixel.style.backgroundColor = color;
        newPixel.title = `Owner: ${buyer}`;
        gridContainer.appendChild(newPixel);
    }
    }

    // 设置事件监听
    async function setupEventListeners() {
    try {
        // 确保 provider 已连接
        await provider.getNetwork();

        // 创建事件过滤器
        const filter = pixelContract.filters.PixelPurchased();

        // 监听 PixelPurchased 事件
        pixelContract.on(filter, (x, y, buyer, color, price, event) => {
            console.log(`Pixel purchased at (${x}, ${y}) by ${buyer} for ${ethers.utils.formatEther(price)} ETH, color: ${color}`);
            
            // 更新 UI
            updatePixelOnUI(x.toNumber(), y.toNumber(), color, buyer);
        });

        // 错误处理
        pixelContract.on('error', (error) => {
            console.error('Event listener error:', error);
            // 尝试重新连接
            setTimeout(setupEventListeners, 5000);
        });

        console.log('Event listeners set up successfully');
    } catch (error) {
        console.error('Failed to set up event listeners:', error);
        // 5 秒后重试
        setTimeout(setupEventListeners, 5000);
    }
    }

    // 初始化
    window.addEventListener('load', async () => {
    if (window.ethereum) {
        try {
            // 请求用户连接钱包
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            await setupEventListeners();
        } catch (error) {
            console.error('Initialization failed:', error);
        }
    } else {
        console.error('Please install MetaMask!');
    }
    });


HTML 示例（UI 部分）

    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pixel Grid</title>
    <style>
        #pixel-grid {
            display: grid;
            grid-template-columns: repeat(100, 10px);
            gap: 1px;
        }
        .pixel {
            width: 10px;
            height: 10px;
            border: 1px solid #ddd;
        }
    </style>
    </head>
    <body>
    <div id="pixel-grid"></div>
    <script src="https://cdn.ethers.io/lib/ethers-5.7.umd.min.js"></script>
    <script src="your-script.js"></script>
    </body>
    </html>



实现说明
智能合约：
定义了 PixelPurchased 事件，包含坐标 (x, y)、购买者地址、颜色和价格。

在 mint 函数中触发事件，确保每次购买格子时都会广播事件。

前端监听：
使用 ethers.js 的 Contract 对象和 filters 方法创建事件过滤器。

通过 pixelContract.on 监听 PixelPurchased 事件，获取事件参数并调用 updatePixelOnUI 更新界面。

增加了错误处理机制，若监听失败会尝试重新连接。

UI 更新：
updatePixelOnUI 函数根据坐标 (x, y) 找到对应的像素格子元素，更新其背景颜色和所有者信息。

如果像素格子元素不存在，动态创建并添加到网格中。

初始化：
页面加载时检查 MetaMask 是否存在，并请求用户连接钱包。

调用 setupEventListeners 初始化事件监听。

注意事项
合约地址：需要将 contractAddress 替换为实际部署的合约地址。

网络：确保前端连接的以太坊网络（如 Sepolia 测试网）与合约部署的网络一致。

性能：对于大规模网格，建议优化 UI 更新逻辑，例如只更新受影响的像素区域。

安全性：确保事件监听的稳定性，处理网络断开或 MetaMask 错误的情况。

这个实现可以实时监听像素格子购买事件并更新 UI，适用于动态交互的区块链应用场景


