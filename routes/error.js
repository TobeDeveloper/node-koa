module.exports = {
  'GET /error': async (ctx, next) => {
    ctx.throw(500)
  }
}