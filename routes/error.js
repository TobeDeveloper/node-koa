module.exports = [
  {
    method: 'GET',
    path: '/error',
    func: async (ctx, next) => {
      ctx.throw(500)
    }
  }
]