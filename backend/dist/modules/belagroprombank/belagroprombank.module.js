"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BelagropromBankModule = void 0;
const common_1 = require("@nestjs/common");
const belagroprombank_controller_1 = require("./belagroprombank.controller");
const belagroprombank_service_1 = require("./belagroprombank.service");
let BelagropromBankModule = class BelagropromBankModule {
};
exports.BelagropromBankModule = BelagropromBankModule;
exports.BelagropromBankModule = BelagropromBankModule = __decorate([
    (0, common_1.Module)({
        controllers: [belagroprombank_controller_1.BelagropromBankController],
        providers: [belagroprombank_service_1.BelagropromBankService],
    })
], BelagropromBankModule);
//# sourceMappingURL=belagroprombank.module.js.map