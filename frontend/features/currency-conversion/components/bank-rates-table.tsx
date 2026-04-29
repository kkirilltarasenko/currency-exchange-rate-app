"use client";

import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import { useCurrencyRatesQuery } from "../hooks/use-currency-rates.query";
import { useCurrencyConversionContext } from "../context/currency-conversion.context";
import { useAppSettings } from "../../../shared/hooks/use-app-settings";
import { useNumberFormatter } from "../../../shared/utils/number-formatter";
import { useTranslations } from "@/features/localization";

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

// Функция для генерации ID банка из названия
const generateBankId = (bankName: string): string => {
  return bankName?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '';
};

export const BankRatesTable = () => {
  const { fromCurrency, toCurrency } = useCurrencyConversionContext();
  const { data: bankData, isLoading, error } = useCurrencyRatesQuery();
  const {
    settings,
    favoriteBanks,
    showBankLogos,
    animationsEnabled,
    language
  } = useAppSettings();
  const formatter = useNumberFormatter(settings);
  const { t } = useTranslations();
  
  console.log(bankData, "DATA");
  const filteredRates = bankData
    ?.flatMap((bank) =>
      bank?.rates?.map((rate) => ({
        ...rate,
        bankName: bank?.bankName,
        logoUrl: bank?.logoUrl,
        bankId: generateBankId(bank?.bankName || ''),
      })) || [],
    )
    ?.filter((rate) => {
      // Фильтр по валютной паре
      if (!fromCurrency || !toCurrency) {
        return true;
      }

      const isDirectPair =
        rate.sellIso === fromCurrency.code && rate.buyIso === toCurrency.code;

      const isReversePair =
        rate.sellIso === toCurrency.code && rate.buyIso === fromCurrency.code;

      const matchesCurrencyPair = isDirectPair || isReversePair;

      // Фильтр по избранным банкам (если есть избранные)
      if (favoriteBanks.length > 0) {
        const isFavoriteBank = favoriteBanks.includes(rate.bankId || rate.bankName);
        return matchesCurrencyPair && isFavoriteBank;
      }

      return matchesCurrencyPair;
    })
    ?.sort((a, b) => {
      // Сортировка: избранные банки сначала
      const aIsFavorite = favoriteBanks.includes(a.bankId || a.bankName);
      const bIsFavorite = favoriteBanks.includes(b.bankId || b.bankName);
      
      if (aIsFavorite && !bIsFavorite) return -1;
      if (!aIsFavorite && bIsFavorite) return 1;
      
      // Затем по алфавиту
      return a.bankName.localeCompare(b.bankName, language);
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
          bg="red.subtle"
          borderRadius="md"
          border="1px solid"
          borderColor="red.200"
          data-testid="error-message"
        >
          <Text color="red.fg" fontWeight="500" mb={3}>
            {t('errors.ratesLoadError')}
          </Text>
          <Button
            size="sm"
            colorScheme="red"
            variant="outline"
            onClick={() => window.location.reload()}
            data-testid="retry-button"
          >
            {t('common.refresh')}
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
        <Text fontSize="lg" fontWeight="600" color="fg" mb={1}>
          {t('currency.exchangeRates')}
        </Text>
        <Text fontSize="xs" color="fg.muted">
          {t('currency.lastUpdated')}
        </Text>
      </Box>

      <Box overflow="auto" flex="1">
        <Box
          display="grid"
          gridTemplateColumns={{
            base: showBankLogos ? "1fr 60px 80px 80px 80px" : "1fr 80px 80px 80px",
            lg: showBankLogos ? "1.5fr 60px 80px 80px 80px 120px" : "1.5fr 80px 80px 80px 120px"
          }}
          gap={{ base: 2, lg: 4 }}
          py={3}
          px={2}
          borderBottom="1px solid"
          borderColor="border"
          fontWeight="500"
          color="fg"
          fontSize="xs"
          position="sticky"
          top="0"
          bg="bg"
          zIndex="1"
        >
          <Text>{t('currency.bank')}</Text>
          {showBankLogos && <Text textAlign="center">{t('currency.logo')}</Text>}
          <Text textAlign="center">{t('currency.currency')}</Text>
          <Text textAlign="center">{t('currency.buy')}</Text>
          <Text textAlign="center">{t('currency.sell')}</Text>
          <Text textAlign="center" display={{ base: "none", lg: "block" }}>{t('currency.date')}</Text>
        </Box>

        {filteredRates && filteredRates.length > 0 ? (
          filteredRates.map((rate, index) => (
            <Box
              key={`${rate.buyIso}-${rate.sellIso}-${index}`}
              display="grid"
              gridTemplateColumns={{
                base: showBankLogos ? "1fr 60px 80px 80px 80px" : "1fr 80px 80px 80px",
                lg: showBankLogos ? "1.5fr 60px 80px 80px 80px 120px" : "1.5fr 80px 80px 80px 120px"
              }}
              gap={{ base: 2, lg: 4 }}
              py={3}
              px={2}
              borderBottom={
                index < (filteredRates || []).length - 1 ? "1px solid" : "none"
              }
              borderColor="border.subtle"
              _hover={{
                bg: "bg.subtle",
              }}
              transition={animationsEnabled ? "background-color 0.2s" : "none"}
            >
              <Box>
                <Text
                  fontWeight="500"
                  color="fg"
                  fontSize="sm"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {rate.bankName}
                  {favoriteBanks.includes(rate.bankId || rate.bankName) && (
                    <Text as="span" color="yellow.500" ml={1}>⭐</Text>
                  )}
                </Text>
                <Text
                  fontSize="xs"
                  color="fg.muted"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {rate?.sellIso}/{rate?.buyIso}
                </Text>
              </Box>

              {showBankLogos && (
                <Box display="flex" justifyContent="center" alignItems="center">
                  {rate?.logoUrl ? (
                    <Box
                      w="32px"
                      h="32px"
                      borderRadius="4px"
                      overflow="hidden"
                      border="1px solid"
                      borderColor="border"
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
                      bg="bg.subtle"
                      borderRadius="4px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      border="1px solid"
                      borderColor="border"
                    >
                      <Text fontSize="xs" color="fg.muted" textAlign="center">
                        🏦
                      </Text>
                    </Box>
                  )}
                </Box>
              )}

              <Box textAlign="center">
                <Text fontSize="2xs" color="fg.muted">
                  {rate.quantity}
                </Text>
                <Text fontWeight="500" color="fg" fontSize="xs">
                  {rate?.sellIso}
                </Text>
              </Box>

              <Box textAlign="center">
                <Text fontWeight="600" color="green.600" fontSize="sm">
                  {formatter.format(rate.buyRate)}
                </Text>
              </Box>

              <Box textAlign="center">
                <Text fontWeight="600" color="red.600" fontSize="sm">
                  {formatter.format(rate.sellRate)}
                </Text>
              </Box>

              <Box textAlign="center" display={{ base: "none", lg: "block" }}>
                <Text fontSize="xs" color="fg.muted">
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
            <Text color="fg.muted" fontSize="sm">
              {fromCurrency && toCurrency
                ? `${t('currency.noRatesAvailable')} ${fromCurrency.code}/${toCurrency.code}`
                : t('currency.noRatesAvailable')}
            </Text>
          </Box>
        )}
      </Box>

      <Box
        mt={4}
        p={3}
        bg="bg.subtle"
        borderRadius="8px"
        border="1px solid"
        borderColor="border"
      >
        <Text fontSize="sm" color="fg.muted" textAlign="center">
          {t('currency.lastUpdated')}
        </Text>
      </Box>
    </Box>
  );
};
