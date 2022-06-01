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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.query = void 0;
const mysql_1 = __importDefault(require("mysql"));
//export const config: DBconfig = JSON.parse(fs.readFileSync("./database/database.json","utf-8"));
const config = __importStar(require("./database.json"));
const pool = mysql_1.default.createPool({
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password,
    database: config.database,
    connectionLimit: config.connectionLimit,
    supportBigNumbers: config.supportBigNumbers
});
/*export async function setup(): Promise<void> {
    return new Promise<void>(async (resolve,reject) =>{
        for(const script of create)
    })
}*/
function query(sql, params) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            pool.query(sql, params, (err, result) => {
                if (err) {
                    resolve({ error: true, error_message: err.message, rows: [] });
                }
                else {
                    resolve({ error: false, error_message: "", rows: result });
                }
            });
        }));
    });
}
exports.query = query;
function update(sql, params) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            pool.query(sql, params, (err, result) => {
                if (err) {
                    resolve({ error: true, error_message: err.message, fieldCount: 0, affectedRows: 0, insertId: 0, warningCount: 0, message: " ", changedRows: 0 });
                    console.log(err.message);
                }
                else {
                    resolve({ error: false, error_message: "", fieldCount: result.fieldCount, affectedRows: result.affectedRows, insertId: result.insertId, warningCount: result.warningCount, message: result.message, changedRows: result.changedRows, rows: result });
                }
            });
        }));
    });
}
exports.update = update;
//# sourceMappingURL=databaseconnection.js.map