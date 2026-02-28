/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstadmApiModule = void 0;
const common_1 = __webpack_require__(3);
const instadm_api_controller_1 = __webpack_require__(4);
const instadm_api_service_1 = __webpack_require__(5);
const instadm_module_1 = __webpack_require__(6);
let InstadmApiModule = class InstadmApiModule {
};
exports.InstadmApiModule = InstadmApiModule;
exports.InstadmApiModule = InstadmApiModule = __decorate([
    (0, common_1.Module)({
        imports: [instadm_module_1.InstadmModule],
        controllers: [instadm_api_controller_1.InstadmApiController],
        providers: [instadm_api_service_1.InstadmApiService],
    })
], InstadmApiModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstadmApiController = void 0;
const common_1 = __webpack_require__(3);
const instadm_api_service_1 = __webpack_require__(5);
let InstadmApiController = class InstadmApiController {
    constructor(instadmApiService) {
        this.instadmApiService = instadmApiService;
    }
    getHello() {
        return this.instadmApiService.getHello();
    }
};
exports.InstadmApiController = InstadmApiController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], InstadmApiController.prototype, "getHello", null);
exports.InstadmApiController = InstadmApiController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof instadm_api_service_1.InstadmApiService !== "undefined" && instadm_api_service_1.InstadmApiService) === "function" ? _a : Object])
], InstadmApiController);


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstadmApiService = void 0;
const common_1 = __webpack_require__(3);
let InstadmApiService = class InstadmApiService {
    getHello() {
        return 'Hello World!';
    }
};
exports.InstadmApiService = InstadmApiService;
exports.InstadmApiService = InstadmApiService = __decorate([
    (0, common_1.Injectable)()
], InstadmApiService);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstadmModule = void 0;
const common_1 = __webpack_require__(3);
const bullmq_1 = __webpack_require__(7);
const instadm_processor_1 = __webpack_require__(8);
const instadm_service_1 = __webpack_require__(9);
const instadm_controller_1 = __webpack_require__(11);
let InstadmModule = class InstadmModule {
};
exports.InstadmModule = InstadmModule;
exports.InstadmModule = InstadmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bullmq_1.BullModule.registerQueue({
                name: 'instadm-queue',
            }),
        ],
        controllers: [instadm_controller_1.InstadmController],
        providers: [instadm_service_1.InstadmService, instadm_processor_1.InstadmProcessor],
    })
], InstadmModule);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/bullmq");

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstadmProcessor = void 0;
const bullmq_1 = __webpack_require__(7);
let InstadmProcessor = class InstadmProcessor extends bullmq_1.WorkerHost {
    async process(job) {
        console.log(`Processing job ${job.id} of type ${job.name} with data:`, job.data);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log(`Job ${job.id} completed`);
        return { success: true };
    }
};
exports.InstadmProcessor = InstadmProcessor;
exports.InstadmProcessor = InstadmProcessor = __decorate([
    (0, bullmq_1.Processor)('instadm-queue')
], InstadmProcessor);


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstadmService = void 0;
const common_1 = __webpack_require__(3);
const bullmq_1 = __webpack_require__(7);
const bullmq_2 = __webpack_require__(10);
let InstadmService = class InstadmService {
    constructor(instadmQueue) {
        this.instadmQueue = instadmQueue;
    }
    async triggerTask(data) {
        await this.instadmQueue.add('scrape-job', data);
        return { message: 'Job added to queue', jobId: 'pending' };
    }
};
exports.InstadmService = InstadmService;
exports.InstadmService = InstadmService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)('instadm-queue')),
    __metadata("design:paramtypes", [typeof (_a = typeof bullmq_2.Queue !== "undefined" && bullmq_2.Queue) === "function" ? _a : Object])
], InstadmService);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("bullmq");

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InstadmController = void 0;
const common_1 = __webpack_require__(3);
const instadm_service_1 = __webpack_require__(9);
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
    __metadata("design:paramtypes", [typeof (_a = typeof instadm_service_1.InstadmService !== "undefined" && instadm_service_1.InstadmService) === "function" ? _a : Object])
], InstadmController);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const instadm_api_module_1 = __webpack_require__(2);
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(instadm_api_module_1.InstadmApiModule);
    await app.listen((_a = process.env.port) !== null && _a !== void 0 ? _a : 3000);
}
bootstrap();

})();

/******/ })()
;