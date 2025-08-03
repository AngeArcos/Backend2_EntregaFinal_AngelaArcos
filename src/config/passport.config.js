import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from './config.js';
import UserModel from '../models/user.model.js';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
  try {
    const user = await UserModel.findById(jwtPayload.userId);
    if (!user) return done(null, false);
    return done(null, { userId: user._id, role: user.role, email: user.email });
  } catch (err) {
    return done(err, false);
  }
}));

export default passport;