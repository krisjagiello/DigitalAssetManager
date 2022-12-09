import { UserEntity } from './../user/user.entity';
import { User } from '@app/user/decorators/user.decorator';
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { encode, decode } from 'multihashes';
import { base58_to_binary, binary_to_base58 } from 'base58-js';


@Controller('upload')
export class UploadController {
  @Get()
  sayHi() {
    console.log('hiiiiiiiiii');
    return 'Hiiiiiiiiiiii";';
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @User() user: UserEntity,
  ) {

    console.log('BLAHAAAAAAAAAAAAAAA ', user);

    console.log(file.buffer);
    const encoded = encode(file.buffer, 'sha2-256');
    console.log('prov58://' + binary_to_base58(encoded));
    //return file.buffer.toString();
    return decode(encoded);
  }
}
