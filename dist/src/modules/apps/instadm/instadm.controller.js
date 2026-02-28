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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstadmController = void 0;
const common_1 = require("@nestjs/common");
const instadm_service_1 = require("./instadm.service");
let InstadmController = class InstadmController {
    constructor(instadmService) {
        this.instadmService = instadmService;
    }
    async createJob(body) {
        return this.instadmService.triggerTask(body);
    }
};
exports.InstadmController = InstadmController;
__decorate([
    (0, common_1.Post)('job'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstadmController.prototype, "createJob", null);
exports.InstadmController = InstadmController = __decorate([
    (0, common_1.Controller)('apps/instadm'),
    __metadata("design:paramtypes", [instadm_service_1.InstadmService])
], InstadmController);
//# sourceMappingURL=instadm.controller.js.map