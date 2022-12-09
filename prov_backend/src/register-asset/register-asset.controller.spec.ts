import { Test, TestingModule } from '@nestjs/testing';
import { RegisterAssetController } from './register-asset.controller';

describe('RegisterAssetController', () => {
  let controller: RegisterAssetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterAssetController],
    }).compile();

    controller = module.get<RegisterAssetController>(RegisterAssetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
