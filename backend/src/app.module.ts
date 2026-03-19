import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlfaBankModule } from './modules/alfa-bank';
import { BelarusBankModule } from './modules/belarusbank';

@Module({
  imports: [AlfaBankModule, BelarusBankModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
