import { Test, TestingModule } from '@nestjs/testing';
import { AlfaBankService } from './alfa-bank.service';

// Mock fetch globally
global.fetch = jest.fn();

describe('AlfaBankService', () => {
  let service: AlfaBankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlfaBankService],
    }).compile();

    service = module.get<AlfaBankService>(AlfaBankService);
    jest.clearAllMocks();
  });

  describe('getName', () => {
    it('should return bank name', () => {
      expect(service.getName()).toBe('Альфа-Банк');
    });
  });

  describe('getLogo', () => {
    it('should return logo URL', () => {
      expect(service.getLogo()).toBe(
        'https://png.klev.club/uploads/posts/2024-04/png-klev-club-i9fp-p-logotip-alfa-bank-png-12.png',
      );
    });
  });

  describe('mapRates', () => {
    it('should correctly map valid API response', () => {
      const mockApiResponse = {
        rates: [
          {
            sellRate: 3.2,
            sellIso: 'USD',
            sellCode: 840,
            buyRate: 3.1,
            buyIso: 'BYN',
            buyCode: 933,
            quantity: 1,
            name: 'USD/BYN',
            date: '2024-01-01T00:00:00Z',
          },
        ],
      };

      const result = service['mapRates'](mockApiResponse);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        sellRate: 3.2,
        sellIso: 'USD',
        sellCode: 840,
        buyRate: 3.1,
        buyIso: 'BYN',
        buyCode: 933,
        quantity: 1,
        name: 'USD/BYN',
        date: '2024-01-01T00:00:00Z',
      });
    });

    it('should handle missing optional fields with defaults', () => {
      const mockApiResponse = {
        rates: [
          {
            sellRate: 3.2,
            buyRate: 3.1,
          },
        ],
      };

      const result = service['mapRates'](mockApiResponse);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        sellRate: 3.2,
        sellIso: '',
        sellCode: 0,
        buyRate: 3.1,
        buyIso: '',
        buyCode: 0,
        quantity: 1,
        name: '/',
        date: expect.any(String),
      });
    });

    it('should return empty array for invalid response structure', () => {
      const invalidResponses = [
        null,
        undefined,
        {},
        { rates: null },
        { rates: 'invalid' },
        { rates: [] },
      ];

      invalidResponses.forEach((response) => {
        const result = service['mapRates'](response);
        expect(result).toEqual([]);
      });
    });

    it('should handle multiple rates', () => {
      const mockApiResponse = {
        rates: [
          {
            sellRate: 3.2,
            sellIso: 'USD',
            buyRate: 3.1,
            buyIso: 'BYN',
            quantity: 1,
            name: 'USD/BYN',
            date: '2024-01-01T00:00:00Z',
          },
          {
            sellRate: 3.8,
            sellIso: 'EUR',
            buyRate: 3.7,
            buyIso: 'BYN',
            quantity: 1,
            name: 'EUR/BYN',
            date: '2024-01-01T00:00:00Z',
          },
        ],
      };

      const result = service['mapRates'](mockApiResponse);

      expect(result).toHaveLength(2);
      expect(result[0].sellIso).toBe('USD');
      expect(result[1].sellIso).toBe('EUR');
    });
  });

  describe('getRates', () => {
    it('should successfully fetch and return rates', async () => {
      const mockApiResponse = {
        rates: [
          {
            sellRate: 3.2,
            sellIso: 'USD',
            buyRate: 3.1,
            buyIso: 'BYN',
            quantity: 1,
            name: 'USD/BYN',
            date: '2024-01-01T00:00:00Z',
          },
        ],
      };

      const mockResponse = {
        json: jest.fn().mockResolvedValue(mockApiResponse),
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await service.getRates();

      expect(fetch).toHaveBeenCalledWith(
        'https://ibapi.alfabank.by:8273/partner/1.0.1/public/rates',
      );
      expect(result).toEqual({
        bankName: 'Альфа-Банк',
        logoUrl:
          'https://png.klev.club/uploads/posts/2024-04/png-klev-club-i9fp-p-logotip-alfa-bank-png-12.png',
        rates: [
          {
            sellRate: 3.2,
            sellIso: 'USD',
            sellCode: 0,
            buyRate: 3.1,
            buyIso: 'BYN',
            buyCode: 0,
            quantity: 1,
            name: 'USD/BYN',
            date: '2024-01-01T00:00:00Z',
          },
        ],
      });
    });

    it('should handle network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(service.getRates()).rejects.toThrow('Network error');
    });

    it('should handle invalid JSON response', async () => {
      const mockResponse = {
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(service.getRates()).rejects.toThrow('Invalid JSON');
    });
  });
});
