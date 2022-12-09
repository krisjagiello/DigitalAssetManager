import * as ethers from 'ethers';
import * as fs from 'fs';
import { IAAssetManager } from '../../interface/IAssetManager';

export class AssetManagerV1 implements IAAssetManager {

  provider: any;
  wallet: any;
  contractF: any;

  constructor() {
    // Connect over named pipes using IPC:
    let path =
      '/home/jeegeet/Project/experiments/projects/prov/EthPrivProv/node2/geth.ipc';
    this.provider = new ethers.providers.IpcProvider(path);
    this.wallet = new ethers.Wallet(process.env.N2_PRIV_KEY, this.provider);

    
    const solidityOutput = fs.readFileSync(
      '/home/jeegeet/Project/experiments/projects/prov/HardHat1/artifacts/contracts/AssetManager.sol/AssetManager.json',
      'utf-8',
    )
    
    this.contractF = ethers.ContractFactory.fromSolidity(solidityOutput);

  }

  async mint(sampleMultiHash: string, uri: string): Promise<any> {
    const contract = await this.contractF.attach(
      '0xaF5Ac410D8aac4111bA989Cbf0DA221f196afe9a',
    );
    const contractWithSigner = contract.connect(this.wallet);
    let tx = await contractWithSigner.mint(sampleMultiHash, uri, {
      gasLimit: 1000000,
    });

    return tx;
  }
  async getUri(tokenId: bigint): Promise<string> {
    const contract = await this.contractF.attach(
      '0xaF5Ac410D8aac4111bA989Cbf0DA221f196afe9a',
    );
    const contractWithSigner = contract.connect(this.wallet);

    return contractWithSigner.tokenURI(tokenId);
  }




}