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
exports.createAdresse = exports.getAdresseByParams = exports.getAdresse = void 0;
const DB = __importStar(require("../databaseconnection"));
function getAdresse(id) {
    return __awaiter(this, arguments, void 0, function* () {
        console.log(arguments);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let resp = yield DB.query("SELECT * FROM Adresse WHERE id = ?", [id]);
            if (resp.error) {
                reject(resp.error);
                return;
            }
            console.log(resp);
            resolve({
                id: resp.rows[0].id,
                plz: resp.rows[0].plz,
                ort: resp.rows[0].ort,
                straße: resp.rows[0].straße,
                hausnummer: resp.rows[0].hausnummer == null ? "" : resp.rows[0].hausnummer,
                zusatz: resp.rows[0].zusatz == null ? "" : resp.rows[0].zusatz
            });
        }));
    });
}
exports.getAdresse = getAdresse;
function getAdresseByParams(plz, ort, straße, hausnummer) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let query = "SELECT * FROM adresse WHERE plz=? AND WHERE ort=? AND straße=?";
            let params = [plz, ort, straße];
            if (hausnummer != undefined) {
                query += "AND WHERE hausnummer =?";
                params.push(hausnummer);
            }
            let resp = yield DB.query(query, params);
            if (resp.error) {
                reject(resp.error_message);
                return;
            }
            resolve({
                id: resp.rows[0].id,
                plz: resp.rows[0].plz,
                ort: resp.rows[0].ort,
                straße: resp.rows[0].straße,
                hausnummer: resp.rows[0].hausnummer == null ? "" : resp.rows[0].hausnummer,
                zusatz: resp.rows[0].zusatz == null ? "" : resp.rows[0].zusatz
            });
        }));
    });
}
exports.getAdresseByParams = getAdresseByParams;
function createAdresse(plz, ort, straße, hausnummer, zusatz) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let resp = yield DB.update("INSERT INTO Adresse(PLZ,ORT,STRASSE,HAUSNUMMER,ZUSATZ) VALUES(?,?,?,?,?)", [plz, ort, straße, hausnummer, zusatz]);
            if (resp.error) {
                reject(resp.error);
                console.log(resp.error_message);
                return;
            }
            console.log("TEST");
            resolve(resp.changedRows > 0);
        }));
    });
}
exports.createAdresse = createAdresse;
//# sourceMappingURL=adress.js.map