import * as morgan from 'koa-morgan';
import { serverConfig } from '../config';

export const Morgan = morgan('dev', { skip: () => serverConfig.isProduction });
