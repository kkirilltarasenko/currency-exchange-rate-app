export class Logger {
  static log(message: string, context?: string): void {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}] ` : '';
    console.log(`${timestamp} ${contextStr}${message}`);
  }

  static error(message: string, trace?: string, context?: string): void {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}] ` : '';
    console.error(`${timestamp} ${contextStr}ERROR: ${message}`);
    if (trace) {
      console.error(trace);
    }
  }

  static warn(message: string, context?: string): void {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}] ` : '';
    console.warn(`${timestamp} ${contextStr}WARN: ${message}`);
  }

  static debug(message: string, context?: string): void {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}] ` : '';
    console.debug(`${timestamp} ${contextStr}DEBUG: ${message}`);
  }
}
