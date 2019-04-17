const Router = require('koa-router');

const router = new Router();

router.get('/', async ctx => {
  ctx.body = { success: true };
});

module.exports = router;
