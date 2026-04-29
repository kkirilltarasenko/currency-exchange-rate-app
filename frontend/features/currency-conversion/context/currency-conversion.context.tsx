"use client";

import React, { createContext, useContext, useCallback, useEffect, useState, ReactNode } from "react";
import { ConversionResult, Currency } from "../types";
import { useCurrencyRatesQuery } from "../hooks/use-currency-rates.query";

const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
];

interface CurrencyConversionContextType {
  currencies: Currency[];
  fromCurrency: Currency;
  toCurrency: Currency;
  fromAmount: number;
  toAmount: number;
  isLoading: boolean;
  setFromCurrency: (currency: Currency) => void;
  setToCurrency: (currency: Currency) => void;
  updateFromAmount: (amount: number) => void;
  updateToAmount: (amount: number) => void;
  convertCurrency: (amount: number, from: Currency, to: Currency) => Promise<ConversionResult>;
  swapCurrencies: () => void;
  getExchangeRate: (from: Currency, to: Currency) => number;
}

const CurrencyConversionContext = createContext<CurrencyConversionContextType | undefined>(undefined);

interface CurrencyConversionProviderProps {
  children: ReactNode;
}

export const CurrencyConversionProvider = ({ children }: CurrencyConversionProviderProps) => {
  const [fromCurrency, setFromCurrency] = useState<Currency>(CURRENCIES[0]);
  const [toCurrency, setToCurrency] = useState<Currency>(CURRENCIES[1]);
  const [fromAmount, setFromAmount] = useState<number>(1);
  const [toAmount, setToAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastEditedField, setLastEditedField] = useState<"from" | "to">("from");
  const [isSwapping, setIsSwapping] = useState(false);

  const { data: bankData, isLoading: isLoadingRates } = useCurrencyRatesQuery();

  const getBestExchangeRate = useCallback(
    (from: Currency, to: Currency): number => {
      if (from.code === to.code) return 1;

      if (!bankData?.length) {
        console.warn("Банковские курсы не загружены, используется курс 1:1");
        return 1;
      }

      // 💥 собираем все курсы из всех банков
      const allRates = bankData.flatMap((bank) => bank?.rates || []);
      console.log(allRates, "RATES");

      const relevantRates = allRates.filter((rate) => {
        const isDirectPair =
          rate.sellIso === from.code && rate.buyIso === to.code;

        const isReversePair =
          rate.sellIso === to.code && rate.buyIso === from.code;

        return isDirectPair || isReversePair;
      });

      if (relevantRates.length === 0) {
        console.warn(`Курс для пары ${from.code}/${to.code} не найден`);
        return 1;
      }

      let bestRate = 0;

      relevantRates.forEach((rate) => {
        let currentRate = 0;

        // Для пары USD/BYN в таблице банков:
        // - sellIso = "USD", buyIso = "BYN"
        // - buyRate = курс покупки USD (банк покупает USD за BYN)
        // - sellRate = курс продажи USD (банк продает USD за BYN)

        if (rate.sellIso === from.code && rate.buyIso === to.code) {
          // Конвертируем USD → BYN: используем buyRate (банк покупает USD)
          currentRate = rate.buyRate / rate.quantity;
        } else if (rate.sellIso === to.code && rate.buyIso === from.code) {
          // Конвертируем BYN → USD: используем sellRate (банк продает USD)
          // 1 USD стоит sellRate BYN, значит 1 BYN = 1/sellRate USD
          currentRate = rate.quantity / rate.sellRate;
        }

        // Для USD→BYN ищем максимальный курс покупки (больше BYN за USD)
        // Для BYN→USD ищем максимальный курс (больше USD за BYN, что означает минимальный sellRate)
        if (currentRate > bestRate) {
          bestRate = currentRate;
        }
      });

      return bestRate || 1;
    },
    [bankData],
  );

  const getExchangeRate = getBestExchangeRate;

  const convertCurrency = useCallback(
    async (
      amount: number,
      from: Currency,
      to: Currency,
    ): Promise<ConversionResult> => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 300));

      const rate = getExchangeRate(from, to);
      const convertedAmount = amount * rate;

      setIsLoading(false);

      return {
        amount,
        fromCurrency: from,
        toCurrency: to,
        convertedAmount,
        rate,
      };
    },
    [getExchangeRate],
  );

  useEffect(() => {
    if (isSwapping) {
      return;
    }

    const performConversion = async () => {
      if (lastEditedField === "from" && fromAmount > 0) {
        const rate = getExchangeRate(fromCurrency, toCurrency);
        setToAmount(fromAmount * rate);
      } else if (lastEditedField === "to" && toAmount > 0) {
        const rate = getExchangeRate(toCurrency, fromCurrency);
        setFromAmount(toAmount * rate);
      }
    };

    void performConversion();
  }, [
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    lastEditedField,
    getExchangeRate,
    bankData,
    isSwapping,
  ]);

  const swapCurrencies = useCallback(() => {
    setIsSwapping(true);

    const tempCurrency = fromCurrency;
    const tempAmount = fromAmount;
    const newFromCurrency = toCurrency;
    const newToCurrency = tempCurrency;
    const newFromAmount = toAmount;

    setFromCurrency(newFromCurrency);
    setToCurrency(newToCurrency);
    setFromAmount(newFromAmount);
    setToAmount(tempAmount);

    setLastEditedField("from"); // Всегда устанавливаем "from" как последнее редактированное поле

    // Принудительно пересчитываем поле "Получу" после свопа
    setTimeout(() => {
      setIsSwapping(false);
      
      // Пересчитываем только поле "Получу" на основе нового курса
      const newRate = getBestExchangeRate(newFromCurrency, newToCurrency);
      setToAmount(newFromAmount * newRate);
    }, 0);
  }, [fromCurrency, toCurrency, fromAmount, toAmount, getBestExchangeRate]);

  const updateFromAmount = useCallback((amount: number) => {
    setFromAmount(amount);
    setLastEditedField("from");
  }, []);

  const updateToAmount = useCallback((amount: number) => {
    setToAmount(amount);
    setLastEditedField("to");
  }, []);

  const value: CurrencyConversionContextType = {
    currencies: CURRENCIES,
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    isLoading: isLoading || isLoadingRates,
    setFromCurrency,
    setToCurrency,
    updateFromAmount,
    updateToAmount,
    convertCurrency,
    swapCurrencies,
    getExchangeRate,
  };

  return (
    <CurrencyConversionContext.Provider value={value}>
      {children}
    </CurrencyConversionContext.Provider>
  );
};

export const useCurrencyConversionContext = () => {
  const context = useContext(CurrencyConversionContext);
  if (context === undefined) {
    throw new Error('useCurrencyConversionContext must be used within a CurrencyConversionProvider');
  }
  return context;
};