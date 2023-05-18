import * as passportJWT from 'passport-jwt';

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'damingerdai'
};

export const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
	if (jwtPayload.id === 123) {
		done(null, { id: 123, role: 'admin' });
	} else {
		done(null, false);
	}
});
