module.exports = [
  {
    method: 'GET',
    path: '/',
    func: async (ctx, next) => {
      ctx.response.body = `<h1>Index</h1>
      <form action="/signin" method="post">
          <p>Name: <input name="name" value="koa"></p>
          <p>Password: <input name="password" type="password"></p>
          <p><input type="submit" value="Submit"></p>
      </form>`
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