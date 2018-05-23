const nunjucks = require('nunjucks')

function createEnv(path, opts) {
  var autospace = opts.autospace === undefined ? true : opts.autospace,
    noCache = opts.noCache || false,
    watch = opts.watch || false,
    throwOnUndefined = opts.throwOnUndefined || false,
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(path, {
        noCache: noCache,
        watch: watch
      }), {
        autoescape: autospace,
        throwOnUndefined: throwOnUndefined
      });
    if(opts.filters) {
      for(let f in opts.filters) {
        env.addFilter(f, opts.filters[f])
      }
    }

    return env
}

module.exports = function rendering(path, opts) {
  var env = createEnv(path, opts)
  return async (ctx, next) => {
    ctx.render = function(view, model) {
      ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
      // 设置Content-Type:
      ctx.response.type = 'text/html';
    }
    await next()
  }
}