import { AbstractBank } from '../../common/decorators/abstract-bank.module';
import { BankRate } from '../../common/dto/bank.dto';

interface BelagropromBankXmlCurrency {
  $: {
    Id: string;
  };
  CharCode: string;
  NumCode: string;
  Scale?: string;
  RateBuy: string;
  RateSell: string;
}

interface BelagropromBankXmlResponse {
  DailyExCards: {
    $: {
      Date: string;
    };
    Currency: BelagropromBankXmlCurrency[];
  };
}

export class BelagropromBankService extends AbstractBank {
  protected apiUrl = 'https://belapb.by/api/ExCardsDaily/';
  protected bankName = 'Белагропромбанк';
  protected logoUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxqbrFqkYTScPovvx-Fq5adrfCE_QaOCvHEw&s';
  protected responseType: 'json' | 'xml' = 'xml';

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

  protected buildApiUrl(): string {
    const today = new Date();
    const dateParam = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    return `${this.apiUrl}?ondate=${dateParam}`;
  }

  protected mapRates(apiResponse: unknown): BankRate[] {
    try {
      const xmlData = apiResponse as BelagropromBankXmlResponse;

      if (!xmlData?.DailyExCards?.Currency) {
        return [];
      }

      const currencies = Array.isArray(xmlData.DailyExCards.Currency)
        ? xmlData.DailyExCards.Currency
        : [xmlData.DailyExCards.Currency];

      const rates: BankRate[] = [];
      const date = new Date().toISOString();

      for (const currency of currencies) {
        const charCode = currency.CharCode;
        const scale = currency.Scale ? parseInt(currency.Scale, 10) : 1;
        const buyRate = parseFloat(currency.RateBuy);
        const sellRate = parseFloat(currency.RateSell);

        if (
          isNaN(buyRate) ||
          isNaN(sellRate) ||
          buyRate === 0 ||
          sellRate === 0
        ) {
          continue;
        }

        // Handle cross-currency pairs like "EUR(CNY)" or simple currencies like "USD"
        let baseCurrency = charCode;
        let quoteCurrency = 'BYN';

        if (charCode.includes('(') && charCode.includes(')')) {
          // Cross-currency pair like "EUR(CNY)"
          const match = charCode.match(/^([A-Z]+)\(([A-Z]+)\)$/);
          if (match) {
            baseCurrency = match[1];
            quoteCurrency = match[2];
          }
        } else {
          // Simple currency like "USD" - assume it's against BYN
          baseCurrency = charCode;
          quoteCurrency = 'BYN';
        }

        const baseCode = this.currencyCodeMap[baseCurrency] || 0;
        const quoteCode =
          quoteCurrency === 'BYN'
            ? 933
            : this.currencyCodeMap[quoteCurrency] || 0;

        const rate: BankRate = {
          sellRate: sellRate / scale,
          sellIso: baseCurrency,
          sellCode: baseCode,
          buyRate: buyRate / scale,
          buyIso: quoteCurrency,
          buyCode: quoteCode,
          quantity: scale,
          name: this.getCurrencyName(baseCurrency, quoteCurrency),
          date,
        };

        rates.push(rate);
      }

      return rates;
    } catch (error) {
      console.error(`[${this.bankName}] Error mapping rates:`, error);
      return [];
    }
  }

  private getCurrencyName(baseCurrency: string, quoteCurrency: string): string {
    const currencyNames: Record<string, string> = {
      USD: 'доллар США',
      EUR: 'евро',
      RUB: 'российский рубль',
      CNY: 'китайский юань',
      CZK: 'чешская крона',
      PLN: 'польский злотый',
      CAD: 'канадский доллар',
      SEK: 'шведская крона',
      CHF: 'швейцарский франк',
      JPY: 'японская иена',
      NOK: 'норвежская крона',
      BYN: 'белорусский рубль',
    };

    const baseName = currencyNames[baseCurrency] || baseCurrency;
    const quoteName = currencyNames[quoteCurrency] || quoteCurrency;

    if (quoteCurrency === 'BYN') {
      return baseName;
    }

    return `${baseName} к ${quoteName}`;
  }
}
