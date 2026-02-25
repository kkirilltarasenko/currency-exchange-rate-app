import { HttpClient } from './http-client'

// Mock fetch globally
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('HttpClient', () => {
  let httpClient: HttpClient
  const baseUrl = 'https://api.example.com'

  beforeEach(() => {
    httpClient = new HttpClient(baseUrl)
    jest.clearAllMocks()
  })

  describe('GET requests', () => {
    it('should make successful GET request', async () => {
      const mockResponse = { data: 'test' }
      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      })

      const result = await httpClient.get('/test')

      expect(result).toEqual(mockResponse)
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }
      )
    })

    it('should handle GET request errors', async () => {
      const mockErrorResponse = { message: 'Not found' }
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: jest.fn().mockResolvedValue(mockErrorResponse),
      })

      await expect(httpClient.get('/not-found')).rejects.toThrow('Not found')
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/not-found',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }
      )
    })
  })

  describe('POST requests', () => {
    it('should make successful POST request with data', async () => {
      const mockResponse = { id: 1, name: 'test' }
      const postData = { name: 'test' }
      
      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      })

      const result = await httpClient.post('/test', postData)

      expect(result).toEqual(mockResponse)
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(postData),
        }
      )
    })

    it('should make POST request without data', async () => {
      const mockResponse = { success: true }
      
      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      })

      const result = await httpClient.post('/test')

      expect(result).toEqual(mockResponse)
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: undefined,
        }
      )
    })
  })

  describe('PUT requests', () => {
    it('should make successful PUT request', async () => {
      const mockResponse = { id: 1, name: 'updated' }
      const putData = { name: 'updated' }
      
      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      })

      const result = await httpClient.put('/test/1', putData)

      expect(result).toEqual(mockResponse)
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test/1',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify(putData),
        }
      )
    })
  })

  describe('DELETE requests', () => {
    it('should make successful DELETE request', async () => {
      const mockResponse = { success: true }
      
      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      })

      const result = await httpClient.delete('/test/1')

      expect(result).toEqual(mockResponse)
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test/1',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        }
      )
    })
  })

  describe('error handling', () => {
    it('should handle network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))

      await expect(httpClient.get('/test')).rejects.toThrow('Network error')
    })

    it('should handle HTTP errors with default message', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValue({}),
      })

      await expect(httpClient.get('/test')).rejects.toThrow('HTTP error! status: 500')
    })

    it('should handle HTTP errors with custom message', async () => {
      const errorMessage = 'Custom error message'
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: jest.fn().mockResolvedValue({ message: errorMessage }),
      })

      await expect(httpClient.get('/test')).rejects.toThrow(errorMessage)
    })
  })
})