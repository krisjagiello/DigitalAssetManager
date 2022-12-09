import { RegisterAssetEntity } from './register-asset.entity';
import { verify } from 'jsonwebtoken';
import { RegisterAssetParams } from '@app/register-asset/dto/RegisterAssetParams.dto';
import { UserEntity } from '@app/user/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { encode, decode } from 'multihashes';
import { base58_to_binary, binary_to_base58 } from 'base58-js';
import * as multihashing from 'multihashing';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '@app/user/user.service';
import { IMultiHash } from '@app/interface/IMultiHash';
import { IAssetManager } from '@app/interface/IAssetManager';

@Injectable()
export class RegisterAssetService {
  constructor(
    @InjectRepository(RegisterAssetEntity)
    private readonly registerAssetRepository: Repository<RegisterAssetEntity>,
    private readonly userService: UserService,
    @Inject('MultiHash') private readonly multiHashEngine: IMultiHash,
    @Inject('AssetSampleManager') private readonly asm: IAssetSampleManager,
  ) {}


  async findAll(user: UserEntity): Promise<RegisterAssetEntity[]> {
    return await this.registerAssetRepository.find();
  }

  async register(
    file: Express.Multer.File,
    user: UserEntity,
    parms: RegisterAssetParams,
  ): Promise<RegisterAssetEntity> {

    const fileMultihash58 = this.multiHashEngine.getMultiHashFromBuffer(
      file.buffer,
    );

    console.log('prov58://' + fileMultihash58);


    const userData = await this.userService.findById(user.id);
    delete userData.id;

    const registration: any = {
      fileMultihash: fileMultihash58,
      trackName: parms.name,
      trackDescription: parms.description
    };
    Object.assign(registration, userData);
    console.log(JSON.stringify(registration));

    const registrationHash58 = this.multiHashEngine.getMultiHashFromString(JSON.stringify(registration));

    registration.recordMultihash = registrationHash58;
    registration.prov58Url = 'prov58://' + fileMultihash58 + '/' + registrationHash58;

    const newRegistration = new RegisterAssetEntity();

    Object.assign(newRegistration, registration);
    console.log('NewRegistration', newRegistration);

    const tx = await this.asm.mint(fileMultihash58, registration.prov58Url);
    console.log('transaction: ', tx);

    return await this.registerAssetRepository.save(newRegistration);

  }

  async getUri(tokenId: string): Promise<string> {
    const uri = await this.asm.getUri(BigInt(tokenId));
    
    console.log("URI: ", uri);
    return uri;
  }
}
