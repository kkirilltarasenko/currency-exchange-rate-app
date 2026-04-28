import { Controller, Get } from '@nestjs/common';
import { DabrabytBankService } from './dabrabyt-bank.service';

@Controller('dabrabyt-bank')
export class DabrabytBankController {
  constructor(private readonly dabrabytBankService: DabrabytBankService) {}

  @Get('rates')
  getRates() {
    return this.dabrabytBankService.getRates();
  }
}
