const fs = require('fs')

function getControllers(router, dir) {
  var routes = fs.readdirSync(__dirname + dir)
                .filter(f => f.endsWith('.js'))
  for(let r of routes) {
    console.log(`Processing routers: ${r}`)
    let mapping = require(__dirname+dir+r)
    addMapping(router, mapping)
  }
}

function addMapping(router, mapping) {
  for(let url in mapping) {
    if(url.startsWith('GET')) {
      var path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    }else if(url.startsWith('POST')) {
      var path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    }else {
      console.error('Invalid url')
    }
  }
}

module.exports = function(dir) {
  // default dir: {root}/routes
  let controller_dir = dir || '/../routes/',
    router = require('koa-router')();
  getControllers(router, controller_dir)
  return router.routes();
}