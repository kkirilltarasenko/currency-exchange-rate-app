import { useQuery } from "@tanstack/react-query";

import { ExchangeApi, QUERY_KEYS } from "@/api";

const getRates = async () => {
  const alfaBank = ExchangeApi.getAlfaBankRates();
  const belarusBank = ExchangeApi.getBelarusBankRates();
  const belagropromBank = ExchangeApi.getBelagropromBankRates();
  const dabrabytBank = ExchangeApi.getDabrabytBankRates();

  const promises = await Promise.allSettled([alfaBank, belarusBank, belagropromBank, dabrabytBank]);
  console.log(promises);
  return promises.map((p) => {
    if (p.status === "fulfilled") {
      return p.value;
    } else {
      return undefined;
    }
  });
};

export const useCurrencyRatesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ALFA_BANK_RATES, QUERY_KEYS.BELARUS_BANK_RATES, QUERY_KEYS.BELAGROPROMBANK_RATES, QUERY_KEYS.DABRABYT_BANK_RATES],
    queryFn: getRates,
  });
};
