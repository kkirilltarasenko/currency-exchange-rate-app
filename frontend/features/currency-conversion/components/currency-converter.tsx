"use client";

import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  Badge,
  Flex,
  HStack,
  VStack,
  Separator,
} from "@chakra-ui/react";
import {
  FaExchangeAlt,
  FaClock,
  FaInfoCircle,
  FaCalculator,
  FaChartLine,
} from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { Tooltip } from "../../../components/ui/tooltip";
import { useCurrencyConversionContext } from "../context/currency-conversion.context";
import { CurrencySelect } from "./currency-select";
import { useAppSettings } from "../../../shared/hooks/use-app-settings";
import { useCurrencyRatesQuery } from "../hooks/use-currency-rates.query";
import { useTranslations } from "@/features/localization";

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
  const { data: bankData, isLoading: isLoadingRates } = useCurrencyRatesQuery();
  const { t } = useTranslations();

  // Функция для форматирования чисел согласно настройкам
  const formatNumber = (value: number): string => {
    if (numberFormat === "compact" && value >= 1000) {
      return new Intl.NumberFormat("ru-RU", {
        notation: "compact",
        maximumFractionDigits: decimalPlaces,
      }).format(value);
    }
    return value.toFixed(decimalPlaces);
  };

  // Получение информации о лучшем банке
  const getBestBankInfo = () => {
    if (!bankData?.length) return null;

    const allRates = bankData.flatMap((bank) => bank?.rates || []);
    const relevantRates = allRates.filter((rate) => {
      return (
        (rate.sellIso === fromCurrency.code &&
          rate.buyIso === toCurrency.code) ||
        (rate.sellIso === toCurrency.code && rate.buyIso === fromCurrency.code)
      );
    });

    if (relevantRates.length === 0) return null;

    let bestRate = 0;
    let bestBank = "";

    relevantRates.forEach((rate) => {
      const bankInfo = bankData.find((bank) => bank?.rates?.includes(rate));
      if (!bankInfo) return;

      let currentRate = 0;
      if (
        rate.sellIso === fromCurrency.code &&
        rate.buyIso === toCurrency.code
      ) {
        currentRate = rate.buyRate / rate.quantity;
      } else if (
        rate.sellIso === toCurrency.code &&
        rate.buyIso === fromCurrency.code
      ) {
        currentRate = rate.quantity / rate.sellRate;
      }

      if (currentRate > bestRate) {
        bestRate = currentRate;
        bestBank = bankInfo.bankName;
      }
    });

    return { bank: bestBank, rate: bestRate };
  };

  // Быстрые суммы для конвертации
  const quickAmounts = [100, 500, 1000, 5000];

  // Расчет экономии при использовании лучшего курса
  const calculateSavings = () => {
    if (!bankData?.length || fromAmount <= 0) return null;

    const allRates = bankData.flatMap((bank) => bank?.rates || []);
    const relevantRates = allRates.filter((rate) => {
      return (
        (rate.sellIso === fromCurrency.code &&
          rate.buyIso === toCurrency.code) ||
        (rate.sellIso === toCurrency.code && rate.buyIso === fromCurrency.code)
      );
    });

    if (relevantRates.length < 2) return null;

    const rates = relevantRates.map((rate) => {
      if (
        rate.sellIso === fromCurrency.code &&
        rate.buyIso === toCurrency.code
      ) {
        return rate.buyRate / rate.quantity;
      } else {
        return rate.quantity / rate.sellRate;
      }
    });

    const bestRate = Math.max(...rates);
    const worstRate = Math.min(...rates);
    const savings = (bestRate - worstRate) * fromAmount;

    return savings > 0.01 ? savings : null;
  };

  // Получение времени последнего обновления
  const getLastUpdateTime = () => {
    if (!bankData?.length) return null;

    const allRates = bankData.flatMap((bank) => bank?.rates || []);
    if (allRates.length === 0) return null;

    // Берем первую доступную дату
    const lastDate = allRates[0]?.date;
    if (!lastDate) return null;

    return new Date(lastDate).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  const handleQuickAmount = (amount: number) => {
    updateFromAmount(amount);
  };

  return (
    <Box w="100%" py={2} data-testid="currency-converter">
      <Stack gap={3}>
        <Box>
          <Text fontSize="lg" fontWeight="600" color="fg" mb={1}>
            {t("currency.converter")}
          </Text>
          <Text fontSize="xs" color="fg.muted">
            {t("currency.enterAmount")}
          </Text>
        </Box>

        <Stack gap={2}>
          <Box>
            <Text mb={1} fontSize="xs" fontWeight="500" color="fg">
              {t("currency.from")}
            </Text>
            <Stack direction="row" gap={2} align="center">
              <Box flex="1">
                <Input
                  type="number"
                  value={
                    fromAmount ? Number(fromAmount.toFixed(decimalPlaces)) : ""
                  }
                  onChange={handleFromAmountChange}
                  placeholder="0.00"
                  size="sm"
                  min="0"
                  step={`0.${"0".repeat(decimalPlaces - 1)}1`}
                  border="1px solid"
                  borderColor="blue.300"
                  bg="blue.subtle"
                  _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px #3182CE",
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
                transform: "rotate(180deg)",
              }}
              transition="all 0.2s"
              data-testid="swap-currencies-button"
            >
              <FaExchangeAlt size={12} />
            </Button>
          </Box>

          <Box>
            <Text mb={1} fontSize="xs" fontWeight="500" color="fg">
              {t("currency.to")}
            </Text>
            <Stack direction="row" gap={2} align="center">
              <Box flex="1">
                <Input
                  type="number"
                  value={toAmount ? Number(toAmount.toFixed(4)) : ""}
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
                    boxShadow: "0 0 0 1px #38A169",
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

          {/* Быстрые суммы */}
          <Box>
            <Text fontSize="2xs" color="fg.muted" mb={1}>
              {t("currency.selectCurrency")}:
            </Text>
            <HStack gap={1} flexWrap="wrap">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  size="xs"
                  variant="outline"
                  onClick={() => handleQuickAmount(amount)}
                  fontSize="2xs"
                  px={2}
                  py={1}
                  h="auto"
                  minH="24px"
                  borderColor="border.subtle"
                  _hover={{ borderColor: "blue.500", bg: "blue.subtle" }}
                >
                  {formatNumber(amount)}
                </Button>
              ))}
            </HStack>
          </Box>

          {fromAmount > 0 && toAmount > 0 && (
            <VStack gap={2} align="stretch">
              {/* Основная информация о курсе */}
              <Box
                p={3}
                bg="blue.subtle"
                borderRadius="8px"
                border="1px solid"
                borderColor="blue.200"
                data-testid="exchange-rate-display"
              >
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontSize="sm" color="blue.fg" fontWeight="600">
                    1 {fromCurrency.code} ={" "}
                    {getExchangeRate(fromCurrency, toCurrency).toFixed(4)}{" "}
                    {toCurrency.code}
                  </Text>
                  <Badge colorScheme="blue" size="sm">
                    <FaChartLine size={8} style={{ marginRight: "4px" }} />
                    {t("currency.rate")}
                  </Badge>
                </Flex>

                {getBestBankInfo() && (
                  <Text fontSize="2xs" color="blue.fg" mb={1}>
                    {t("currency.bank")}: {getBestBankInfo()?.bank}
                  </Text>
                )}
              </Box>

              {/* Информация об экономии */}
              {calculateSavings() && (
                <Box
                  p={2}
                  bg="green.subtle"
                  borderRadius="6px"
                  border="1px solid"
                  borderColor="green.200"
                >
                  <Flex align="center" gap={2}>
                    <MdTrendingUp size={12} color="green" />
                    <Text fontSize="2xs" color="green.fg" fontWeight="500">
                      {t("currency.conversionResult")}:{" "}
                      {calculateSavings()?.toFixed(2)} {toCurrency.code}
                    </Text>
                  </Flex>
                </Box>
              )}
            </VStack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
