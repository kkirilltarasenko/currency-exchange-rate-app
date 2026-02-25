import { Test, TestingModule } from '@nestjs/testing';
import { AlfaBankController } from './alfa-bank.controller';
import { AlfaBankService } from './alfa-bank.service';

describe('AlfaBankController', () => {
  let controller: AlfaBankController;
  let service: AlfaBankService;

  const mockBankRatesResponse = {
    bankName: 'Альфа-Банк',
    logoUrl: 'https://png.klev.club/uploads/posts/2024-04/png-klev-club-i9fp-p-logotip-alfa-bank-png-12.png',
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

  beforeEach(async () => {
    const mockAlfaBankService = {
      getRates: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlfaBankController],
      providers: [
        {
          provide: AlfaBankService,
          useValue: mockAlfaBankService,
        },
      ],
    }).compile();

    controller = module.get<AlfaBankController>(AlfaBankController);
    service = module.get<AlfaBankService>(AlfaBankService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRates', () => {
    it('should return bank rates successfully', async () => {
      jest.spyOn(service, 'getRates').mockResolvedValue(mockBankRatesResponse);

      const result = await controller.getRates();

      expect(service.getRates).toHaveBeenCalled();
      expect(result).toEqual(mockBankRatesResponse);
    });

    it('should handle service errors', async () => {
      const errorMessage = 'Service unavailable';
      jest.spyOn(service, 'getRates').mockRejectedValue(new Error(errorMessage));

      await expect(controller.getRates()).rejects.toThrow(errorMessage);
      expect(service.getRates).toHaveBeenCalled();
    });

    it('should handle network timeout errors', async () => {
      jest.spyOn(service, 'getRates').mockRejectedValue(new Error('Network timeout'));

      await expect(controller.getRates()).rejects.toThrow('Network timeout');
    });

    it('should handle invalid response format', async () => {
      jest.spyOn(service, 'getRates').mockRejectedValue(new Error('Invalid response format'));

      await expect(controller.getRates()).rejects.toThrow('Invalid response format');
    });
  });
});