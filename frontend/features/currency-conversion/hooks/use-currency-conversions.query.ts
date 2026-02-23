import { useQuery } from "@tanstack/react-query";

import { ExchangeApi, QUERY_KEYS } from "@/api";

export const useCurrencyConversionsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.HELLO],
    queryFn: () => ExchangeApi.getHelloWorld(),
  });
};
