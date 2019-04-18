const Koa = require('koa');
const helmet = require('koa-helmet');
const { pageNotFound, errorHandling } = require('../middlewares');
const router = require('../routes');

const app = new Koa();

const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';

if (isProduction) {
  app.proxy = true; // eg header 'X-Forwarded-Host'
}

app.use(errorHandling());

app.use(helmet());

app.use(router.routes());
app.use(router.allowedMethods());

app.use(pageNotFound);

module.exports = app;
