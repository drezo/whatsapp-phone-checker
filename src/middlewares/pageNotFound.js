module.exports = async (ctx, next) => {
  await next();
  const { status = 404 } = ctx;
  if (status === 404) {
    ctx.status = status;
    ctx.body = {
      success: false,
      error: {
        status,
        message: 'API not found'
      }
    };
  }
};
