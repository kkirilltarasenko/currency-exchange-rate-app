import { Controller, Get } from '@nestjs/common';
import { BelarusBankService } from './belarusbank.service';

@Controller('belarusbank')
export class BelarusBankController {
  constructor(private readonly belarusBankService: BelarusBankService) {}

  @Get('rates')
  getRates() {
    return this.belarusBankService.getRates();
  }
}
