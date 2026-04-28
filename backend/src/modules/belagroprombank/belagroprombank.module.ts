import { Module } from '@nestjs/common';
import { BelagropromBankController } from './belagroprombank.controller';
import { BelagropromBankService } from './belagroprombank.service';

@Module({
  controllers: [BelagropromBankController],
  providers: [BelagropromBankService],
})
export class BelagropromBankModule {}
