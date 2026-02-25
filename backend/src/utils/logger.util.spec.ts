import { Logger } from './logger.util';

describe('Logger', () => {
  let consoleSpy: {
    log: jest.SpyInstance;
    error: jest.SpyInstance;
    warn: jest.SpyInstance;
    debug: jest.SpyInstance;
  };

  beforeEach(() => {
    consoleSpy = {
      log: jest.spyOn(console, 'log').mockImplementation(),
      error: jest.spyOn(console, 'error').mockImplementation(),
      warn: jest.spyOn(console, 'warn').mockImplementation(),
      debug: jest.spyOn(console, 'debug').mockImplementation(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('log', () => {
    it('should log message with timestamp', () => {
      const message = 'Test log message';
      Logger.log(message);

      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z Test log message$/),
      );
    });

    it('should log message with context', () => {
      const message = 'Test log message';
      const context = 'TestContext';
      Logger.log(message, context);

      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z \[TestContext\] Test log message$/),
      );
    });

    it('should log message without context when context is empty', () => {
      const message = 'Test log message';
      Logger.log(message, '');

      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z Test log message$/),
      );
    });
  });

  describe('error', () => {
    it('should log error message with timestamp', () => {
      const message = 'Test error message';
      Logger.error(message);

      expect(consoleSpy.error).toHaveBeenCalledWith(
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z ERROR: Test error message$/),
      );
    });

    it('should log error message with context', () => {
      const message = 'Test error message';
      const context = 'ErrorContext';
      Logger.error(message, undefined, context);

      expect(consoleSpy.error).toHaveBeenCalledWith(
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z \[ErrorContext\] ERROR: Test error message$/),
      );
    });

    it('should log error message with trace', () => {
      const message = 'Test error message';
      const trace = 'Error stack trace';
      Logger.error(message, trace);

      expect(consoleSpy.error).toHaveBeenCalledWith(
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z ERROR: Test error message$/),
      );
      expect(consoleSpy.error).toHaveBeenCalledWith(trace);
    });

    it('should log error message with both trace and context', () => {
      const message = 'Test error message';
      const trace = 'Error stack trace';
      const context = 'ErrorContext';
      Logger.error(message, trace, context);

      expect(consoleSpy.error).toHaveBeenCalledWith(
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z \[ErrorContext\] ERROR: Test error message$/),
      );
      expect(consoleSpy.error).toHaveBeenCalledWith(trace);
    });
  });

  describe('warn', () => {
    it('should log warning message with timestamp', () => {
      const message = 'Test warning message';
      Logger.warn(message);

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z WARN: Test warning message$/),
      );
    });

    it('should log warning message with context', () => {
      const message = 'Test warning message';
      const context = 'WarnContext';
      Logger.warn(message, context);

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z \[WarnContext\] WARN: Test warning message$/),
      );
    });
  });

  describe('debug', () => {
    it('should log debug message with timestamp', () => {
      const message = 'Test debug message';
      Logger.debug(message);

      expect(consoleSpy.debug).toHaveBeenCalledWith(
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z DEBUG: Test debug message$/),
      );
    });

    it('should log debug message with context', () => {
      const message = 'Test debug message';
      const context = 'DebugContext';
      Logger.debug(message, context);

      expect(consoleSpy.debug).toHaveBeenCalledWith(
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z \[DebugContext\] DEBUG: Test debug message$/),
      );
    });
  });

  describe('timestamp format', () => {
    it('should use ISO string format for timestamps', () => {
      const originalToISOString = Date.prototype.toISOString;
      const mockTimestamp = '2024-01-01T12:00:00.000Z';
      Date.prototype.toISOString = jest.fn().mockReturnValue(mockTimestamp);

      Logger.log('test message');

      expect(consoleSpy.log).toHaveBeenCalledWith(`${mockTimestamp} test message`);

      Date.prototype.toISOString = originalToISOString;
    });
  });
});