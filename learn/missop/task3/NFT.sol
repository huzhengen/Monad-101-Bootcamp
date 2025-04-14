// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    uint256 private _tokenIdCounter;

// 每 mint 一个 nft 都需要把 count+1 表示 nft 总数量
    constructor() ERC721("NFT","NT") {
        _tokenIdCounter += 1;
    }

    function mint(address to) public {
        uint256 tokenId = _tokenIdCounter;
        _safeMint(to, tokenId);
        _tokenIdCounter += 1;
    }
}
