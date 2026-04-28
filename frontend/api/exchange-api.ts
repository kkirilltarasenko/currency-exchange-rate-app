import { httpClient } from "./http-client";
import { API_ENDPOINTS } from "./config";
import { BankRatesResponse } from "@contracts/bank.types";

export class ExchangeApi {
  static async getAlfaBankRates() {
    return httpClient.get<BankRatesResponse>(API_ENDPOINTS.ALFA_BANK_RATES);
  }

  static async getBelarusBankRates() {
    return httpClient.get<BankRatesResponse>(API_ENDPOINTS.BELARUS_BANK_RATES);
  }

  static async getBelagropromBankRates() {
    return httpClient.get<BankRatesResponse>(API_ENDPOINTS.BELAGROPROMBANK_RATES);
  }

  static async getDabrabytBankRates() {
    return httpClient.get<BankRatesResponse>(API_ENDPOINTS.DABRABYT_BANK_RATES);
  }
}
