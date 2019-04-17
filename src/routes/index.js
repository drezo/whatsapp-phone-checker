const Router = require('koa-router');

const router = new Router();

router.get('/robots.txt', ctx => {
  ctx.body = 'User-agent: *\nDisallow: /';
});

router.get('/_health', ctx => {
  ctx.body = { success: true };
});

module.exports = router;
