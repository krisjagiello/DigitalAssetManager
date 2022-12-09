import { UserModule } from '@app/user/user.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { UploadModule } from './upload/upload.module';
import { RegisterAssetModule } from './register-asset/register-asset.module';
import { PlumbingModule } from './plumbing/plumbing.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UserModule, UploadModule, RegisterAssetModule, PlumbingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
