import { UserModule } from '@app/user/user.module';
import { UserService } from '@app/user/user.service';
import { RegisterAssetEntity } from './register-asset.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RegisterAssetController } from './register-asset.controller';
import { RegisterAssetService } from './register-asset.service';
import { PlumbingModule } from '@app/plumbing/plumbing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegisterAssetEntity]),
    UserModule,
    PlumbingModule,
  ],
  controllers: [RegisterAssetController],
  providers: [RegisterAssetService]
})
export class RegisterAssetModule {}
