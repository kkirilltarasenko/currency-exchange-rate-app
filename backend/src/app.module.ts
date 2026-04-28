import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlfaBankModule } from './modules/alfa-bank';
import { BelarusBankModule } from './modules/belarusbank';
import { BelagropromBankModule } from './modules/belagroprombank';
import { DabrabytBankModule } from './modules/dabrabyt-bank';

@Module({
  imports: [
    AlfaBankModule,
    BelarusBankModule,
    BelagropromBankModule,
    DabrabytBankModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
