/* eslint-disable import/no-unresolved */
import express, {Request, Response, NextFunction} from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import path from 'path';
import * as http from 'http';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { swaggerDocument } from './swagger';
import config from '../config/config'
// import passport from '../middleware/passportLocal';
import mainRouter from '../routes/index';
import { infoLogger } from './logger';

// import { socketProducts } from './services/socket'; //socket io
// import myServer from './services/server';

const app = express();

app.use(helmet());

/* express configuration */

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use(session({secret:'secreto', resave: false, saveUninitialized:false, cookie: {maxAge: 1000}}));

/* public */
const publicPath = path.resolve(__dirname, "../../public")
app.use(express.static(publicPath))

/* Handlebars */
app.set('view engine', 'handlebars');
const layoutsPath = path.resolve(__dirname, '../../views/layouts');
const defaultPath = path.resolve(__dirname, '../../views/layouts/index.handlebars');

app.engine(
    'handlebars',
    handlebars({
      layoutsDir: layoutsPath,
      defaultLayout: defaultPath,
    })
  );

/* Router */
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {explorer:true}));
app.use(express.json());
app.use('/', mainRouter);

const myServer = new http.Server(app);

export default myServer;