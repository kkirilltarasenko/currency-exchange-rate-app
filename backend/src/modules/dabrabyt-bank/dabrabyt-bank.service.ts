import { AbstractBank } from '../../common/decorators/abstract-bank.module';
import { BankRate } from '../../common/dto/bank.dto';

interface DabrabytBankXmlResponse {
  root: {
    time: string;
    filials: {
      filial: DabrabytBankFilial | DabrabytBankFilial[];
    };
  };
}

interface DabrabytBankFilial {
  $: {
    name: string;
  };
  city: string;
  address: string;
  id: string;
  rates: {
    value: DabrabytBankRate | DabrabytBankRate[];
  };
}

interface DabrabytBankRate {
  $: {
    iso: string;
    code: string;
    buy: string;
    sale: string;
  };
}

export class DabrabytBankService extends AbstractBank {
  protected apiUrl = 'https://bankdabrabyt.by/export_courses.php';
  protected bankName = 'Дабрабыт';
  protected logoUrl =
    'https://bankdabrabyt.by/upload/%D0%9B%D0%BE%D0%B3%D0%BE.png';
  protected responseType = 'xml' as const;

  private readonly currencyCodeMap: Record<string, number> = {
    USD: 840,
    EUR: 978,
    RUB: 643,
  };

  private readonly currencyNameMap: Record<string, string> = {
    USD: 'доллар США',
    EUR: 'евро',
    RUB: 'российский рубль',
  };

  protected mapRates(apiResponse: unknown): BankRate[] {
    try {
      const response = apiResponse as DabrabytBankXmlResponse;

      if (!response?.root?.filials?.filial) {
        console.warn('[Dabrabyt Bank] No filials found in response');
        return [];
      }

      // Handle both single filial and array of filials
      const filials = Array.isArray(response.root.filials.filial)
        ? response.root.filials.filial
        : [response.root.filials.filial];

      const rates: BankRate[] = [];
      const date = new Date().toISOString();

      // Process each filial
      for (const filial of filials) {
        if (!filial?.rates?.value) {
          continue;
        }

        // Handle both single rate and array of rates
        const filialRates = Array.isArray(filial.rates.value)
          ? filial.rates.value
          : [filial.rates.value];

        for (const rate of filialRates) {
          const { iso, buy, sale } = rate.$;

          // Skip cross-currency rates (e.g., USD/EUR, USD/RUB)
          if (iso.includes('/')) {
            continue;
          }

          // Only process supported currencies
          if (!this.currencyCodeMap[iso]) {
            continue;
          }

          const buyRate = parseFloat(buy);
          const sellRate = parseFloat(sale);

          // Skip invalid rates
          if (
            isNaN(buyRate) ||
            isNaN(sellRate) ||
            buyRate <= 0 ||
            sellRate <= 0
          ) {
            continue;
          }

          rates.push({
            buyRate: buyRate, // Rates are already in correct format
            sellRate: sellRate, // Rates are already in correct format
            buyIso: 'BYN',
            sellIso: iso,
            buyCode: 933, // BYN code
            sellCode: this.currencyCodeMap[iso],
            quantity: 1,
            name: this.currencyNameMap[iso] || iso,
            date,
          });
        }
      }

      // Remove duplicates by keeping the first occurrence of each currency
      const uniqueRates = rates.filter(
        (rate, index, self) =>
          index === self.findIndex((r) => r.sellIso === rate.sellIso),
      );

      console.log(
        `[Dabrabyt Bank] Processed ${uniqueRates.length} unique rates from ${filials.length} filials`,
      );

      return uniqueRates;
    } catch (error) {
      console.error('[Dabrabyt Bank] Error parsing XML response:', error);
      return [];
    }
  }
}
