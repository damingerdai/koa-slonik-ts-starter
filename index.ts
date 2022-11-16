import Koa from 'koa';
import { router } from './src/routes';

const app = new Koa();

// X-response-timer
app.use(async (ctx, next) => {
	const start = Date.now();
	// eslint-disable-next-line callback-return
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});

// Logger
app.use(async (ctx, next) => {
	const start = Date.now();
	// eslint-disable-next-line callback-return
	await next();
	const ms = Date.now() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(ctx => (ctx.body = 'hello world'));

app.listen(3000);
