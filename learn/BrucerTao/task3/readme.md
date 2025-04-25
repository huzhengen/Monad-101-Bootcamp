1.安装hardhat，并启动hardhat项目
    npm init -y
    npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers @openzeppelin/contracts

    npx hardhat

2.编写合约继承ERC721，然后配置hardhat.config.js用于网络链接部署用

3.编译合约
    npx hardhat compile

4.编写部署脚本，并且部署到网络上
    npx hardhat run scripts/deploy.js --network monadTest

5.根据部署地址，编写交易脚本，进行交易
    npx hardhat run scripts/mint.js --network monadTest
