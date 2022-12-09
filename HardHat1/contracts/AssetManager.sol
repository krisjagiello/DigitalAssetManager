// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AssetManager is Ownable, Pausable, ERC721URIStorage {

    mapping(uint256 => string) internal _sampleURIs; // Map all samples to their URI - 'shadow' OpenZeppelin
    mapping(address => uint256[]) private userSamples; // Map samples to each user


    constructor() ERC721('Asset Manager', 'PROV') {}

    function _baseURI() internal view virtual override returns (string memory) {
      return 'prov58://';
    }

    // The uint256 value is keccack(sampleMultiHash)

    function mint(string calldata assetMultiHash, string calldata uri) public {

        uint256 tokenId = uint256(keccak256(abi.encodePacked(assetMultiHash)));

        // This will revert if sample already registered
        // Transfer event will be emitted otherwise
        _mint(msg.sender, tokenId);

        _setTokenURI(tokenId, uri);
    }

    // ------------------------------------------------------------------
    function _burn(uint256 tokenId) internal virtual override {
      revert('Burning is not allowed');
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
      revert('Transfers are not allowed');
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override {
      revert('Transfers are not allowed');
    }
    // ------------------------------------------------------------------

    // Pausable
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
