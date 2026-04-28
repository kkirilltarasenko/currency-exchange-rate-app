import { Controller, Get } from '@nestjs/common';
import { BelagropromBankService } from './belagroprombank.service';

@Controller('belagroprombank')
export class BelagropromBankController {
  constructor(
    private readonly belagropromBankService: BelagropromBankService,
  ) {}

  @Get('rates')
  getRates() {
    return this.belagropromBankService.getRates();
  }
}
