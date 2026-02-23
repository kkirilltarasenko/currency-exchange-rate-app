import { httpClient } from "./http-client";
import { API_ENDPOINTS } from "./config";
import { BankRatesResponse } from "@contracts/bank.types";

export class ExchangeApi {
  static async getAlfaBankRates() {
    return httpClient.get<BankRatesResponse>(API_ENDPOINTS.ALFA_BANK_RATES);
  }
}
