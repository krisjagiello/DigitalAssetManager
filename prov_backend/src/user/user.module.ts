import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@app/user/user.controller';
import { Module } from '@nestjs/common';
import { UserService } from '@app/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Needed by the middleware (middleware defined outside of user module)
})
export class UserModule {}
