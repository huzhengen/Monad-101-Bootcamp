## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

### 合约端
```solidity
function purchasePixel(
        uint256 pixelIndex,
        uint256 pixelColor,
        string memory pixelImage
    ) public payable verifyPrice(pixelIndex) nonReentrant {
        pixelArray[pixelIndex] = pixelColor;
        pixelMapping[pixelIndex] = Pixel(
            msg.sender,
            pixelIndex,
            pixelColor,
            true,
            pixelImage
        );
        // 发送事件
        emit PixelPurchased(msg.sender, pixelIndex, pixelColor);

        // 检测是否所有格子都被购买
        bool allPixelsPurchased = checkAllPixelsPurchased();
        if (allPixelsPurchased) {
            // 触发随机函数，寻找中奖格子
            uint256 randomness = uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.number,
                        msg.sender,
                        address(this)
                    )
                )
            );
            uint256 prevWinnerIndex = randomness % pixelArray.length;

            // 链上资金发送给中奖的玩家
            prevWinnerAddress = pixelMapping[prevWinnerIndex].player;

            uint256 prize = address(this).balance;
            (bool success, ) = prevWinnerAddress.call{value: prize}("");
            if (!success) {
                revert PixelGame__TransferFailed();
            } else {
                // 重置所有格子的颜色
                resetPixels();
                emit PixelWinner(prevWinnerAddress);
            }
        }
    }
```


### 前端

```javascript
 const result = useBalance({
    address: contractConfig.address
  })

  const { data: prevWinnerAddress, isPending,refetch: refetchPrevWinner } = useReadContract({
    ...contractConfig,
    functionName: 'prevWinnerAddress'
  })
// 防抖 refetch 函数
const debouncedRefetch = useCallback(
  debounce(() => {
    // 同时更新余额和 prevWinnerAddress
    result.refetch().catch((error) => {
      console.error('Failed to refetch balance:', error);
    });
    refetchPrevWinner().catch((error:any) => {
      console.error('Failed to refetch prevWinnerAddress:', error);
    });
  }, 1000), // 防抖 1 秒
  [result.refetch, refetchPrevWinner]
);

// 监听 PixelPurchased 事件
useWatchContractEvent({
  address: contractConfig.address,
  abi: contractConfig.abi,
  eventName: 'PixelPurchased',
  onLogs(logs) {
    console.log('PixelPurchased logs!', logs);
    // 调用防抖后的 refetch
    debouncedRefetch();
  },
});

```