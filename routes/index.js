module.exports = [
  {
    method: 'GET',
    path: '/',
    func: async (ctx, next) => {
      await ctx.render('index.html', {
        name: '<Nunjucks>',
        fruits: ['Apple', 'Pear', 'Banana'],
        count: 12000
      }, ctx)
    }
  },
  {
    method: 'POST',
    path: '/signin',
    func: async (ctx, next) => {
      var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
      if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
      } else {
        ctx.response.body = `<h1>Login failed!</h1>
            <p><a href="/">Try again</a></p>`;
      }
    }  
  }
]