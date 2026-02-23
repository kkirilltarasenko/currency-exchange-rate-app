import { Module } from '@nestjs/common';
import { AlfaBankController } from './alfa-bank.controller';
import { AlfaBankService } from './alfa-bank.service';

@Module({
  controllers: [AlfaBankController],
  providers: [AlfaBankService],
})
export class AlfaBankModule {}
