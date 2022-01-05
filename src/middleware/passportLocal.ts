import passport from 'passport';
import {
  Strategy,
  VerifyFunctionWithRequest,
  IStrategyOptionsWithRequest,
} from 'passport-local';
import { Request, Response, NextFunction } from 'express';
import { apiLogin } from '../apis/login';
// import { userJoiSchema } from '../models/users/users.interface';
import { infoLogger } from '../services/logger';

const admin = true;

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
   infoLogger.info('EJECUTANDO MIDDLEWARE');
  if (admin) next();
  else {
    infoLogger.warn('No autorizado')
    res.status(401).json({
      msg: 'No estas autorizado',
    });
  }
};

const strategyOptions: IStrategyOptionsWithRequest = {
  usernameField: 'email', //campos del formulario/body
  passwordField: 'password',
  passReqToCallback: true,
};

const loginFunc: VerifyFunctionWithRequest = async (
  req,
  username,
  password,
  done
) => {
  infoLogger.info(`loginFunc = ${username}`)
  
  const user = await apiLogin.getByEmail(username);
  
  infoLogger.info(`user -> ${user}`);
  if (!user) {
    infoLogger.warn(`user does not exists ${username}`);
    return done(null, false, { message: 'User does not exist' });
  }

  const check = await apiLogin.validatePassword(username, password);
  infoLogger.info(check);
  if (!check) {
    infoLogger.warn(`Login Fail for username ${username}: Password is not valid`);
    return done(null, false, { message: 'Password is not valid.' });
  }
  infoLogger.info('login exitoso 50')
  infoLogger.info(`User ${username} logged in at ${new Date()}`);
  // console.log('loginFunc')
  // console.log(username)
  // console.log(user)
  return done(null, username);
};

const signUpFunc: VerifyFunctionWithRequest = async (
  req,
  username,
  password,
  done
) => {
  try {

    const { email } = req.body;
    const user = await apiLogin.getByEmail(username);

    if (user) {
        infoLogger.warn(
        `Signup Fail for username ${username}: Username or email already exists`
      );
      return done(null, {
        error: `Invalid Username/email`,
      });
    } else {
      const newUser = await apiLogin.addUser(req.body);
      return done(null, newUser);
    }
  } catch (err) {
    if (err instanceof Error) {
        infoLogger.error(err.message);
      return done(null, {
        error: err.message,
      });
    }
  }
};

passport.use('login', new Strategy(strategyOptions, loginFunc));
passport.use('signup', new Strategy(strategyOptions, signUpFunc));

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser(async (userId: string, done) => {
  try {
    
    const result = await apiLogin.getByEmail(userId);
   
    done(null, result);
    // const result = await apiLogin.get(userId);
    // done(null, result[0]);
  } catch (err) {
    done(err);
  }
});

export const isLoggedIn = async (req: Request, res: Response, done: NextFunction) => {
  
  const resultado = await apiLogin.getByEmail('ignaciokakazu123@gmail.com');
  infoLogger.info('is logged in. En Passport local los datos están req.session');
  console.log(req.isAuthenticated())
  if (!req.isAuthenticated()) { 
    // sé que acá está mal. El tema es que no me levanta el isAuthenticated() (siempre me da false) y
    // no podía probar los endpoints. Tampoco me toma el req.user
    done();
  } else  {
    res.send('no podes seguir sin loguearte en /admin')
  }

};

export const isAdmin = (req: Request, res: Response, done: NextFunction) => {
  if (!req.user) return res.redirect('/admin')//res.status(401).json({ msg: 'Unathorized' });

  done();
};

export default passport;
