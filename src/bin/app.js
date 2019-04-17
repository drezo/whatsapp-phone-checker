const Koa = require('koa');
const helmet = require('koa-helmet');

const app = new Koa();

app.use(helmet());

module.exports = app;
