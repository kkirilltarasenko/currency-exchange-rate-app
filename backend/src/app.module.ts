import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlfaBankModule } from './modules/alfa-bank';
import { BelarusBankModule } from './modules/belarusbank';
import { BelagropromBankModule } from './modules/belagroprombank';
import { DabrabytBankModule } from './modules/dabrabyt-bank';
import { SettingsModule } from './modules/settings';

@Module({
  imports: [
    AlfaBankModule,
    BelarusBankModule,
    BelagropromBankModule,
    DabrabytBankModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
