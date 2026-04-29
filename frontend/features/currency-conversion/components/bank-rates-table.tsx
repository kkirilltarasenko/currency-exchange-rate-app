"use client";

import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import { useCurrencyRatesQuery } from "../hooks/use-currency-rates.query";
import { useCurrencyConversionContext } from "../context/currency-conversion.context";
import { Currency } from "../types";

// Функция для форматирования даты в формат "28 апреля 2026"
const formatDateToRussian = (dateString: string): string => {
  try {
    let date: Date;
    
    // Проверяем, если дата в формате "DD.MM.YYYY"
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split('.').map(Number);
      date = new Date(year, month - 1, day); // month - 1 потому что месяцы в Date начинаются с 0
    } else {
      // Пытаемся парсить как обычную дату
      date = new Date(dateString);
    }
    
    // Проверяем, что дата валидна
    if (isNaN(date.getTime())) {
      return dateString; // Возвращаем исходную строку, если дата невалидна
    }

    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  } catch (error) {
    // В случае ошибки возвращаем исходную строку
    return dateString;
  }
};

export const BankRatesTable = () => {
  const { fromCurrency, toCurrency } = useCurrencyConversionContext();
  const { data: bankData, isLoading, error } = useCurrencyRatesQuery();
  console.log(bankData, "DATA");
  const filteredRates = bankData
    ?.flatMap((bank) =>
      bank?.rates?.map((rate) => ({
        ...rate,
        bankName: bank?.bankName,
        logoUrl: bank?.logoUrl,
      })) || [],
    )
    ?.filter((rate) => {
      if (!fromCurrency || !toCurrency) {
        return true;
      }

      const isDirectPair =
        rate.sellIso === fromCurrency.code && rate.buyIso === toCurrency.code;

      const isReversePair =
        rate.sellIso === toCurrency.code && rate.buyIso === fromCurrency.code;

      return isDirectPair || isReversePair;
    });

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
        <Spinner size="lg" data-testid="loading-spinner" />
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
          data-testid="error-message"
        >
          <Text color="red.600" fontWeight="500" mb={3}>
            Failed to load exchange rates
          </Text>
          <Button
            size="sm"
            colorScheme="red"
            variant="outline"
            onClick={() => window.location.reload()}
            data-testid="retry-button"
          >
            Retry
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      w="100%"
      h="100%"
      py={2}
      display="flex"
      flexDirection="column"
      data-testid="bank-rates-table"
    >
      <Box mb={3}>
        <Text fontSize="lg" fontWeight="600" color="black" mb={1}>
          Курсы банков
        </Text>
        <Text fontSize="xs" color="gray.600">
          Актуальные курсы покупки и продажи валют
        </Text>
      </Box>

      <Box overflow="auto" flex="1">
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr 60px 80px 80px 80px", lg: "1.5fr 60px 80px 80px 80px 120px" }}
          gap={{ base: 2, lg: 4 }}
          py={3}
          px={2}
          borderBottom="1px solid"
          borderColor="gray.200"
          fontWeight="500"
          color="gray.700"
          fontSize="xs"
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
          <Text textAlign="center" display={{ base: "none", lg: "block" }}>Обновлено</Text>
        </Box>

        {filteredRates && filteredRates.length > 0 ? (
          filteredRates.map((rate, index) => (
            <Box
              key={`${rate.buyIso}-${rate.sellIso}-${index}`}
              display="grid"
              gridTemplateColumns={{ base: "1fr 60px 80px 80px 80px", lg: "1.5fr 60px 80px 80px 80px 120px" }}
              gap={{ base: 2, lg: 4 }}
              py={3}
              px={2}
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
                <Text
                  fontWeight="500"
                  color="black"
                  fontSize="sm"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {rate.bankName}
                </Text>
                <Text
                  fontSize="xs"
                  color="gray.500"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {fromCurrency?.code}/{toCurrency?.code}
                </Text>
              </Box>

              <Box display="flex" justifyContent="center" alignItems="center">
                {rate?.logoUrl ? (
                  <Box
                    w="32px"
                    h="32px"
                    borderRadius="4px"
                    overflow="hidden"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <img
                      src={rate.logoUrl}
                      alt={rate.bankName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ) : (
                  <Box
                    w="32px"
                    h="32px"
                    bg="gray.100"
                    borderRadius="4px"
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
                <Text fontSize="2xs" color="gray.500">
                  {rate.quantity}
                </Text>
                <Text fontWeight="500" color="black" fontSize="xs">
                  {rate.sellIso}
                </Text>
              </Box>

              <Box textAlign="center">
                <Text fontWeight="600" color="green.600" fontSize="sm">
                  {rate.buyRate.toFixed(4)}
                </Text>
              </Box>

              <Box textAlign="center">
                <Text fontWeight="600" color="red.600" fontSize="sm">
                  {rate.sellRate.toFixed(4)}
                </Text>
              </Box>

              <Box textAlign="center" display={{ base: "none", lg: "block" }}>
                <Text fontSize="xs" color="gray.600">
                  {formatDateToRussian(rate.date)}
                </Text>
              </Box>
            </Box>
          ))
        ) : (
          <Box
            py={6}
            textAlign="center"
            gridColumn="1 / -1"
            data-testid="empty-rates-message"
          >
            <Text color="gray.500" fontSize="sm">
              {fromCurrency && toCurrency
                ? `No exchange rates available for ${fromCurrency.code}/${toCurrency.code}`
                : "No exchange rates available"}
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
