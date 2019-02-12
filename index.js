const Koa = require('koa');
var Router = require('koa-router');
var router = new Router();
const app = new Koa();

const Count = require('./count');
const count = new Count();

router.get('/', (ctx, next) => {
    ctx.body = count.loadCount();
});

router.get('/increment', (ctx, next) => {
    ctx.body = count.incrementCount();
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);