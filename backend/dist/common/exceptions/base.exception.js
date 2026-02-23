"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseException = void 0;
const common_1 = require("@nestjs/common");
class BaseException extends common_1.HttpException {
    constructor(message, statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR, error) {
        super({
            message,
            error: error || 'Internal Server Error',
            statusCode,
        }, statusCode);
    }
}
exports.BaseException = BaseException;
//# sourceMappingURL=base.exception.js.map