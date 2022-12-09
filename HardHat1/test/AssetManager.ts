import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

const address0 = "0x0000000000000000000000000000000000000000";
const randomAddress = "0xe1f5206bbd030e7b0592d8917820024e2a7437b4";
const alaGoodTokenId =
  "0xf5e06954a3a7c1ccaed8675b3fb429e23a839b5b406a72432bd6532dcd400d18";
const alaBadTokenId =
  "0xf5e06954a3a7c1ccaed8675b3fb429e23a839b5b406a72432bd6532dcd400d17";

describe("AssetManager", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployAsmFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    console.log(owner.address);

    const AssetManager = await ethers.getContractFactory(
      "AssetManager"
    );
    const asm = await AssetManager.deploy();
    await asm.deployed();

    return { asm, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { asm, owner } = await loadFixture(deployAsmFixture);

      expect(await asm.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", function () {
    describe("Events", function () {
      it("Should emit an event on a mint and contain the token URI", async function () {
        const { asm, owner } = await loadFixture(deployAsmFixture);

        await expect(asm.mint("ala", "ala/makota"))
          .to.emit(asm, "Transfer")
          .withArgs(address0, owner.address, alaGoodTokenId);

          expect(await asm.tokenURI(alaBadTokenId)).to.equal("prov58://ala/makota");
      });
    });
  });
});
