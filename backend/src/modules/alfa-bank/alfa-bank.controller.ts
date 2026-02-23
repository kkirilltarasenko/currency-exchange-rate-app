import { Controller, Get } from '@nestjs/common';
import { AlfaBankService } from './alfa-bank.service';

@Controller('alfa-bank')
export class AlfaBankController {
  constructor(private readonly alfaBankService: AlfaBankService) {}

  @Get('rates')
  getRates() {
    return this.alfaBankService.getRates();
  }
}
