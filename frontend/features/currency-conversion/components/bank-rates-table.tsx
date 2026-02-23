"use client";

import { Box, Spinner, Text } from "@chakra-ui/react";
import { useCurrencyRatesQuery } from "../hooks/use-currency-rates.query";
import { Currency } from "../types";

interface BankRatesTableProps {
  fromCurrency?: Currency;
  toCurrency?: Currency;
}

export const BankRatesTable = ({
  fromCurrency,
  toCurrency,
}: BankRatesTableProps) => {
  const { data: bankData, isLoading, error } = useCurrencyRatesQuery();
  console.log(bankData, "DATA");
  const filteredRates = bankData?.rates?.filter((rate) => {
    if (!fromCurrency || !toCurrency) {
      return true;
    }

    const isDirectPair =
      rate.sellIso === fromCurrency.code && rate.buyIso === toCurrency.code;

    const isReversePair =
      rate.sellIso === toCurrency.code && rate.buyIso === fromCurrency.code;

    return isDirectPair || isReversePair;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <Box
        w="100%"
        h="100%"
        py={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box w="100%" h="100%" py={4}>
        <Box
          p={4}
          bg="red.50"
          borderRadius="md"
          border="1px solid"
          borderColor="red.200"
        >
          <Text color="red.600" fontWeight="500">
            Ошибка загрузки курсов банков
          </Text>
        </Box>
      </Box>
    );
  }

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
          gridTemplateColumns="2fr 80px 120px 120px 120px 160px"
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
          <Text textAlign="center">Валюта</Text>
          <Text textAlign="center">Покупка</Text>
          <Text textAlign="center">Продажа</Text>
          <Text textAlign="center">Обновлено</Text>
        </Box>

        {filteredRates && filteredRates.length > 0 ? (
          filteredRates.map((rate, index) => (
            <Box
              key={`${rate.buyIso}-${rate.sellIso}-${index}`}
              display="grid"
              gridTemplateColumns="2fr 80px 120px 120px 120px 160px"
              gap={6}
              py={4}
              px={4}
              borderBottom={
                index < (filteredRates || []).length - 1 ? "1px solid" : "none"
              }
              borderColor="gray.100"
              _hover={{
                bg: "gray.50",
              }}
              transition="background-color 0.2s"
            >
              <Box>
                <Text fontWeight="500" color="black" fontSize="md">
                  {bankData?.bankName}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {fromCurrency?.code}/{toCurrency?.code}
                </Text>
              </Box>

              <Box display="flex" justifyContent="center" alignItems="center">
                {bankData?.logoUrl ? (
                  <Box
                    w="40px"
                    h="40px"
                    borderRadius="6px"
                    overflow="hidden"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <img
                      src={bankData.logoUrl}
                      alt={bankData.bankName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ) : (
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
                )}
              </Box>

              <Box textAlign="center">
                <Text fontSize="xs" color="gray.500">
                  {rate.quantity}
                </Text>
                <Text fontWeight="500" color="black" fontSize="md">
                  {rate.buyIso}
                </Text>
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
                  {rate.date}
                </Text>
              </Box>
            </Box>
          ))
        ) : (
          <Box py={8} textAlign="center" gridColumn="1 / -1">
            <Text color="gray.500" fontSize="md">
              {fromCurrency && toCurrency
                ? `Курсы для пары ${fromCurrency.code}/${toCurrency.code} не найдены`
                : "Выберите валютную пару для отображения курсов"}
            </Text>
          </Box>
        )}
      </Box>

      <Box
        mt={4}
        p={3}
        bg="gray.50"
        borderRadius="8px"
        border="1px solid"
        borderColor="gray.200"
      >
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Курсы обновляются в режиме реального времени
        </Text>
      </Box>
    </Box>
  );
};
