"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractBank = void 0;
const xml2js = __importStar(require("xml2js"));
class AbstractBank {
    responseType = 'json';
    getName() {
        return this.bankName;
    }
    getLogo() {
        return this.logoUrl;
    }
    buildApiUrl() {
        return this.apiUrl;
    }
    async getRates() {
        try {
            const response = await fetch(this.buildApiUrl());
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data;
            if (this.responseType === 'xml') {
                const xmlText = await response.text();
                const parser = new xml2js.Parser({ explicitArray: false });
                data = await parser.parseStringPromise(xmlText);
            }
            else {
                data = await response.json();
            }
            const rates = this.mapRates(data);
            console.log(`[${this.bankName}] Successfully fetched ${rates.length} rates`);
            return {
                bankName: this.bankName,
                logoUrl: this.logoUrl,
                rates,
            };
        }
        catch (error) {
            console.error(`[${this.bankName}] Error fetching rates:`, error);
            throw error;
        }
    }
}
exports.AbstractBank = AbstractBank;
//# sourceMappingURL=abstract-bank.module.js.map