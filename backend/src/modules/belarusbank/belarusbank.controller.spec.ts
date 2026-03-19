import { Test, TestingModule } from '@nestjs/testing';
import { BelarusBankController } from './belarusbank.controller';
import { BelarusBankService } from './belarusbank.service';

describe('BelarusBankController', () => {
  let controller: BelarusBankController;
  let service: BelarusBankService;

  const mockBankRatesResponse = {
    bankName: 'Альфа-Банк',
    logoUrl:
      'https://png.klev.club/uploads/posts/2024-04/png-klev-club-i9fp-p-logotip-alfa-bank-png-12.png',
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
      controllers: [BelarusBankController],
      providers: [
        {
          provide: BelarusBankService,
          useValue: mockAlfaBankService,
        },
      ],
    }).compile();

    controller = module.get<BelarusBankController>(BelarusBankController);
    service = module.get<BelarusBankService>(BelarusBankService);
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
      jest
        .spyOn(service, 'getRates')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.getRates()).rejects.toThrow(errorMessage);
      expect(service.getRates).toHaveBeenCalled();
    });

    it('should handle network timeout errors', async () => {
      jest
        .spyOn(service, 'getRates')
        .mockRejectedValue(new Error('Network timeout'));

      await expect(controller.getRates()).rejects.toThrow('Network timeout');
    });

    it('should handle invalid response format', async () => {
      jest
        .spyOn(service, 'getRates')
        .mockRejectedValue(new Error('Invalid response format'));

      await expect(controller.getRates()).rejects.toThrow(
        'Invalid response format',
      );
    });
  });
});
