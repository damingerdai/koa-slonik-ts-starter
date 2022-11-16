import * as Router from '@koa/router';
import { router as pingRouter } from './ping';

export const router = new Router();

router.use('/', pingRouter.routes(), pingRouter.allowedMethods());
