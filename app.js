import Koa from 'koa';

// 加载request 请求模块
import bodyParse from 'koa-bodyparser';

// 加载路由模块
import controller from './controllers/controller';

const app = new Koa();

const port = 8083;
const hostname = '127.0.0.1';

// app注入bodyParse中间件
app.use(bodyParse());

// 日志打印
app.use(async (ctx, next) => {
  // ctx.request.url == ctx.url
  console.log(`${ctx.req.method} ${ctx.req.url}`);
  await next(); // middleWare
});

// 时间打印
app.use(async (ctx, next) => {
  const start = new Date().getTime(); // bengin time

  await next(); // 调用下一个中间件 middleWare

  const ms = new Date().getTime() - start; // use time

  console.log(`Time: ${ms}`); // print use time
});

app.use(controller());

app.listen(port, hostname, () => {
  console.log(`server has running at http://${hostname}:${port}`);
});