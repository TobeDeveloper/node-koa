const catcher = require('./middleware/catcher')
const controller = require('./middleware/controller')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.use(bodyParser())
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`)
  await next()
})

app.use(catcher)
// this musu be the last one
app.use(controller);

app.listen(3000)