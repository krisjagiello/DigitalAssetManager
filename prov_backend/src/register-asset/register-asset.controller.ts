import { RegisterAssetService } from './register-asset.service';
import { UserEntity } from '../user/user.entity';
import { User } from '@app/user/decorators/user.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { encode, decode } from 'multihashes';
import { base58_to_binary, binary_to_base58 } from 'base58-js';
import { RegisterAssetParams } from '@app/register-asset/dto/RegisteAssetParams.dto';

@Controller('register-asset')
export class RegisterAssetController {
  constructor(private readonly registerAssetService: RegisterAssetService) {}

  @Get('hi')
  sayHi() {
    console.log('hiiiiiiiiii');
    return 'Hiiiiiiiiiiii";';
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@User() user: UserEntity) {
    return await this.registerAssetService.findAll(user);
  }

  @Get('token-uri/:tokenId')
  async getTokenUri(@Param('tokenId') tokenId): Promise<string> {
    //let tokenId = 'keke';
    console.log('tokenId: ', tokenId);
    const uri = await this.registerAssetService.getUri(tokenId);
    console.log('URRI', uri);
    return 'ciebokaba';
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async registerAsset(
    @UploadedFile() file: Express.Multer.File,
    @User() user: UserEntity,
    @Body() parms: RegisterAssetParams
  ) {
    const result = await this.registerAssetService.register(file, user, parms);
    return result;
  } 

}
