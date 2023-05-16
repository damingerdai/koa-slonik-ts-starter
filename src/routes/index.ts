import * as Router from '@koa/router';
import { router as authRouter } from './auth';
import { router as pingRouter } from './ping';

export const router = new Router();

router.use('/', pingRouter.routes(), pingRouter.allowedMethods());

router.use('/auth', authRouter.routes(), authRouter.allowedMethods());
