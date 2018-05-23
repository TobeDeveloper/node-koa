module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.response.status = e.statusCode || e.status || 500;
    ctx.response.body = {
      message: e.message
    }
    // release the error event
    ctx.app.emit('error', e, ctx)
  }
};