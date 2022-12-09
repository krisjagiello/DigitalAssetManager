import { Test, TestingModule } from '@nestjs/testing';
import { RegisterAssetService } from './register-asset.service';

describe('RegisterAssetService', () => {
  let service: RegisterAssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterAssetService],
    }).compile();

    service = module.get<RegisterAssetService>(RegisterAssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
