const Koa = require('koa');
const helmet = require('koa-helmet');

const app = new Koa();

const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';

if (isProduction) {
  app.proxy = true; // eg header 'X-Forwarded-Host'
}

app.use(helmet());

module.exports = app;
