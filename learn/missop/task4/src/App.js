import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Grid,
  Box,
  Button,
  Input,
  Image,
  Text,
  VStack,
  defaultSystem,
  HStack,
  Badge,
  createToaster,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import GridMarket from "./GridMarket.json";

const GRID_SIZE = 6;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const initialGrids = Array.from(
  { length: GRID_SIZE * GRID_SIZE },
  (_, index) => ({
    x: Math.floor(index / GRID_SIZE),
    y: index % GRID_SIZE,
    owner: ZERO_ADDRESS,
    nickname: "",
    imageUrl: "",
    price: "0",
  })
);
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [grids, setGrids] = useState(initialGrids);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [selectedGrid, setSelectedGrid] = useState(null);
  const [nickname, setNickname] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState("0");
  const [provider, setProvider] = useState(null);

  const toast = createToaster({
    placement: "top-end",
    overlap: true,
  });

  useEffect(() => {
    initContract();
  }, []);

  // 监听账户变化
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          updateBalance(accounts[0]);
        } else {
          setAccount("");
          setBalance("0");
          setIsConnected(false);
        }
      });
    }
  }, []);

  const updateBalance = async (address) => {
    if (provider && address) {
      try {
        const balance = await provider.getBalance(address);
        setBalance(ethers.formatEther(balance));
      } catch (error) {
        console.error("Error getting balance:", error);
      }
    }
  };

  const initContract = async () => {
    if (window.ethereum) {
      try {
        // 检查是否已经有正在处理的请求
        if (window.ethereum._state && window.ethereum._state.isProcessing) {
          console.log("等待之前的请求完成...");
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return initContract(); // 重试
        }

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          console.log("用户拒绝了连接请求");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        setAccount(account);
        setIsConnected(true);
        updateBalance(account);

        const contract = new ethers.Contract(
          "0x31f97d0bE2c5879c3F359284048253935b1746bb", // 部署后替换为实际合约地址
          GridMarket.abi,
          signer
        );
        setContract(contract);
        loadGrids(contract);

        // 设置事件监听器
        contract.on(
          "GridPurchased",
          (x, y, owner, nickname, imageUrl, price) => {
            console.log("New grid purchased:", {
              x: x.toString(),
              y: y.toString(),
              owner,
              nickname,
              imageUrl,
              price: price.toString(),
            });
            setGrids((prevGrids) => {
              const newGrids = [...prevGrids];
              const index = Number(x) * GRID_SIZE + Number(y);
              newGrids[index] = {
                ...newGrids[index],
                owner,
                nickname,
                imageUrl,
                price: price.toString(),
              };
              return newGrids;
            });
          }
        );
      } catch (error) {
        if (error.code === -32002) {
          console.log("等待 MetaMask 处理之前的请求...");
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return initContract(); // 重试
        }
        console.error("Error initializing contract:", error);
      }
    } else {
      console.log("请安装 MetaMask 钱包");
    }
  };

  const loadGrids = async (contract) => {
    try {
      setIsLoading(true);
      const loadedGrids = [...initialGrids];

      for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
          try {
            const [owner, nickname, imageUrl, price] = await contract.getGrid(
              x,
              y
            );
            const index = x * GRID_SIZE + y;
            loadedGrids[index] = {
              ...loadedGrids[index],
              owner,
              nickname,
              imageUrl,
              price: price.toString(),
            };
          } catch (error) {
            console.error(`Error loading grid (${x},${y}):`, error);
          }
        }
      }

      setGrids(loadedGrids);
    } catch (error) {
      console.error("Error loading grids:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!contract || !selectedGrid) return;

    try {
      const tx = await contract.purchaseGrid(
        selectedGrid.x,
        selectedGrid.y,
        nickname,
        imageUrl,
        { value: ethers.parseEther("0.1") }
      );
      await tx.wait();
      loadGrids(contract);
    } catch (error) {
      console.error("Error purchasing grid:", error);
    }
  };

  // 在组件卸载时清理事件监听器
  useEffect(() => {
    return () => {
      if (contract) {
        contract.removeAllListeners("GridPurchased");
      }
    };
  }, [contract]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.create({
        type: "error",
        title: "错误",
        description: "请安装 MetaMask 钱包",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        setAccount(account);
        setIsConnected(true);
        updateBalance(account);

        const contract = new ethers.Contract(
          "0x31f97d0bE2c5879c3F359284048253935b1746bb",
          GridMarket.abi,
          signer
        );
        setContract(contract);
        loadGrids(contract);

        toast.create({
          type: "success",
          title: "成功",
          description: "钱包连接成功",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.create({
        type: "error",
        title: "错误",
        description: "连接钱包失败",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider value={defaultSystem}>
      <Box
        p={6}
        bg="gray.900"
        minH="100vh"
        backgroundImage="linear-gradient(to bottom right, gray.900, blue.900)"
      >
        <Box maxW="900px" mx="auto">
          <HStack justify="space-between" mb={6}>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="white"
              textAlign="center"
            >
              NFT Grid Market
            </Text>
            <HStack spacing={4}>
              {isConnected ? (
                <>
                  <Badge colorScheme="green" fontSize="sm">
                    已连接
                  </Badge>
                  <Text color="white" fontSize="sm">
                    余额: {balance} MON
                  </Text>
                  <Text color="white" fontSize="sm">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </Text>
                </>
              ) : (
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={connectWallet}
                  isLoading={isLoading}
                >
                  连接钱包
                </Button>
              )}
            </HStack>
          </HStack>

          <Grid
            templateColumns={`repeat(${GRID_SIZE}, 1fr)`}
            gap="3px"
            bg="whiteAlpha.200"
            p="3px"
            borderRadius="xl"
            boxShadow="2xl"
          >
            {grids.map((grid) => (
              <Box
                key={`${grid.x}-${grid.y}`}
                bg="gray.800"
                aspectRatio="1"
                onClick={() => setSelectedGrid(grid)}
                cursor="pointer"
                position="relative"
                opacity={isLoading ? 0.7 : 1}
                transition="all 0.3s ease"
                _hover={{
                  transform: "scale(1.05)",
                  boxShadow: "0 0 20px rgba(66, 153, 225, 0.3)",
                  zIndex: 1,
                }}
                _before={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: "sm",
                  border: "1px solid",
                  borderColor: "whiteAlpha.100",
                }}
              >
                {grid.owner !== ZERO_ADDRESS ? (
                  <VStack
                    spacing={1}
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    w="90%"
                    h="90%"
                    justify="center"
                  >
                    <Box
                      position="relative"
                      w="100%"
                      h="70%"
                      overflow="hidden"
                      borderRadius="md"
                    >
                      <Image
                        src={grid.imageUrl}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        fallbackSrc="https://via.placeholder.com/150?text=NFT"
                      />
                    </Box>
                    <Text
                      fontSize="xs"
                      color="whiteAlpha.900"
                      noOfLines={1}
                      textAlign="center"
                      fontWeight="medium"
                      px={1}
                      py={0.5}
                      bg="blackAlpha.500"
                      borderRadius="full"
                      w="full"
                    >
                      {grid.nickname || "Unnamed"}
                    </Text>
                  </VStack>
                ) : (
                  <VStack
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    spacing={2}
                  >
                    <Text color="blue.200" fontSize="xs" fontWeight="medium">
                      Available
                    </Text>
                    <Text color="whiteAlpha.600" fontSize="2xs">
                      0.1 MON
                    </Text>
                  </VStack>
                )}
              </Box>
            ))}
          </Grid>

          {selectedGrid && (
            <Box
              mt={6}
              bg="gray.800"
              p={6}
              borderRadius="xl"
              boxShadow="2xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              maxW="400px"
              mx="auto"
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(to right, blue.400, purple.400)",
              }}
            >
              <VStack spacing={5}>
                <Text color="white" fontSize="lg" fontWeight="bold">
                  Purchase Grid ({selectedGrid.x}, {selectedGrid.y})
                </Text>
                <Input
                  placeholder="Enter your nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  bg="whiteAlpha.50"
                  color="white"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  _hover={{
                    borderColor: "whiteAlpha.300",
                  }}
                  _focus={{
                    borderColor: "blue.400",
                    boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.6)",
                  }}
                  _placeholder={{
                    color: "whiteAlpha.400",
                  }}
                />
                <Input
                  placeholder="Enter NFT image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  bg="whiteAlpha.50"
                  color="white"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  _hover={{
                    borderColor: "whiteAlpha.300",
                  }}
                  _focus={{
                    borderColor: "blue.400",
                    boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.6)",
                  }}
                  _placeholder={{
                    color: "whiteAlpha.400",
                  }}
                />
                <Button
                  onClick={handlePurchase}
                  colorScheme="blue"
                  w="full"
                  size="lg"
                  isLoading={isLoading}
                  loadingText="Processing..."
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  Purchase for 0.1 ETH
                </Button>
              </VStack>
            </Box>
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
