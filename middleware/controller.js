const fs = require('fs')
const router = require('koa-router')()
// default route path
const routeDir = '/../routes/'

const routeFiles = fs.readdirSync(__dirname + routeDir)
                      .filter(f => f.endsWith('.js'));

for(let r of routeFiles) {
  const mapping = require(__dirname + routeDir + r)
  mapping.forEach(item => {
    console.log(`Register URL mapping ${item.method} ${item.path}`)
    let method = (item.method === 'DELETE') ? 'del' : item.method.toLowerCase()
    router[method](item.path, item.func)
  })
}

module.exports = router.routes()