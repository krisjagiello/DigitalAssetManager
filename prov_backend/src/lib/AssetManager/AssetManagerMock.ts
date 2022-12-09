import { IAAssetManager } from '../../interface/IAssetManager';

export class AssetManagerMock implements IAAssetManager {
  async mint(sampleMultiHash: string, uri: string): Promise<any> {
    return { tx: 1 };
  }
  async getUri(tokenId: bigint): Promise<string> {
    return 'prov58/a/b';
  }
}