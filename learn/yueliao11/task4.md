## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

            
          
# 如何监听合约事件并更新UI

在Web3应用中，监听合约事件是实现实时UI更新的重要方式。当其他用户购买了像素格子时，我们可以通过监听合约事件来及时更新UI，提供良好的用户体验。

## 示例代码

以下是使用ethers.js监听合约事件并更新UI的示例代码：

```javascript
// 引入ethers.js库
import { ethers } from "ethers";

// 假设我们已经有了合约ABI和地址
const contractABI = [
  // 这里是合约ABI，包含了事件定义
  // 示例：购买像素格子的事件
  "event PixelPurchased(address indexed buyer, uint256 indexed pixelId, uint256 price, uint256 timestamp)"
  // 其他ABI内容...
];
const contractAddress = "0x123..."; // 合约地址

// 连接到Monad网络
async function connectToContract() {
  try {
    // 配置Monad网络RPC URL
    const MONAD_RPC_URL = "https://rpc.monad.xyz";
    
    // 创建provider - 使用Monad网络的JSON-RPC
    const provider = new ethers.providers.JsonRpcProvider(MONAD_RPC_URL);
    
    // 如果使用钱包连接
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = web3Provider.getSigner();
      
      // 创建合约实例
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      return { contract, provider: web3Provider };
    } else {
      // 无钱包模式，只读连接
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      return { contract, provider };
    }
  } catch (error) {
    console.error("连接到Monad网络失败:", error);
    throw error;
  }
}

// 监听合约事件
async function listenToContractEvents() {
  try {
    const { contract, provider } = await connectToContract();
    
    console.log("开始监听PixelPurchased事件...");
    
    // 监听PixelPurchased事件 - 添加错误处理和重试逻辑
    const eventHandler = (buyer, pixelId, price, timestamp, event) => {
      try {
        console.log(`新的像素格子被购买!`);
        console.log(`买家: ${buyer}`);
        console.log(`像素ID: ${pixelId.toString()}`);
        console.log(`价格: ${ethers.utils.formatEther(price)} ETH`);
        console.log(`时间戳: ${new Date(timestamp.toNumber() * 1000).toLocaleString()}`);
        
        // 使用requestAnimationFrame优化UI更新性能
        requestAnimationFrame(() => {
          updateUI(buyer, pixelId, price, timestamp);
        });
      } catch (err) {
        console.error("处理事件时出错:", err);
      }
    };
    
    contract.on("PixelPurchased", eventHandler);
    
    // 监听过去的事件 - 调整区块范围以适应Monad网络
    const filter = contract.filters.PixelPurchased();
    const events = await contract.queryFilter(filter, -1000, "latest"); // Monad网络区块更快，减少查询范围
    
    console.log(`找到 ${events.length} 个历史购买事件`);
    
    // 批量处理历史事件以避免UI卡顿
    const batchSize = 10;
    for (let i = 0; i < events.length; i += batchSize) {
      const batch = events.slice(i, i + batchSize);
      requestAnimationFrame(() => {
        batch.forEach(event => {
          const { buyer, pixelId, price, timestamp } = event.args;
          updateUIWithHistoricalData(buyer, pixelId, price, timestamp);
        });
      });
    }
    
    // 监听区块 - 添加错误处理
    provider.on("block", (blockNumber) => {
      console.log(`新区块: ${blockNumber}`);
      updateBlockInfo(blockNumber);
    });
    
    // 添加事件监听器错误处理
    contract.on("error", (error) => {
      console.error("事件监听器错误:", error);
      // 可以在这里添加重试逻辑
    });
    
    return { contract, eventHandler }; // 返回合约实例和事件处理函数，以便取消监听
  } catch (error) {
    console.error("监听合约事件失败:", error);
    throw error;
  }
}

// 更新UI函数
function updateUI(buyer, pixelId, price, timestamp) {
  // 获取像素格子元素
  const pixelElement = document.getElementById(`pixel-${pixelId}`);
  
  if (pixelElement) {
    // 更新像素格子的样式或内容
    pixelElement.classList.add('purchased');
    pixelElement.setAttribute('data-owner', buyer);
    
    // 更新像素格子的工具提示
    pixelElement.setAttribute('title', `
      拥有者: ${buyer}
      价格: ${ethers.utils.formatEther(price)} ETH
      购买时间: ${new Date(timestamp.toNumber() * 1000).toLocaleString()}
    `);
    
    // 如果是当前用户刚购买的，可以添加特殊效果
    const currentUserAddress = getCurrentUserAddress(); // 获取当前用户地址的函数
    if (buyer.toLowerCase() === currentUserAddress.toLowerCase()) {
      pixelElement.classList.add('just-purchased');
      setTimeout(() => {
        pixelElement.classList.remove('just-purchased');
      }, 3000); // 3秒后移除特效
    }
  }
  
  // 更新购买历史列表
  updatePurchaseHistory(buyer, pixelId, price, timestamp);
  
  // 更新统计信息
  updateStatistics();
}

// 更新购买历史列表
function updatePurchaseHistory(buyer, pixelId, price, timestamp) {
  const historyList = document.getElementById('purchase-history');
  
  if (historyList) {
    // 创建新的历史记录项
    const historyItem = document.createElement('li');
    historyItem.className = 'history-item';
    
    // 格式化地址，只显示前6位和后4位
    const formattedAddress = `${buyer.substring(0, 6)}...${buyer.substring(buyer.length - 4)}`;
    
    // 设置历史记录内容
    historyItem.innerHTML = `
      <span class="buyer">${formattedAddress}</span>
      购买了像素 #${pixelId.toString()}，
      价格: <span class="price">${ethers.utils.formatEther(price)} ETH</span>
      <span class="time">${new Date(timestamp.toNumber() * 1000).toLocaleString()}</span>
    `;
    
    // 添加到列表开头
    historyList.insertBefore(historyItem, historyList.firstChild);
    
    // 如果列表太长，移除最旧的项
    if (historyList.children.length > 50) {
      historyList.removeChild(historyList.lastChild);
    }
  }
}

// 使用历史数据更新UI
function updateUIWithHistoricalData(buyer, pixelId, price, timestamp) {
  // 类似updateUI，但可能有不同的视觉效果
  // 例如显示"刚刚购买"的动画效果
  
  // 获取像素格子元素
  const pixelElement = document.getElementById(`pixel-${pixelId}`);
  
  if (pixelElement) {
    // 更新像素格子的样式或内容
    pixelElement.classList.add('purchased');
    pixelElement.setAttribute('data-owner', buyer);
    
    // 更新像素格子的工具提示
    pixelElement.setAttribute('title', `
      拥有者: ${buyer}
      价格: ${ethers.utils.formatEther(price)} ETH
      购买时间: ${new Date(timestamp.toNumber() * 1000).toLocaleString()}
    `);
  }
}

// 更新区块信息
function updateBlockInfo(blockNumber) {
  const blockInfoElement = document.getElementById('current-block');
  if (blockInfoElement) {
    blockInfoElement.textContent = blockNumber;
  }
}

// 更新统计信息
function updateStatistics() {
  // 这里可以更新总销售额、已售出像素数量等统计信息
  // 可以从合约中查询这些信息，或者在本地维护
}

// 获取当前用户地址
function getCurrentUserAddress() {
  // 实际应用中，这应该从钱包或应用状态中获取
  return "0x..."; // 当前用户的地址
}

// 取消事件监听
function stopListening(contract) {
  if (contract) {
    // 移除所有事件监听器
    contract.removeAllListeners("PixelPurchased");
    console.log("已停止监听事件");
  }
}

// 在组件挂载时开始监听
let contractInstance = null;
async function startApp() {
  try {
    contractInstance = await listenToContractEvents();
    console.log("应用已启动，正在监听事件");
  } catch (error) {
    console.error("启动应用失败:", error);
  }
}

// 在组件卸载时停止监听
function stopApp() {
  stopListening(contractInstance);
  contractInstance = null;
  console.log("应用已停止");
}

// 启动应用
startApp();

// 当页面关闭时停止监听
window.addEventListener('beforeunload', () => {
  stopApp();
});
```

## 代码解析

1. **连接到合约**：
   - 使用ethers.js创建provider和signer
   - 实例化合约对象

2. **监听合约事件**：
   - 使用`contract.on()`方法监听实时事件
   - 使用`contract.queryFilter()`获取历史事件

3. **更新UI**：
   - 当接收到事件时，更新相应的像素格子显示
   - 更新购买历史列表
   - 更新统计信息

4. **资源管理**：
   - 在组件卸载或页面关闭时取消事件监听，避免内存泄漏


通过以上方法，可以实现在其他用户购买像素格子时实时更新UI的功能，提升用户体验。

