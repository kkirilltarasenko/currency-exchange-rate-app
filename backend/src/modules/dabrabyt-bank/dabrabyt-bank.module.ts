import { Module } from '@nestjs/common';
import { DabrabytBankController } from './dabrabyt-bank.controller';
import { DabrabytBankService } from './dabrabyt-bank.service';

@Module({
  controllers: [DabrabytBankController],
  providers: [DabrabytBankService],
})
export class DabrabytBankModule {}
