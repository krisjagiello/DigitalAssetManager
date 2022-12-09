export interface IAssetManager {
  mint: (sampleMultiHash: string, uri: string) => Promise<any>;
  getUri: (tokenId: bigint) => Promise<string>
}

export abstract class IAAssetManager implements IAAssetManager {
  abstract mint(sampleMultiHash: string, uri: string): Promise<any>;
  abstract getUri(tokenId: bigint): Promise<string>;
} 
