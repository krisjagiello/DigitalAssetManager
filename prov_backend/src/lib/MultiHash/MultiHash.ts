import { IAMultiHash } from '../../interface/IMultiHash';
import * as multihashing from 'multihashing';
import { encode, decode } from 'multihashes';
import { base58_to_binary, binary_to_base58 } from 'base58-js';

export class MultiHash implements IAMultiHash {
  getMultiHashFromBuffer(buf: Buffer): string {
    const bufMultihash = multihashing(buf, 'sha2-256');
    console.log(multihashing.verify(bufMultihash, buf));
    const bufMultihash58 = binary_to_base58(bufMultihash);

    return bufMultihash58;
  }
  getMultiHashFromString(str: string): string {
    const strMultiHash = multihashing(JSON.stringify(str), 'sha2-256');
    const strMultiHash58 = binary_to_base58(strMultiHash);

    return strMultiHash58;
  }
} 