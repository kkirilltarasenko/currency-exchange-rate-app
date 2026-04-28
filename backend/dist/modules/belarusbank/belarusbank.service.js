"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BelarusBankService = void 0;
const abstract_bank_module_1 = require("../../common/decorators/abstract-bank.module");
class BelarusBankService extends abstract_bank_module_1.AbstractBank {
    apiUrl = 'https://belarusbank.by/api/kursExchange?city=Минск';
    bankName = 'Беларусбанк';
    logoUrl = 'https://m-belarusbank.by/wp-content/uploads/2024/02/cropped-mbelarusbank_260.png';
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
    mapRates(apiResponse) {
        const mapRate = (rate) => ({
            sellRate: rate.buyRate ?? 0,
            sellIso: rate.sellIso ?? '',
            sellCode: rate.sellCode ?? 0,
            buyRate: rate.sellRate ?? 0,
            buyIso: rate.buyIso ?? '',
            buyCode: rate.buyCode ?? 0,
            quantity: rate.quantity ?? 1,
            name: rate.name ?? `${rate.buyIso ?? ''}/${rate.sellIso ?? ''}`,
            date: rate.date ?? new Date().toISOString(),
        });
        const typedRates = apiResponse
            .map((arg) => this.transformRates(arg))
            .filter((arg) => typeof arg !== 'undefined');
        if (typedRates.length) {
            return [typedRates.map(mapRate)[0]];
        }
        return [];
    }
    transformRates(data) {
        const date = new Date().toISOString();
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
exports.BelarusBankService = BelarusBankService;
//# sourceMappingURL=belarusbank.service.js.map