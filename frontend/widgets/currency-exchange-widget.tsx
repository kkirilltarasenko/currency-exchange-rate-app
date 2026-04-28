"use client";

import { Box, Grid, GridItem } from "@chakra-ui/react";
import { CurrencyConverter } from "@/features/currency-conversion/components/currency-converter";
import { BankRatesTable } from "@/features/currency-conversion/components/bank-rates-table";
import { useCurrencyConversion } from "@/features/currency-conversion/hooks/use-currency-conversion";

export const CurrencyExchangeWidget = () => {
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
      <Grid
        templateColumns={{ base: "1fr", lg: "400px 1fr" }}
        gap={6}
        h="100%"
      >
        <GridItem>
          <Box
            borderRight={{ base: "none", lg: "1px solid #c8c8c8" }}
            borderBottom={{ base: "1px solid", lg: "none" }}
            borderColor="gray.100"
            pr={{ base: 0, lg: 6 }}
            pb={{ base: 6, lg: 0 }}
            h="100%"
          >
            <CurrencyConverter />
          </Box>
        </GridItem>

        <GridItem>
          <Box h="100%" overflow="hidden">
            <BankRatesTable
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
            />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};