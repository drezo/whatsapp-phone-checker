module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    let responseMessage = 'Internal Server Error';

    const status = err.status || 500;
    ctx.status = status;

    if (ctx.status === 500) {
      responseMessage = 'Internal Server Error';
      ctx.app.emit('error', err, ctx);
    }

    ctx.body = {
      success: false,
      error: {
        status,
        message: responseMessage
      }
    };
  }
};
