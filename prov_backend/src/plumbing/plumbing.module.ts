import { Injectable, Module } from '@nestjs/common';

import { AudioSampleManagerV1 } from '@app/lib/AudioSampleManager/AudioSampleManager';
import { AudioSampleManagerMock } from '@app/lib/AudioSampleManager/AudioSampleManagerMock';
import { MultiHash } from '@app/lib/MultiHash/MultiHash';

@Injectable()
class AudioSampleManagerSingleton extends AudioSampleManagerV1 {}

@Injectable()
class AudioSampleManagerMockSingleton extends AudioSampleManagerMock {}

@Injectable()
class MultiHashSingleton extends MultiHash {}

const asmProvider = {
  provide: 'AudioSampleManager',
  useClass: 
  process.env.ASM === 'useMock'
      ? AudioSampleManagerMockSingleton
      : AudioSampleManagerSingleton,
};

@Module({
  providers: [
    {
      provide: 'MultiHash',
      useClass: MultiHashSingleton,
    },
    asmProvider,
  ],
  exports: ['MultiHash', 'AudioSampleManager']
})
export class PlumbingModule {}
