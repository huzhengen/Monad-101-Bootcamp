## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

import { ethers } from 'ethers';

const contractABI = [
  "event PixelPurchased(uint256 indexed x, uint256 indexed y, address buyer, uint256 price, string color)"
];

const provider = new ethers.providers.Web3Provider(window.ethereum);
const pixelContract = new ethers.Contract(contractAddress, contractABI, provider);

// 监听PixelPurchased事件
function setupEventListeners() {
  const filter = pixelContract.filters.PixelPurchased();
  pixelContract.on(filter, (x, y, buyer, price, color, event) => {
    console.log(`Pixel purchased at (${x}, ${y}) by ${buyer} for ${ethers.utils.formatEther(price)} ETH, color: ${color}`);
    // 更新UI
    updatePixelOnUI(x, y, color, buyer);
  });

  // 错误处理
  pixelContract.on("error", (error) => {
    console.error("Event listener error:", error);
    // 可以尝试重新连接
    setTimeout(setupEventListeners, 5000);
  });
}

