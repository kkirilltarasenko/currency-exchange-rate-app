"use client";

import { Box, Stack } from "@chakra-ui/react";
import { CurrencyConverter } from "@/features/currency-conversion/components/currency-converter";
import { BankRatesTable } from "@/features/currency-conversion/components/bank-rates-table";
import { useCurrencyConversion } from "@/features/currency-conversion/hooks/use-currency-conversion";

export const CurrencyExchangeWidget = () => {
  // Получаем выбранные валюты из хука
  const { fromCurrency, toCurrency } = useCurrencyConversion();
  
  
  return (
    <Box
      w="100%"
      h="100%"
      p={7}
      bg="white"
      borderRadius="12px"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1)"
    >
      <Stack gap={0} h="100%">
        <Box borderBottom="1px solid" borderColor="gray.200">
          <CurrencyConverter />
        </Box>

        <Box flex="1" overflow="hidden">
          <BankRatesTable
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
          />
        </Box>
      </Stack>
    </Box>
  );
};