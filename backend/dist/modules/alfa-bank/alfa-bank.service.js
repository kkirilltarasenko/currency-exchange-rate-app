"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlfaBankService = void 0;
const abstract_bank_module_1 = require("../../common/decorators/abstract-bank.module");
class AlfaBankService extends abstract_bank_module_1.AbstractBank {
    apiUrl = 'https://ibapi.alfabank.by:8273/partner/1.0.1/public/rates';
    bankName = 'Альфа-Банк';
    logoUrl = 'https://png.klev.club/uploads/posts/2024-04/png-klev-club-i9fp-p-logotip-alfa-bank-png-12.png';
    mapRates(apiResponse) {
        const mapRate = (rate) => ({
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
        const typedRates = apiResponse;
        if (typedRates?.rates && Array.isArray(typedRates.rates)) {
            return typedRates.rates.map(mapRate);
        }
        return [];
    }
}
exports.AlfaBankService = AlfaBankService;
//# sourceMappingURL=alfa-bank.service.js.map