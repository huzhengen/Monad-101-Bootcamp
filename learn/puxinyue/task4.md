## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

```tsx
  // 更新单个盒子状态
  const updateSingleBoxStatus = async (boxId: number) => {
    if (!isConnected) return;

    try {
      // 获取盒子完整状态
      const result = await readContract(config, {
        address: boxLotteryConfig.address,
        abi: boxLotteryConfig.abi,
        functionName: 'boxes',
        args: [BigInt(boxId)],
      }) as BoxData;

      const newBoxes = [...boxes];
      newBoxes[boxId] = {
        isOpened: result[0],
        prizeType: result[1],
        isClaimed: result[2]
      };
      setBoxes(newBoxes);

      // 显示开盒结果
      if (isOpenBoxSuccess && result[0]) {
        let message = '';
        switch (result[1]) {
          case 0:
            message = '很遗憾，未中奖';
            break;
          case 1:
            message = '恭喜获得 0.002 ETH!';
            break;
          case 2:
            message = '恭喜获得 0.1 ETH!';
            break;
          case 3:
            message = '恭喜获得 1 ETH!';
            break;
          case 4:
            message = '恭喜获得 NFT!';
            break;
        }
        addToast('success', message);
      }
    } catch (error) {
      console.error('更新盒子状态失败:', error);
      addToast('error', '更新盒子状态失败');
    }
  };

```