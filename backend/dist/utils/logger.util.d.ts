export declare class Logger {
    static log(message: string, context?: string): void;
    static error(message: string, trace?: string, context?: string): void;
    static warn(message: string, context?: string): void;
    static debug(message: string, context?: string): void;
}
