"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quotesController_1 = require("./quotesController");
function quotesRoutes(fastify, opts, done) {
    fastify.get('/top_quotes', quotesController_1.getTopQuotes);
    fastify.get('/', quotesController_1.getQuotes);
    fastify.post('/', quotesController_1.createQuote);
    fastify.post('/reset', quotesController_1.resetQuotes);
    done();
}
exports.default = quotesRoutes;
