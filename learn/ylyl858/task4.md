## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

智能合约：定义事件
在智能合约中添加 PixelPurchased 事件，记录购买者、格子坐标和颜色，并在购买时触发
contract PixelGrid {
    event PixelPurchased(uint256 x, uint256 y, address buyer, string color);

    function buyPixel(uint256 x, uint256 y, string memory color) public payable {
        // 购买逻辑
        emit PixelPurchased(x, y, msg.sender, color);
    }
}
使用 Ethers.js 监听 PixelPurchased 事件，监听到事件后更新 UI。

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = [
    "event PixelPurchased(uint256 x, uint256 y, address buyer, string color)",
    "function getPixelColor(uint256 x, uint256 y) public view returns (string)"
];
const contract = new ethers.Contract(contractAddress, contractABI, provider);

contract.on("PixelPurchased", async (x, y, buyer, color) => {
    try {
        const color = await contract.getPixelColor(x, y);
        const gridCell = gridCells[`${x}-${y}`]; // 假设 gridCells 是 DOM 元素映射
        if (gridCell) gridCell.style.backgroundColor = color;
    } catch (error) {
        console.error("Error updating UI:", error);
    }
});