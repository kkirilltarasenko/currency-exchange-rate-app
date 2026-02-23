"use client";

import { Box, Text, } from "@chakra-ui/react";
import { useCurrencyConversion } from "../hooks/use-currency-conversion";

export const BankRatesTable = () => {
  const { getBankRates } = useCurrencyConversion();
  const bankRates = getBankRates();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box w="100%" h="100%" py={4} display="flex" flexDirection="column">
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="600" color="black" mb={2}>
          Курсы банков
        </Text>
        <Text fontSize="sm" color="gray.600">
          Актуальные курсы покупки и продажи валют
        </Text>
      </Box>

      <Box overflow="auto" flex="1">
        <Box
          display="grid"
          gridTemplateColumns="2fr 80px 120px 120px 160px"
          gap={6}
          py={3}
          px={4}
          borderBottom="1px solid"
          borderColor="gray.200"
          fontWeight="500"
          color="gray.700"
          fontSize="sm"
          position="sticky"
          top="0"
          bg="white"
          zIndex="1"
        >
          <Text>Банк</Text>
          <Text textAlign="center">Лого</Text>
          <Text textAlign="center">Покупка</Text>
          <Text textAlign="center">Продажа</Text>
          <Text textAlign="center">Обновлено</Text>
        </Box>

        {bankRates.map((rate, index) => (
          <Box
            key={rate.id}
            display="grid"
            gridTemplateColumns="2fr 80px 120px 120px 160px"
            gap={6}
            py={4}
            px={4}
            borderBottom={index < bankRates.length - 1 ? "1px solid" : "none"}
            borderColor="gray.100"
            _hover={{
              bg: "gray.50",
            }}
            transition="background-color 0.2s"
          >
            <Box>
              <Text fontWeight="500" color="black" fontSize="md">
                {rate.bankName}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {rate.currency}/{rate.baseCurrency}
              </Text>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center">
              <Box
                w="40px"
                h="40px"
                bg="gray.100"
                borderRadius="6px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderColor="gray.200"
              >
                <Text fontSize="xs" color="gray.400" textAlign="center">
                  🏦
                </Text>
              </Box>
            </Box>

            <Box textAlign="center">
              <Text fontWeight="600" color="green.600" fontSize="lg">
                {rate.buyRate.toFixed(4)}
              </Text>
            </Box>

            <Box textAlign="center">
              <Text fontWeight="600" color="red.600" fontSize="lg">
                {rate.sellRate.toFixed(4)}
              </Text>
            </Box>

            <Box textAlign="center">
              <Text fontSize="sm" color="gray.600">
                {formatDate(rate.lastUpdated)}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>

      <Box mt={4} p={3} bg="gray.50" borderRadius="8px" border="1px solid" borderColor="gray.200">
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Курсы обновляются в режиме реального времени
        </Text>
      </Box>
    </Box>
  );
};