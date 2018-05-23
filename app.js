const catcher = require('./middleware/catcher')
const render = require('./middleware/render')
const controller = require('./middleware/controller')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const isProd = process.env.ENV_PROFILE === 'prod'
const app = new Koa()

app.use(bodyParser())

app.use(catcher)
if(!isProd) {
  // static resource loader
  const staticResources = require('./middleware/static-resources')
  app.use(staticResources('/static/', __dirname+'/static'))
}
app.use(render('templates', {
  noCache: !isProd,
  watch: !isProd
}))
// this musu be the last one
app.use(controller);

app.listen(3000)