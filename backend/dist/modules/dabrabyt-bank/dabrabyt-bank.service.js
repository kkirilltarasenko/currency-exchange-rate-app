"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DabrabytBankService = void 0;
const abstract_bank_module_1 = require("../../common/decorators/abstract-bank.module");
class DabrabytBankService extends abstract_bank_module_1.AbstractBank {
    apiUrl = 'https://bankdabrabyt.by/export_courses.php';
    bankName = 'Дабрабыт';
    logoUrl = 'https://bankdabrabyt.by/upload/%D0%9B%D0%BE%D0%B3%D0%BE.png';
    responseType = 'xml';
    currencyCodeMap = {
        USD: 840,
        EUR: 978,
        RUB: 643,
    };
    currencyNameMap = {
        USD: 'доллар США',
        EUR: 'евро',
        RUB: 'российский рубль',
    };
    mapRates(apiResponse) {
        try {
            const response = apiResponse;
            if (!response?.root?.filials?.filial) {
                console.warn('[Dabrabyt Bank] No filials found in response');
                return [];
            }
            const filials = Array.isArray(response.root.filials.filial)
                ? response.root.filials.filial
                : [response.root.filials.filial];
            const rates = [];
            const date = new Date().toISOString();
            for (const filial of filials) {
                if (!filial?.rates?.value) {
                    continue;
                }
                const filialRates = Array.isArray(filial.rates.value)
                    ? filial.rates.value
                    : [filial.rates.value];
                for (const rate of filialRates) {
                    const { iso, buy, sale } = rate.$;
                    if (iso.includes('/')) {
                        continue;
                    }
                    if (!this.currencyCodeMap[iso]) {
                        continue;
                    }
                    const buyRate = parseFloat(buy);
                    const sellRate = parseFloat(sale);
                    if (isNaN(buyRate) ||
                        isNaN(sellRate) ||
                        buyRate <= 0 ||
                        sellRate <= 0) {
                        continue;
                    }
                    rates.push({
                        buyRate: buyRate,
                        sellRate: sellRate,
                        buyIso: 'BYN',
                        sellIso: iso,
                        buyCode: 933,
                        sellCode: this.currencyCodeMap[iso],
                        quantity: 1,
                        name: this.currencyNameMap[iso] || iso,
                        date,
                    });
                }
            }
            const uniqueRates = rates.filter((rate, index, self) => index === self.findIndex((r) => r.sellIso === rate.sellIso));
            console.log(`[Dabrabyt Bank] Processed ${uniqueRates.length} unique rates from ${filials.length} filials`);
            return uniqueRates;
        }
        catch (error) {
            console.error('[Dabrabyt Bank] Error parsing XML response:', error);
            return [];
        }
    }
}
exports.DabrabytBankService = DabrabytBankService;
//# sourceMappingURL=dabrabyt-bank.service.js.map