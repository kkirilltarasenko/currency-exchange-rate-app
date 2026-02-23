"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractBank = void 0;
class AbstractBank {
    getName() {
        return this.bankName;
    }
    getLogo() {
        return this.logoUrl;
    }
    async getRates() {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        return {
            bankName: this.bankName,
            logoUrl: this.logoUrl,
            rates: this.mapRates(data),
        };
    }
}
exports.AbstractBank = AbstractBank;
//# sourceMappingURL=abstract-bank.module.js.map