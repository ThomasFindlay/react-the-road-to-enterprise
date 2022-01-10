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
exports.resetEvents = exports.createEvent = exports.getEvents = exports.getAllEvents = exports.getTopEvents = void 0;
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
var eventsFilePath = path_1.default.resolve(__dirname, './events.json');
var createEventDate = function (days, hours) {
    if (days === void 0) { days = 10; }
    if (hours === void 0) { hours = 0; }
    var date = new Date();
    var day = date.getDate() + days;
    date.setDate(day);
    date.setHours(date.getHours() + hours);
    return new Intl.DateTimeFormat().format(date);
};
var events = [
    {
        id: '1',
        title: 'Football Match',
        startDate: createEventDate(10),
        startTime: '12:00',
        endDate: createEventDate(10, 2),
        endTime: '16:00',
    },
    {
        id: '2',
        title: 'Birthday Party',
        startDate: createEventDate(24),
        startTime: '9:00',
        endDate: createEventDate(24, 6),
        endTime: '14:00',
    },
    {
        id: '3',
        title: 'Tech Conference',
        startDate: createEventDate(45),
        startTime: '08:00',
        endDate: createEventDate(45, 4),
        endTime: '18:00',
    },
    {
        id: '4',
        title: 'Board Games Night',
        startDate: createEventDate(-15),
        startTime: '20:00',
        endDate: createEventDate(-15, 3),
        endTime: '23:00',
    },
];
promises_1.default.writeFile(eventsFilePath, JSON.stringify({
    events: events,
}), 'utf-8');
var sleep = function (time) {
    if (time === void 0) { time = 1000; }
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
};
var readEvents = function () { return __awaiter(void 0, void 0, void 0, function () {
    var eventsBuffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, promises_1.default.readFile(eventsFilePath)];
            case 1:
                eventsBuffer = _a.sent();
                return [2 /*return*/, JSON.parse(eventsBuffer.toString())];
        }
    });
}); };
var getTopEvents = function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var eventsData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sleep()];
            case 1:
                _a.sent();
                return [4 /*yield*/, readEvents()];
            case 2:
                eventsData = _a.sent();
                return [2 /*return*/, {
                        events: eventsData.events.slice(0, 5),
                    }];
        }
    });
}); };
exports.getTopEvents = getTopEvents;
var getEventsByPage = function (page, limit) { return __awaiter(void 0, void 0, void 0, function () {
    var offset, endIndex, eventsData, events;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                offset = page * limit;
                endIndex = offset + limit;
                return [4 /*yield*/, readEvents()];
            case 1:
                eventsData = _a.sent();
                events = eventsData.events.slice(offset, endIndex);
                return [2 /*return*/, {
                        events: events,
                        hasMore: endIndex < eventsData.events.length - 1,
                    }];
        }
    });
}); };
var getEventsByCursor = function (cursor, limit) { return __awaiter(void 0, void 0, void 0, function () {
    var endIndex, eventsData, events;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                endIndex = cursor + limit;
                return [4 /*yield*/, readEvents()];
            case 1:
                eventsData = _a.sent();
                events = eventsData.events.slice(cursor, endIndex);
                return [2 /*return*/, {
                        events: events,
                        nextCursor: endIndex < eventsData.events.length - 1 ? endIndex + 1 : null,
                    }];
        }
    });
}); };
var getAllEvents = function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sleep()];
            case 1:
                _a.sent();
                return [4 /*yield*/, readEvents()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getAllEvents = getAllEvents;
var getEvents = function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
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
                    return [2 /*return*/, getEventsByPage(parseInt(page), limit)];
                if (cursor)
                    return [2 /*return*/, getEventsByCursor(parseInt(cursor), limit)];
                return [2 /*return*/];
        }
    });
}); };
exports.getEvents = getEvents;
var createEvent = function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, title, startDate, startTime, endDate, endTime, eventsBuffer, eventsJson;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, id = _a.id, title = _a.title, startDate = _a.startDate, startTime = _a.startTime, endDate = _a.endDate, endTime = _a.endTime;
                if (!id || !title || !startDate || !startTime || !endDate || !endTime)
                    throw new Error('Please provide event details.');
                return [4 /*yield*/, sleep()];
            case 1:
                _b.sent();
                return [4 /*yield*/, promises_1.default.readFile(eventsFilePath)];
            case 2:
                eventsBuffer = _b.sent();
                eventsJson = JSON.parse(eventsBuffer.toString());
                eventsJson.events.unshift({
                    id: id,
                    title: title,
                    startDate: startDate,
                    startTime: startTime,
                    endDate: endDate,
                    endTime: endTime,
                });
                return [4 /*yield*/, promises_1.default.writeFile(eventsFilePath, JSON.stringify(eventsJson), 'utf-8')];
            case 3:
                _b.sent();
                return [2 /*return*/, true];
        }
    });
}); };
exports.createEvent = createEvent;
var resetEvents = function (request) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sleep()];
            case 1:
                _a.sent();
                return [4 /*yield*/, promises_1.default.writeFile(eventsFilePath, JSON.stringify(events), 'utf-8')];
            case 2:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
exports.resetEvents = resetEvents;
