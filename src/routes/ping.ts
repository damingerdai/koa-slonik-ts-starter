import * as Router from '@koa/router';

export const router = new Router();

router.all('ping', ctx => (ctx.body = 'pong'));
