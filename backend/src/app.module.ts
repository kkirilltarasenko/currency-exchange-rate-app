import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './modules/hello';
import { AlfaBankModule } from './modules/alfa-bank';

@Module({
  imports: [HelloModule, AlfaBankModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
