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
exports.deleteUser = exports.resetUsers = exports.registerUser = exports.registerUserSchema = exports.getUsers = exports.getUser = void 0;
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
var nanoid_1 = require("nanoid");
var usersOriginal_json_1 = __importDefault(require("./usersOriginal.json"));
var usersFilePath = path_1.default.resolve(__dirname, './users.json');
var sleep = function (time) {
    if (time === void 0) { time = 1000; }
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
};
var readUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var usersBuffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, promises_1.default.readFile(usersFilePath)];
            case 1:
                usersBuffer = _a.sent();
                return [2 /*return*/, JSON.parse(usersBuffer.toString())];
        }
    });
}); };
var writeUsers = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, promises_1.default.writeFile(usersFilePath, JSON.stringify(data), 'utf-8')];
    });
}); };
var getUser = function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var email, users, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = request.query.email;
                if (!email)
                    throw new Error('Please provide email.');
                return [4 /*yield*/, sleep()];
            case 1:
                _a.sent();
                return [4 /*yield*/, readUsers()];
            case 2:
                users = _a.sent();
                user = users.find(function (user) { return user.email === email; });
                return [2 /*return*/, {
                        user: user,
                    }];
        }
    });
}); };
exports.getUser = getUser;
var getUsers = function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, sleep()];
            case 1:
                _b.sent();
                _a = {};
                return [4 /*yield*/, readUsers()];
            case 2: return [2 /*return*/, (_a.users = _b.sent(),
                    _a)];
        }
    });
}); };
exports.getUsers = getUsers;
exports.registerUserSchema = {
    body: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
            email: {
                type: 'string',
            },
        },
        required: ['name', 'email'],
    },
};
var registerUser = function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, newUser, users;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, name = _a.name, email = _a.email;
                return [4 /*yield*/, sleep()];
            case 1:
                _b.sent();
                newUser = {
                    id: (0, nanoid_1.nanoid)(),
                    name: name,
                    email: email,
                };
                return [4 /*yield*/, readUsers()];
            case 2:
                users = _b.sent();
                users.push(newUser);
                return [4 /*yield*/, writeUsers(users)];
            case 3:
                _b.sent();
                return [2 /*return*/, {
                        user: newUser,
                    }];
        }
    });
}); };
exports.registerUser = registerUser;
var resetUsers = function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sleep()];
            case 1:
                _a.sent();
                return [4 /*yield*/, writeUsers(usersOriginal_json_1.default)];
            case 2:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
exports.resetUsers = resetUsers;
var deleteUser = function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var id, users, updatedUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                if (!id)
                    throw new Error('User id is required');
                return [4 /*yield*/, sleep()];
            case 1:
                _a.sent();
                return [4 /*yield*/, readUsers()];
            case 2:
                users = _a.sent();
                updatedUsers = users.filter(function (_user) { return _user.id !== id; });
                return [4 /*yield*/, writeUsers(updatedUsers)];
            case 3:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
exports.deleteUser = deleteUser;
