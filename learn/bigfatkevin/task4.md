## 第四章：Web3 前端 101

1. 完成课程的实操后，请思考如何监听合约事件；当有别人购买了像素格子的时候，如何及时通过监听事件更新 UI ? 请提交示例代码

  // 实时事件监听
  useEffect(() => {
    const unwatch = publicClient.watchContractEvent({
      address: CONTRACT_ADDRESS,
      abi: [parseAbiItem(
        'event PixelUpdated(uint256 indexed x, uint256 indexed y, address newOwner, string color, string imageCID)'
      )],
      onLogs: (logs) => {
        logs.forEach((log) => {
          const { x, y, newOwner, color, imageCID } = log.args;
          updateGrid(x, y, newOwner, color, imageCID);
        });
      },
      onError: (error) => {
        console.error('Event listening error:', error);
      }
    });

    return () => unwatch();
  }, []);

  // 更新本地状态
  const updateGrid = (x: number, y: number, owner: string, color: string, cid: string) => {
    setGrid(prev => {
      const newGrid = [...prev];
      newGrid[x][y] = { 
        owner, 
        color, 
        image: cid ? `${IPFS_GATEWAY}/${cid}` : null 
      };
      return newGrid;
    });
  };

  // 渲染逻辑...
}
