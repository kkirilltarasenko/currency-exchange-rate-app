import { httpClient } from "./http-client";
import { API_ENDPOINTS } from "./config";
import { HelloWorldResponse } from "@contracts/hello.types";

export class ExchangeApi {
  static async getHelloWorld() {
    return httpClient.get<HelloWorldResponse>(API_ENDPOINTS.HELLO);
  }
}
