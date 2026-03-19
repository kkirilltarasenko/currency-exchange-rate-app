import { AbstractBank } from '../../common/decorators/abstract-bank.module';
import { BankRate } from '../../common/dto/bank.dto';

export class BelarusBankService extends AbstractBank {
  protected apiUrl = 'https://belarusbank.by/api/kursExchange?city=Минск';
  protected bankName = 'Беларусбанк';
  protected logoUrl =
    'https://m-belarusbank.by/wp-content/uploads/2024/02/cropped-mbelarusbank_260.png';

  private readonly currencyCodeMap: Record<string, number> = {
    USD: 840,
    EUR: 978,
    RUB: 643,
    CNY: 156,
    CZK: 203,
    PLN: 985,
    CAD: 124,
    SEK: 752,
    CHF: 756,
    JPY: 392,
    NOK: 578,
  };

  protected mapRates(apiResponse: unknown): BankRate[] {
    const mapRate = (rate: any): BankRate => ({
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

    console.log((apiResponse as any[]).length, 'LEN');
    const typedRates = (apiResponse as any[])
      .map((arg) => this.transformRates(arg))
      .filter((arg) => typeof arg !== 'undefined');

    if (typedRates.length) {
      return [typedRates.map(mapRate)[0]];
    }

    return [];
  }

  private transformRates(data: any): BankRate | undefined {
    const date = new Date().toISOString();
    // console.log(data, 'DATA in transformRates');
    const buy = data[`USD_in`];
    const sell = data[`USD_out`];

    if (!buy || !sell || buy === '0.0000' || sell === '0.0000') {
      return undefined;
    }

    return {
      buyRate: Number(sell),
      sellRate: Number(buy),

      buyIso: 'BYN',
      sellIso: 'USD',

      buyCode: 933,
      sellCode: this.currencyCodeMap['USD'],

      quantity: 1,

      name: 'доллар США',
      date,
    };
  }
}
