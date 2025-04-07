// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract SimpleNFT is ERC721, Ownable {
    uint256 private _tokenIds;
    uint256 public constant MINT_PRICE = 0.01 ether;

    constructor()
        ERC721("SimpleNFT", "SNFT") // Explicitly call ERC721 constructor
        Ownable(_msgSender()) // Explicitly call Ownable constructor
    {}

    // Mint a new NFT
    function mintNFT() public payable returns (uint256) {
        require(msg.value >= MINT_PRICE, "Must send at least 0.01 ETH to mint");

        _tokenIds += 1;
        uint256 newItemId = _tokenIds;

        _mint(msg.sender, newItemId);

        return newItemId;
    }

    // Override _baseURI to return the IPFS base URI
    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs://QmUn6Lvi1VVHe3kqBkh7XHbsAgpesLjgE89EWcPMe5SrC2/";
    }

    // Allow owner to withdraw funds
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }
}
