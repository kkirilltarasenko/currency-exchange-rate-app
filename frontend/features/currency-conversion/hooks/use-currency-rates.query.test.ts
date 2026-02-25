import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { useCurrencyRatesQuery } from './use-currency-rates.query'
import * as ExchangeApi from '../../../api/exchange-api'

// Mock the ExchangeApi
jest.mock('../../../api/exchange-api')

const mockExchangeApi = ExchangeApi as jest.Mocked<typeof ExchangeApi>

describe('useCurrencyRatesQuery', () => {
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

  describe('successful data fetching', () => {
    it('should fetch currency rates successfully', async () => {
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

      mockExchangeApi.ExchangeApi.getAlfaBankRates.mockResolvedValue(mockBankData)

      const { result } = renderHook(() => useCurrencyRatesQuery(), {
        wrapper: createWrapper,
      })

      expect(result.current.isLoading).toBe(true)
      expect(result.current.data).toBeUndefined()
      expect(result.current.error).toBeNull()

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual(mockBankData)
      expect(result.current.error).toBeNull()
      expect(mockExchangeApi.ExchangeApi.getAlfaBankRates).toHaveBeenCalledTimes(1)
    })
  })

  describe('error handling', () => {
    it('should handle API errors gracefully', async () => {
      const mockError = new Error('Network error')
      mockExchangeApi.ExchangeApi.getAlfaBankRates.mockRejectedValue(mockError)

      const { result } = renderHook(() => useCurrencyRatesQuery(), {
        wrapper: createWrapper,
      })

      expect(result.current.isLoading).toBe(true)

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toBeUndefined()
      expect(result.current.error).toBeTruthy()
      expect(mockExchangeApi.ExchangeApi.getAlfaBankRates).toHaveBeenCalledTimes(1)
    })
  })

  describe('refetch functionality', () => {
    it('should allow manual refetch', async () => {
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

      mockExchangeApi.ExchangeApi.getAlfaBankRates.mockResolvedValue(mockBankData)

      const { result } = renderHook(() => useCurrencyRatesQuery(), {
        wrapper: createWrapper,
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(mockExchangeApi.ExchangeApi.getAlfaBankRates).toHaveBeenCalledTimes(1)

      // Trigger refetch
      result.current.refetch()

      await waitFor(() => {
        expect(mockExchangeApi.ExchangeApi.getAlfaBankRates).toHaveBeenCalledTimes(2)
      })
    })
  })
})