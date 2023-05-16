import * as Router from '@koa/router';
import * as jwt from 'jsonwebtoken';
import * as passport from 'koa-passport';

export const router = new Router();

router.post('/login', ctx => {
	const { username, password } = ctx.request.body as Record<string, string>;

	if (username === 'admin' && password === 'password') {
		const payload = { id: 123 };
		const token = jwt.sign(payload, 'your_jwt_secret');
		ctx.body = { token };
	} else {
		ctx.status = 401;
		ctx.body = { error: '用户名或密码无效！' };
	}
});

router.get(
	'/protected',
	passport.authenticate('jwt', { session: false }),
	ctx => {
		const user = ctx.state.user;
		if (!user) {
			ctx.status = 401;
			ctx.body = { error: '无效token！' };
			return;
		}

		if (user.role !== 'admin') {
			ctx.status = 403;
			ctx.body = { error: '访问被拒绝！' };
			return;
		}

		ctx.body = { message: '通过！' };
	}
);
