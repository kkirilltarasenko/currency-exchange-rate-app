"use client";

import { useCallback, useEffect, useState } from "react";
import { ConversionResult, Currency } from "../types";

const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
];


const MOCK_RATES: Record<string, Record<string, number>> = {
  USD: { EUR: 0.92, BYN: 3.3, RUB: 95.5, PLN: 4.1, UAH: 41.2 },
  EUR: { USD: 1.09, BYN: 3.6, RUB: 104.2, PLN: 4.47, UAH: 44.9 },
  BYN: { USD: 0.303, EUR: 0.278, RUB: 28.9, PLN: 1.24, UAH: 12.5 },
  RUB: { USD: 0.0105, EUR: 0.0096, BYN: 0.0346, PLN: 0.043, UAH: 0.432 },
  PLN: { USD: 0.244, EUR: 0.224, BYN: 0.806, RUB: 23.3, UAH: 10.05 },
  UAH: { USD: 0.0243, EUR: 0.0223, BYN: 0.08, RUB: 2.31, PLN: 0.0995 },
};

export const useCurrencyConversion = () => {
  const [fromCurrency, setFromCurrency] = useState<Currency>(CURRENCIES[0]);
  const [toCurrency, setToCurrency] = useState<Currency>(CURRENCIES[2]);
  const [fromAmount, setFromAmount] = useState<number>(1);
  const [toAmount, setToAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastEditedField, setLastEditedField] = useState<'from' | 'to'>('from');

  const getExchangeRate = useCallback((from: Currency, to: Currency): number => {
    if (from.code === to.code) return 1;
    return MOCK_RATES[from.code]?.[to.code] || 1;
  }, []);

  const convertCurrency = useCallback(async (
    amount: number,
    from: Currency,
    to: Currency
  ): Promise<ConversionResult> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
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
  }, [getExchangeRate]);

  useEffect(() => {
    const performConversion = async () => {
      if (lastEditedField === 'from' && fromAmount > 0) {
        const rate = getExchangeRate(fromCurrency, toCurrency);
        setToAmount(fromAmount * rate);
      } else if (lastEditedField === 'to' && toAmount > 0) {
        const rate = getExchangeRate(toCurrency, fromCurrency);
        setFromAmount(toAmount * rate);
      }
    };

    void performConversion();
  }, [fromCurrency, toCurrency, fromAmount, toAmount, lastEditedField, getExchangeRate]);


  const swapCurrencies = useCallback(() => {
    const tempCurrency = fromCurrency;
    const tempAmount = fromAmount;
    
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  }, [fromCurrency, toCurrency, fromAmount, toAmount]);

  const updateFromAmount = useCallback((amount: number) => {
    setFromAmount(amount);
    setLastEditedField('from');
  }, []);

  const updateToAmount = useCallback((amount: number) => {
    setToAmount(amount);
    setLastEditedField('to');
  }, []);

  return {
    currencies: CURRENCIES,
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    isLoading,
    setFromCurrency,
    setToCurrency,
    updateFromAmount,
    updateToAmount,
    convertCurrency,
    swapCurrencies,
    getExchangeRate,
  };
};