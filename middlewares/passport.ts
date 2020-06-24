import db from "../models/";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import passportJWT from "passport-jwt";
import {compare} from "bcrypt";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const users = db.users;
 
passport.use(new LocalStrategy({
  usernameField: "loginId",
  passwordField: "password",
},
async function (loginId: string, password:string, done: Function) {
    let user;
    try {
      user = await users.findOne({ where: { loginId } });
      if (!user) {
        return done(null, false, { message: 'No user by that email' });
      }
      let match = await compare(password, user.authorize_token!)
  await console.log(typeof match)
    if (!match) {
      return done(null, false, { message: 'Not a matching password' });
    }
    return done(null, user);
} 
catch (e) {
  return done(e);
}
}))

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret",
  },
  async function (jwtPayload: any, done: Function) {
  let user;
  try {
    user = await users.findByPk(jwtPayload.id);
    if (!user) {
      return done(null, false, { message: 'No user' });
    }
    return done(null, user);
  }
  catch (err:any) {
    return done(err);
  }
}))
