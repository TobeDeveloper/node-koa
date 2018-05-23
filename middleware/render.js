const nunjucks = require('nunjucks')

module.exports =function createEnv(path, opts) {
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
