"use client";

import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { FaExchangeAlt } from "react-icons/fa";
import { useCurrencyConversionContext } from "../context/currency-conversion.context";
import { CurrencySelect } from "./currency-select";
import { useAppSettings } from "../../../shared/hooks/use-app-settings";

export const CurrencyConverter = () => {
  const {
    currencies,
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    setFromCurrency,
    setToCurrency,
    updateFromAmount,
    updateToAmount,
    swapCurrencies,
    getExchangeRate,
  } = useCurrencyConversionContext();

  const { decimalPlaces, numberFormat, animationsEnabled } = useAppSettings();


  // Функция для форматирования чисел согласно настройкам
  const formatNumber = (value: number): string => {
    if (numberFormat === 'compact' && value >= 1000) {
      return new Intl.NumberFormat('ru-RU', {
        notation: 'compact',
        maximumFractionDigits: decimalPlaces,
      }).format(value);
    }
    return value.toFixed(decimalPlaces);
  };

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    updateFromAmount(value);
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    updateToAmount(value);
  };


  const handleSwap = () => {
    swapCurrencies();
  };

  return (
    <Box w="100%" py={2} data-testid="currency-converter">
      <Stack gap={3}>
        <Box>
          <Text fontSize="lg" fontWeight="600" color="fg" mb={1}>
            Конвертер валют
          </Text>
          <Text fontSize="xs" color="fg.muted">
            Введите сумму в любое поле для автоматической конвертации
          </Text>
        </Box>

        <Stack gap={2}>
          <Box>
            <Text mb={1} fontSize="xs" fontWeight="500" color="fg">
              Отдам
            </Text>
            <Stack direction="row" gap={2} align="center">
              <Box flex="1">
                <Input
                  type="number"
                  value={fromAmount ? Number(fromAmount.toFixed(decimalPlaces)) : ''}
                  onChange={handleFromAmountChange}
                  placeholder="0.00"
                  size="sm"
                  min="0"
                  step={`0.${'0'.repeat(decimalPlaces - 1)}1`}
                  border="1px solid"
                  borderColor="blue.300"
                  bg="blue.subtle"
                  _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px #3182CE"
                  }}
                  fontSize="sm"
                  data-testid="amount-input-from"
                />
              </Box>
              <Box minW="80px">
                <CurrencySelect
                  currencies={currencies}
                  selectedCurrency={fromCurrency}
                  onCurrencyChange={setFromCurrency}
                  testId="currency-select-from"
                />
              </Box>
            </Stack>
          </Box>

          <Box display="flex" justifyContent="center" my={1}>
            <Button
              onClick={handleSwap}
              variant="outline"
              size="xs"
              p={1}
              borderRadius="full"
              border="1px solid"
              borderColor="border"
              bg="bg"
              _hover={{
                bg: "bg.subtle",
                borderColor: "border.emphasized",
                transform: "rotate(180deg)"
              }}
              transition="all 0.2s"
              data-testid="swap-currencies-button"
            >
              <FaExchangeAlt size={12} />
            </Button>
          </Box>

          <Box>
            <Text mb={1} fontSize="xs" fontWeight="500" color="fg">
              Получу
            </Text>
            <Stack direction="row" gap={2} align="center">
              <Box flex="1">
                <Input
                  type="number"
                  value={toAmount ? Number(toAmount.toFixed(4)) : ''}
                  onChange={handleToAmountChange}
                  placeholder="0.00"
                  size="sm"
                  min="0"
                  step="0.0001"
                  border="1px solid"
                  borderColor="green.300"
                  bg="green.subtle"
                  _focus={{
                    borderColor: "green.500",
                    boxShadow: "0 0 0 1px #38A169"
                  }}
                  fontSize="sm"
                  data-testid="amount-input-to"
                />
              </Box>
              <Box minW="80px">
                <CurrencySelect
                  currencies={currencies}
                  selectedCurrency={toCurrency}
                  onCurrencyChange={setToCurrency}
                  testId="currency-select-to"
                />
              </Box>
            </Stack>
          </Box>

          {fromAmount > 0 && toAmount > 0 && (
            <Box
              p={2}
              bg="blue.subtle"
              borderRadius="6px"
              border="1px solid"
              borderColor="blue.200"
              textAlign="center"
              data-testid="exchange-rate-display"
            >
              <Text fontSize="xs" color="blue.fg" fontWeight="500">
                1 {fromCurrency.code} = {getExchangeRate(fromCurrency, toCurrency).toFixed(4)} {toCurrency.code}
              </Text>
              <Text fontSize="2xs" color="blue.fg" mt={0.5}>
                💰 Лучший курс из банковских данных
              </Text>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};