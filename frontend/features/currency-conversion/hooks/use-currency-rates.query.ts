import { useQuery } from "@tanstack/react-query";

import { ExchangeApi, QUERY_KEYS } from "@/api";

export const useCurrencyRatesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ALFA_BANK_RATES],
    queryFn: () => ExchangeApi.getAlfaBankRates(),
  });
};
