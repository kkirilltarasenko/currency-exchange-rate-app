"use client";

import { useCallback, useEffect, useState } from "react";
import { ConversionResult, Currency } from "../types";
import { useCurrencyRatesQuery } from "./use-currency-rates.query";

const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br' },
];

export const useCurrencyConversion = () => {
  const [fromCurrency, setFromCurrency] = useState<Currency>(CURRENCIES[0]);
  const [toCurrency, setToCurrency] = useState<Currency>(CURRENCIES[1]);
  const [fromAmount, setFromAmount] = useState<number>(1);
  const [toAmount, setToAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastEditedField, setLastEditedField] = useState<'from' | 'to'>('from');
  const [isSwapping, setIsSwapping] = useState(false);

  const { data: bankData, isLoading: isLoadingRates } = useCurrencyRatesQuery();

  const getBestExchangeRate = useCallback((from: Currency, to: Currency): number => {
    if (from.code === to.code) return 1;
    
    if (!bankData?.rates) {
      console.warn('Банковские курсы не загружены, используется курс 1:1');
      return 1;
    }

    const relevantRates = bankData.rates.filter(rate => {
      const isDirectPair = rate.sellIso === from.code && rate.buyIso === to.code;
      const isReversePair = rate.sellIso === to.code && rate.buyIso === from.code;
      return isDirectPair || isReversePair;
    });

    if (relevantRates.length === 0) {
      console.warn(`Курс для пары ${from.code}/${to.code} не найден`);
      return 1;
    }

    let bestRate = 0;
    
    relevantRates.forEach(rate => {
      let currentRate = 0;
      
      if (rate.sellIso === from.code && rate.buyIso === to.code) {
        currentRate = rate.sellRate / rate.quantity;
      } else if (rate.sellIso === to.code && rate.buyIso === from.code) {
        currentRate = rate.quantity / rate.buyRate;
      }
      
      if (currentRate > bestRate) {
        bestRate = currentRate;
      }
    });

    return bestRate || 1;
  }, [bankData]);

  const getExchangeRate = getBestExchangeRate;

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
    if (isSwapping) {
      return;
    }

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
  }, [fromCurrency, toCurrency, fromAmount, toAmount, lastEditedField, getExchangeRate, bankData, isSwapping]);


  const swapCurrencies = useCallback(() => {
    setIsSwapping(true);
    
    const tempCurrency = fromCurrency;
    const tempAmount = fromAmount;
    
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
    
    setLastEditedField(lastEditedField === 'from' ? 'to' : 'from');
    
    setTimeout(() => {
      setIsSwapping(false);
    }, 0);
  }, [fromCurrency, toCurrency, fromAmount, toAmount, lastEditedField]);

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
    isLoading: isLoading || isLoadingRates,
    setFromCurrency,
    setToCurrency,
    updateFromAmount,
    updateToAmount,
    convertCurrency,
    swapCurrencies,
    getExchangeRate,
  };
};