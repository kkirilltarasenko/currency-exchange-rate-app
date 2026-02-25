import { renderHook, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { useCurrencyConversion } from './use-currency-conversion'
import * as useCurrencyRatesQuery from './use-currency-rates.query'

// Mock the currency rates query hook
jest.mock('./use-currency-rates.query')

const mockUseCurrencyRatesQuery = useCurrencyRatesQuery as jest.Mocked<typeof useCurrencyRatesQuery>

describe('useCurrencyConversion', () => {
  let queryClient: QueryClient

  const createWrapper = ({ children }: { children: ReactNode }) => {
    return QueryClientProvider({ client: queryClient, children })
  }

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('should initialize with default values', () => {
      mockUseCurrencyRatesQuery.useCurrencyRatesQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      })

      const { result } = renderHook(() => useCurrencyConversion(), {
        wrapper: createWrapper,
      })

      expect(result.current.fromCurrency).toEqual({
        code: 'USD',
        name: 'US Dollar',
        symbol: '$',
      })
      expect(result.current.toCurrency).toEqual({
        code: 'BYN',
        name: 'Belarusian Ruble',
        symbol: 'Br',
      })
      expect(result.current.fromAmount).toBe(1)
      expect(result.current.toAmount).toBe(1) // Hook automatically calculates: 1 * 1 = 1
      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('getBestExchangeRate', () => {
    it('should return 1 for same currencies', () => {
      mockUseCurrencyRatesQuery.useCurrencyRatesQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      })

      const { result } = renderHook(() => useCurrencyConversion(), {
        wrapper: createWrapper,
      })

      const rate = result.current.getExchangeRate(
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'USD', name: 'US Dollar', symbol: '$' }
      )

      expect(rate).toBe(1)
    })

    it('should return 1 when no bank data is available', () => {
      mockUseCurrencyRatesQuery.useCurrencyRatesQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      })

      const { result } = renderHook(() => useCurrencyConversion(), {
        wrapper: createWrapper,
      })

      const rate = result.current.getExchangeRate(
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br' }
      )

      expect(rate).toBe(1)
    })

    it('should calculate rate from bank data', () => {
      const mockBankData = {
        rates: [
          {
            sellRate: 3.2,
            sellIso: 'USD',
            buyRate: 3.1,
            buyIso: 'BYN',
            quantity: 1,
            name: 'USD/BYN',
            date: '2024-01-01T00:00:00Z'
          }
        ]
      }

      mockUseCurrencyRatesQuery.useCurrencyRatesQuery.mockReturnValue({
        data: mockBankData,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      })

      const { result } = renderHook(() => useCurrencyConversion(), {
        wrapper: createWrapper,
      })

      const rate = result.current.getExchangeRate(
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br' }
      )

      expect(rate).toBe(3.2) // sellRate / quantity = 3.2 / 1
    })
  })

  describe('convertCurrency', () => {
    it('should convert currency correctly', async () => {
      const mockBankData = {
        rates: [
          {
            sellRate: 3.2,
            sellIso: 'USD',
            buyRate: 3.1,
            buyIso: 'BYN',
            quantity: 1,
            name: 'USD/BYN',
            date: '2024-01-01T00:00:00Z'
          }
        ]
      }

      mockUseCurrencyRatesQuery.useCurrencyRatesQuery.mockReturnValue({
        data: mockBankData,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      })

      const { result } = renderHook(() => useCurrencyConversion(), {
        wrapper: createWrapper,
      })

      const conversionResult = await result.current.convertCurrency(
        100,
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br' }
      )

      expect(conversionResult).toEqual({
        amount: 100,
        fromCurrency: { code: 'USD', name: 'US Dollar', symbol: '$' },
        toCurrency: { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br' },
        convertedAmount: 320, // 100 * 3.2
        rate: 3.2,
      })
    })
  })

  describe('swapCurrencies', () => {
    it('should swap currencies and amounts', () => {
      mockUseCurrencyRatesQuery.useCurrencyRatesQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      })

      const { result } = renderHook(() => useCurrencyConversion(), {
        wrapper: createWrapper,
      })

      // Initial state: USD -> BYN, fromAmount: 1, toAmount: 1
      expect(result.current.fromCurrency.code).toBe('USD')
      expect(result.current.toCurrency.code).toBe('BYN')
      expect(result.current.fromAmount).toBe(1)
      expect(result.current.toAmount).toBe(1)

      act(() => {
        result.current.swapCurrencies()
      })

      // After swap: BYN -> USD, fromAmount: 1, toAmount: 1
      expect(result.current.fromCurrency.code).toBe('BYN')
      expect(result.current.toCurrency.code).toBe('USD')
      expect(result.current.fromAmount).toBe(1) // Previous toAmount
      expect(result.current.toAmount).toBe(1) // Previous fromAmount
    })
  })

  describe('updateFromAmount', () => {
    it('should update from amount and set lastEditedField to from', () => {
      mockUseCurrencyRatesQuery.useCurrencyRatesQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      })

      const { result } = renderHook(() => useCurrencyConversion(), {
        wrapper: createWrapper,
      })

      act(() => {
        result.current.updateFromAmount(50)
      })

      expect(result.current.fromAmount).toBe(50)
      expect(result.current.toAmount).toBe(50) // Auto-calculated with rate 1:1
    })
  })

  describe('updateToAmount', () => {
    it('should update to amount and set lastEditedField to to', () => {
      mockUseCurrencyRatesQuery.useCurrencyRatesQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      })

      const { result } = renderHook(() => useCurrencyConversion(), {
        wrapper: createWrapper,
      })

      act(() => {
        result.current.updateToAmount(75)
      })

      expect(result.current.toAmount).toBe(75)
      expect(result.current.fromAmount).toBe(75) // Auto-calculated with rate 1:1
    })
  })
})