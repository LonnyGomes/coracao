const Koa = require('koa');
const app = new Koa();
const Count = require('./count');
const count = new Count();

app.use(async ctx => {
  ctx.body = 'Hello World';
  return count.incrementCount();
});

app.listen(3000);