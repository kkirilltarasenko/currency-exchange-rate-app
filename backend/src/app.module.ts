import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlfaBankModule } from './modules/alfa-bank';

@Module({
  imports: [AlfaBankModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
