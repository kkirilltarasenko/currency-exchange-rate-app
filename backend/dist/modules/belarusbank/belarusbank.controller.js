"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BelarusBankController = void 0;
const common_1 = require("@nestjs/common");
const belarusbank_service_1 = require("./belarusbank.service");
let BelarusBankController = class BelarusBankController {
    belarusBankService;
    constructor(belarusBankService) {
        this.belarusBankService = belarusBankService;
    }
    getRates() {
        return this.belarusBankService.getRates();
    }
};
exports.BelarusBankController = BelarusBankController;
__decorate([
    (0, common_1.Get)('rates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BelarusBankController.prototype, "getRates", null);
exports.BelarusBankController = BelarusBankController = __decorate([
    (0, common_1.Controller)('belarusbank'),
    __metadata("design:paramtypes", [belarusbank_service_1.BelarusBankService])
], BelarusBankController);
//# sourceMappingURL=belarusbank.controller.js.map