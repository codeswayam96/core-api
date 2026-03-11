"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuraApiModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_1 = require("../../../libs/database/src");
const auth_module_1 = require("./modules/auth/auth.module");
const aura_api_controller_1 = require("./aura-api.controller");
const aura_api_service_1 = require("./aura-api.service");
const automations_module_1 = require("./modules/automations/automations.module");
const integrations_module_1 = require("./modules/integrations/integrations.module");
const webhooks_module_1 = require("./modules/webhooks/webhooks.module");
let AuraApiModule = class AuraApiModule {
};
exports.AuraApiModule = AuraApiModule;
exports.AuraApiModule = AuraApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            database_1.DrizzleModule,
            automations_module_1.AutomationsModule,
            integrations_module_1.IntegrationsModule,
            webhooks_module_1.WebhooksModule,
        ],
        controllers: [aura_api_controller_1.AuraApiController],
        providers: [aura_api_service_1.AuraApiService],
    })
], AuraApiModule);
//# sourceMappingURL=aura-api.module.js.map