import Koa from 'koa';
import { middlewares } from './middlewares';
import { router } from './routes';

export const app = new Koa();

// X-response-timer
app.use(async (ctx, next) => {
	const start = Date.now();
	// eslint-disable-next-line callback-return
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});

middlewares.forEach(middleware => app.use(middleware));

app.use(router.routes());
app.use(router.allowedMethods());

app.use(ctx => (ctx.body = 'hello world'));
