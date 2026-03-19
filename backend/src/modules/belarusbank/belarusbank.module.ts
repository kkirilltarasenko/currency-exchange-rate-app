import { Module } from '@nestjs/common';
import { BelarusBankController } from './belarusbank.controller';
import { BelarusBankService } from './belarusbank.service';

@Module({
  controllers: [BelarusBankController],
  providers: [BelarusBankService],
})
export class BelarusBankModule {}
