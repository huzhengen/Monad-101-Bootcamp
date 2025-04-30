## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

```js
const contractAddress = ""
const abi = ""
const provider = new ethers.providers.Web3Provider(window.ethereum)
const contract = new ethers.Contract(contractAddress, abi, provider)

contract.on("SquarePurchased", (buyer, idx, color) => {
    if (buyer) {
        getSquares()
    }
})

async function getSquares() {
    const squares = await contract.getSquares()
    for (let i = 0; i < squares.length; i++) {
        const cell = cells[i]
        cell.style.backgroundColor = "#" + squares[i].toString(16)
    }
}
```
