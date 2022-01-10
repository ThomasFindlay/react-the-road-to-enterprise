"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userController_1 = require("./userController");
function userRoutes(fastify, opts, done) {
    fastify.get('/', userController_1.getUser);
    fastify.get('/all', userController_1.getUsers);
    fastify.post('/', { schema: userController_1.registerUserSchema }, userController_1.registerUser);
    fastify.post('/reset', userController_1.resetUsers);
    fastify.delete('/:id', userController_1.deleteUser);
    done();
}
exports.default = userRoutes;
