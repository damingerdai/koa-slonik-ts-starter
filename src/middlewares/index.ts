import { BodyParser } from './body-parser';
import { compression } from './compression';
import { Morgan } from './morgan';

export const middlewares = [BodyParser, compression, Morgan];

export * from './passwort';
