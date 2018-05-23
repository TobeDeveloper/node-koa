const path = require('path')
const mime = require('mime')
const fs = require('mz/fs')

module.exports = function staticFiles(url, dir) {
  return async(ctx, next) => {
    let requestPath = ctx.request.path
    if(requestPath.startsWith(url)){
      let realPath = path.join(dir, requestPath.substring(url.length))
      if(await fs.exists(realPath)) {
        ctx.response.type = mime.getType(requestPath)
        ctx.response.body = await fs.readFile(realPath)
      } 
      else {
        ctx.response.status = 404
      }
    }
    else {
      await next()
    }
  }
}