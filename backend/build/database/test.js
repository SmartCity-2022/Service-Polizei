"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const policeTest = __importStar(require("./entities/policeMan"));
const policeMan_1 = require("./entities/policeMan");
const adressTest = __importStar(require("./entities/adress"));
const adress_1 = require("./entities/adress");
const trafficjam_1 = require("./entities/trafficjam");
function doPoliceTest() {
    return __awaiter(this, void 0, void 0, function* () {
        yield policeTest.createPolizist("test", "test");
        const policeMan = (0, policeMan_1.getPolizist)("1");
        policeMan.then((value) => console.log(value));
    });
}
function doAdressTest() {
    return __awaiter(this, void 0, void 0, function* () {
        yield adressTest.createAdresse("32457", "Porta Westfalica", "Rintelner Straße", "25");
        const testAdress = (0, adress_1.getAdresse)(1);
        testAdress.then((value) => console.log("adressTest: \n" + value));
    });
}
function doTrafficJamTest() {
    (0, trafficjam_1.createTrafficJam)(0, "32423", "Minden", "Letelner Straße", "79").catch((value) => {
        console.error(value);
    });
}
//doTrafficJamTest();
doAdressTest();
//# sourceMappingURL=test.js.map