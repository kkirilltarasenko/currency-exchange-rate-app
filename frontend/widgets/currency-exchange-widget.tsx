"use client";

import { Box, Grid, GridItem } from "@chakra-ui/react";
import { CurrencyConverter } from "@/features/currency-conversion/components/currency-converter";
import { BankRatesTable } from "@/features/currency-conversion/components/bank-rates-table";
import { CurrencyConversionProvider } from "@/features/currency-conversion/context/currency-conversion.context";

export const CurrencyExchangeWidget = () => {
  return (
    <CurrencyConversionProvider>
      <Box w="100%" h="100%" p={6}>
        {/* White Card Container */}
        <Box
          bg="white"
          borderRadius="2xl"
          boxShadow="xl"
          border="1px solid"
          borderColor="gray.200"
          h="100%"
          overflow="hidden"
          _dark={{
            bg: "gray.800",
            borderColor: "gray.700"
          }}
        >
          <Box p={8} h="100%">
            <Grid
              templateColumns={{ base: "1fr", lg: "400px 1fr" }}
              gap={6}
              h="100%"
            >
              <GridItem>
                <Box
                  borderRight={{ base: "none", lg: "1px solid" }}
                  borderBottom={{ base: "1px solid", lg: "none" }}
                  borderColor="border.subtle"
                  pr={{ base: 0, lg: 6 }}
                  pb={{ base: 6, lg: 0 }}
                  h="100%"
                >
                  <CurrencyConverter />
                </Box>
              </GridItem>

              <GridItem>
                <Box h="100%" overflow="hidden">
                  <BankRatesTable />
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Box>
    </CurrencyConversionProvider>
  );
};