import Koa from 'koa';
import * as passport from 'koa-passport';
import { initPassportMiddleware, middlewares } from './middlewares';
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

app.use(passport.initialize());
// App.use(passport.session());
initPassportMiddleware();

app.use(router.routes());
app.use(router.allowedMethods());
