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
exports.createTrafficJam = void 0;
const DB = __importStar(require("../databaseconnection"));
const adress_1 = require("./adress");
function createTrafficJam(date, plz, ort, strasse, hausnummer, zusatz) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let adress = yield (0, adress_1.getAdresseByParams)(plz, ort, strasse, hausnummer);
            let adressId = 0;
            if (adress == null) {
                // await createAdresse(plz,ort,strasse,hausnummer,zusatz).then((value)=> {value !=null?adressId = value:adressId = 0;});
            }
            else {
                adressId = adress.id;
            }
            let resp = yield DB.update("INSERT INTO Stau(DATUM,ADRESSEN_ID) VALUES(?,?)", [date, adressId]);
            if (resp.error) {
                reject(resp.error);
                return;
            }
            resolve(resp.rows[0].id);
        }));
    });
}
exports.createTrafficJam = createTrafficJam;
//# sourceMappingURL=trafficjam.js.map