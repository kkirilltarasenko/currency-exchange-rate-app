import { ExchangeApi } from './exchange-api'
import * as httpClient from './http-client'

// Mock the http client
jest.mock('./http-client')

const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>

describe('ExchangeApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAlfaBankRates', () => {
    it('should fetch Alfa Bank rates successfully', async () => {
      const mockResponse = {
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

      mockHttpClient.httpClient.get.mockResolvedValue(mockResponse)

      const result = await ExchangeApi.getAlfaBankRates()

      expect(result).toEqual(mockResponse)
      expect(mockHttpClient.httpClient.get).toHaveBeenCalledWith('/alfa-bank/rates')
      expect(mockHttpClient.httpClient.get).toHaveBeenCalledTimes(1)
    })

    it('should handle network errors', async () => {
      const mockError = new Error('Network error')
      mockHttpClient.httpClient.get.mockRejectedValue(mockError)

      await expect(ExchangeApi.getAlfaBankRates()).rejects.toThrow('Network error')
      expect(mockHttpClient.httpClient.get).toHaveBeenCalledWith('/alfa-bank/rates')
      expect(mockHttpClient.httpClient.get).toHaveBeenCalledTimes(1)
    })

    it('should handle API errors with proper error structure', async () => {
      const mockApiError = new Error('HTTP error! status: 500')
      mockHttpClient.httpClient.get.mockRejectedValue(mockApiError)

      await expect(ExchangeApi.getAlfaBankRates()).rejects.toThrow('HTTP error! status: 500')
      expect(mockHttpClient.httpClient.get).toHaveBeenCalledWith('/alfa-bank/rates')
    })

    it('should handle empty response', async () => {
      const mockEmptyResponse = { rates: [] }
      mockHttpClient.httpClient.get.mockResolvedValue(mockEmptyResponse)

      const result = await ExchangeApi.getAlfaBankRates()

      expect(result).toEqual(mockEmptyResponse)
      expect(result.rates).toHaveLength(0)
    })
  })
})