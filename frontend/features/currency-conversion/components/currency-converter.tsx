"use client";

import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { FaExchangeAlt } from "react-icons/fa";
import { useCurrencyConversion } from "../hooks/use-currency-conversion";
import { CurrencySelect } from "./currency-select";

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
  } = useCurrencyConversion();


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
    <Box w="100%" py={4}>
      <Stack gap={4}>
        <Box>
          <Text fontSize="xl" fontWeight="600" color="black" mb={1}>
            Конвертер валют
          </Text>
          <Text fontSize="sm" color="gray.600">
            Введите сумму в любое поле для автоматической конвертации
          </Text>
        </Box>

        <Stack gap={3}>
          <Box>
            <Text mb={2} fontSize="sm" fontWeight="500" color="gray.700">
              Отдам
            </Text>
            <Stack direction="row" gap={2} align="center">
              <Box flex="1">
                <Input
                  type="number"
                  value={fromAmount || ''}
                  onChange={handleFromAmountChange}
                  placeholder="0.00"
                  size="md"
                  min="0"
                  step="0.01"
                  border="1px solid"
                  borderColor="blue.300"
                  bg="blue.50"
                  _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px #3182CE"
                  }}
                  fontSize="md"
                />
              </Box>
              <Box minW="100px">
                <CurrencySelect
                  currencies={currencies}
                  selectedCurrency={fromCurrency}
                  onCurrencyChange={setFromCurrency}
                  borderColor="blue.300"
                  bg="blue.50"
                  focusBorderColor="blue.500"
                />
              </Box>
            </Stack>
          </Box>

          <Box display="flex" justifyContent="center" mt={4} mb={-2}>
            <Button
              onClick={handleSwap}
              variant="outline"
              size="sm"
              p={2}
              borderRadius="full"
              border="1px solid"
              borderColor="gray.300"
              bg="white"
              _hover={{
                bg: "gray.50",
                borderColor: "gray.400",
                transform: "rotate(180deg)"
              }}
              transition="all 0.2s"
            >
              <FaExchangeAlt size={14} />
            </Button>
          </Box>

          <Box>
            <Text mb={2} fontSize="sm" fontWeight="500" color="gray.700">
              Получу
            </Text>
            <Stack direction="row" gap={2} align="center">
              <Box flex="1">
                <Input
                  type="number"
                  value={toAmount || ''}
                  onChange={handleToAmountChange}
                  placeholder="0.00"
                  size="md"
                  min="0"
                  step="0.01"
                  border="1px solid"
                  borderColor="green.300"
                  bg="green.50"
                  _focus={{
                    borderColor: "green.500",
                    boxShadow: "0 0 0 1px #38A169"
                  }}
                  fontSize="md"
                />
              </Box>
              <Box minW="100px">
                <CurrencySelect
                  currencies={currencies}
                  selectedCurrency={toCurrency}
                  onCurrencyChange={setToCurrency}
                  borderColor="green.300"
                  bg="green.50"
                  focusBorderColor="green.500"
                />
              </Box>
            </Stack>
          </Box>

          {fromAmount > 0 && toAmount > 0 && (
            <Box
              p={3}
              bg="blue.50"
              borderRadius="8px"
              border="1px solid"
              borderColor="blue.200"
              textAlign="center"
            >
              <Text fontSize="sm" color="blue.800" fontWeight="500">
                1 {fromCurrency.code} = {getExchangeRate(fromCurrency, toCurrency).toFixed(4)} {toCurrency.code}
              </Text>
              <Text fontSize="xs" color="blue.600" mt={1}>
                💰 Лучший курс из банковских данных
              </Text>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};