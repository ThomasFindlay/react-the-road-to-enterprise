"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetQuotes = exports.createQuote = exports.getQuotes = exports.getTopQuotes = void 0;
var nanoid_1 = require("nanoid");
var quotesOriginal_json_1 = __importDefault(require("./quotesOriginal.json"));
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
// Force ts to copy quotes to the build folder
var quotesFilePath = path_1.default.resolve(__dirname, './quotes.json');
var sleep = function (time) {
    if (time === void 0) { time = 1000; }
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
};
var readQuotes = function () { return __awaiter(void 0, void 0, void 0, function () {
    var quotesBuffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, promises_1.default.readFile(quotesFilePath)];
            case 1:
                quotesBuffer = _a.sent();
                return [2 /*return*/, JSON.parse(quotesBuffer.toString())];
        }
    });
}); };
var getTopQuotes = function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var quotesData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sleep()];
            case 1:
                _a.sent();
                return [4 /*yield*/, readQuotes()];
            case 2:
                quotesData = _a.sent();
                return [2 /*return*/, {
                        quotes: quotesData.quotes.slice(0, 5),
                    }];
        }
    });
}); };
exports.getTopQuotes = getTopQuotes;
var getQuotesByPage = function (page, limit) { return __awaiter(void 0, void 0, void 0, function () {
    var offset, endIndex, quotesData, quotes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                offset = page * limit;
                endIndex = offset + limit;
                return [4 /*yield*/, readQuotes()];
            case 1:
                quotesData = _a.sent();
                quotes = quotesData.quotes.slice(offset, endIndex);
                return [2 /*return*/, {
                        quotes: quotes,
                        hasMore: endIndex < quotesData.quotes.length - 1,
                    }];
        }
    });
}); };
var getQuotesByCursor = function (cursor, limit) { return __awaiter(void 0, void 0, void 0, function () {
    var endIndex, quotesData, quotes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                endIndex = cursor + limit;
                return [4 /*yield*/, readQuotes()];
            case 1:
                quotesData = _a.sent();
                quotes = quotesData.quotes.slice(cursor, endIndex);
                return [2 /*return*/, {
                        quotes: quotes,
                        nextCursor: endIndex < quotesData.quotes.length - 1 ? endIndex + 1 : null,
                    }];
        }
    });
}); };
var getQuotes = function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, cursor, limit;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.query, page = _a.page, cursor = _a.cursor;
                if (!page && !cursor)
                    throw new Error('Missing parameters. Please provide "page" or "cursor" parameter in the request query.');
                return [4 /*yield*/, sleep()];
            case 1:
                _b.sent();
                limit = 5;
                if (page)
                    return [2 /*return*/, getQuotesByPage(parseInt(page), limit)];
                if (cursor)
                    return [2 /*return*/, getQuotesByCursor(parseInt(cursor), limit)];
                return [2 /*return*/];
        }
    });
}); };
exports.getQuotes = getQuotes;
var createQuote = function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, quote, author, quotesBuffer, quotesJson, id;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, quote = _a.quote, author = _a.author;
                if (!quote || !author)
                    throw new Error('Please provide author and quote text.');
                return [4 /*yield*/, sleep()];
            case 1:
                _b.sent();
                return [4 /*yield*/, promises_1.default.readFile(quotesFilePath)];
            case 2:
                quotesBuffer = _b.sent();
                quotesJson = JSON.parse(quotesBuffer.toString());
                id = (0, nanoid_1.nanoid)();
                quotesJson.quotes.unshift({ id: id, quote: quote, author: author });
                return [4 /*yield*/, promises_1.default.writeFile(quotesFilePath, JSON.stringify(quotesJson), 'utf-8')];
            case 3:
                _b.sent();
                return [2 /*return*/, true];
        }
    });
}); };
exports.createQuote = createQuote;
var resetQuotes = function (request) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sleep()];
            case 1:
                _a.sent();
                return [4 /*yield*/, promises_1.default.writeFile(quotesFilePath, JSON.stringify(quotesOriginal_json_1.default), 'utf-8')];
            case 2:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
exports.resetQuotes = resetQuotes;
