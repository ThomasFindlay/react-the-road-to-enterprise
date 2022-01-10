"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eventsController_1 = require("./eventsController");
function eventsRoutes(fastify, opts, done) {
    fastify.get('/top_events', eventsController_1.getTopEvents);
    fastify.get('/', eventsController_1.getEvents);
    fastify.get('/all', eventsController_1.getAllEvents);
    fastify.post('/', eventsController_1.createEvent);
    fastify.post('/reset', eventsController_1.resetEvents);
    done();
}
exports.default = eventsRoutes;
