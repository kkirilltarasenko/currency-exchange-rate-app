"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BelagropromBankService = void 0;
const abstract_bank_module_1 = require("../../common/decorators/abstract-bank.module");
class BelagropromBankService extends abstract_bank_module_1.AbstractBank {
    apiUrl = 'https://belapb.by/api/ExCardsDaily/';
    bankName = 'Белагропромбанк';
    logoUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxqbrFqkYTScPovvx-Fq5adrfCE_QaOCvHEw&s';
    responseType = 'xml';
    currencyCodeMap = {
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
    buildApiUrl() {
        const today = new Date();
        const dateParam = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
        return `${this.apiUrl}?ondate=${dateParam}`;
    }
    mapRates(apiResponse) {
        try {
            const xmlData = apiResponse;
            if (!xmlData?.DailyExCards?.Currency) {
                return [];
            }
            const currencies = Array.isArray(xmlData.DailyExCards.Currency)
                ? xmlData.DailyExCards.Currency
                : [xmlData.DailyExCards.Currency];
            const rates = [];
            const date = new Date().toISOString();
            for (const currency of currencies) {
                const charCode = currency.CharCode;
                const scale = currency.Scale ? parseInt(currency.Scale, 10) : 1;
                const buyRate = parseFloat(currency.RateBuy);
                const sellRate = parseFloat(currency.RateSell);
                if (isNaN(buyRate) ||
                    isNaN(sellRate) ||
                    buyRate === 0 ||
                    sellRate === 0) {
                    continue;
                }
                let baseCurrency = charCode;
                let quoteCurrency = 'BYN';
                if (charCode.includes('(') && charCode.includes(')')) {
                    const match = charCode.match(/^([A-Z]+)\(([A-Z]+)\)$/);
                    if (match) {
                        baseCurrency = match[1];
                        quoteCurrency = match[2];
                    }
                }
                else {
                    baseCurrency = charCode;
                    quoteCurrency = 'BYN';
                }
                const baseCode = this.currencyCodeMap[baseCurrency] || 0;
                const quoteCode = quoteCurrency === 'BYN'
                    ? 933
                    : this.currencyCodeMap[quoteCurrency] || 0;
                const rate = {
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
        }
        catch (error) {
            console.error(`[${this.bankName}] Error mapping rates:`, error);
            return [];
        }
    }
    getCurrencyName(baseCurrency, quoteCurrency) {
        const currencyNames = {
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
exports.BelagropromBankService = BelagropromBankService;
//# sourceMappingURL=belagroprombank.service.js.map