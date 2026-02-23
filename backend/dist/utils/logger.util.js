"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    static log(message, context) {
        const timestamp = new Date().toISOString();
        const contextStr = context ? `[${context}] ` : '';
        console.log(`${timestamp} ${contextStr}${message}`);
    }
    static error(message, trace, context) {
        const timestamp = new Date().toISOString();
        const contextStr = context ? `[${context}] ` : '';
        console.error(`${timestamp} ${contextStr}ERROR: ${message}`);
        if (trace) {
            console.error(trace);
        }
    }
    static warn(message, context) {
        const timestamp = new Date().toISOString();
        const contextStr = context ? `[${context}] ` : '';
        console.warn(`${timestamp} ${contextStr}WARN: ${message}`);
    }
    static debug(message, context) {
        const timestamp = new Date().toISOString();
        const contextStr = context ? `[${context}] ` : '';
        console.debug(`${timestamp} ${contextStr}DEBUG: ${message}`);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.util.js.map