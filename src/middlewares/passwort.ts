import * as passport from 'passport';
import { jwtStrategy } from '../lib/passport';

export const initPassportMiddleware = () => {
	passport.use('jwt', jwtStrategy);
	passport.serializeUser((user, callback) => callback(null, user));
	passport.deserializeUser((user, callback) => callback(null, user));
};
