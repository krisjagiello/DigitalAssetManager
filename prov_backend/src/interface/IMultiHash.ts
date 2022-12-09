export interface IMultiHash {
  getMultiHashFromBuffer: (buf: Buffer) => string;
  getMultiHashFromString: (str: string) => string; 
}

export abstract class IAMultiHash implements IMultiHash {
  abstract getMultiHashFromBuffer(buf: Buffer): string;
  abstract getMultiHashFromString(str: string): string;
} 