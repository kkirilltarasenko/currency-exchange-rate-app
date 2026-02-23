import { AbstractBank } from '../../common/decorators/abstract-bank.module';
import { BankRate } from '../../common/dto/bank.dto';

interface AlfaBankApiRate {
  sellRate?: number;
  sellIso?: string;
  sellCode?: number;
  buyRate?: number;
  buyIso?: string;
  buyCode?: number;
  quantity?: number;
  name?: string;
  date?: string;
}

export class AlfaBankService extends AbstractBank {
  protected apiUrl =
    'https://ibapi.alfabank.by:8273/partner/1.0.1/public/rates';
  protected bankName = 'Альфа-Банк';
  protected logoUrl =
    'https://png.klev.club/uploads/posts/2024-04/png-klev-club-i9fp-p-logotip-alfa-bank-png-12.png';

  protected mapRates(apiResponse: unknown): BankRate[] {
    const mapRate = (rate: AlfaBankApiRate): BankRate => ({
      sellRate: rate.sellRate ?? 0,
      sellIso: rate.sellIso ?? '',
      sellCode: rate.sellCode ?? 0,
      buyRate: rate.buyRate ?? 0,
      buyIso: rate.buyIso ?? '',
      buyCode: rate.buyCode ?? 0,
      quantity: rate.quantity ?? 1,
      name: rate.name ?? `${rate.buyIso ?? ''}/${rate.sellIso ?? ''}`,
      date: rate.date ?? new Date().toISOString(),
    });

    // API Альфа-банка возвращает массив курсов напрямую
    if (Array.isArray(apiResponse)) {
      return apiResponse.map(mapRate);
    }

    // Если API возвращает объект с массивом rates
    const typedRates = apiResponse as { rates?: AlfaBankApiRate[] };
    if (typedRates?.rates && Array.isArray(typedRates.rates)) {
      return typedRates.rates.map(mapRate);
    }

    return [];
  }
}
