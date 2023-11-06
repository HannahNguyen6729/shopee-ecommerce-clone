import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import chalk from 'chalk';
import { connectDatabase } from './database/database';
import { commonRoutes } from './routes/common/index.route';
import { adminRoutes } from './routes/admin/index.route';
import { isProduction } from './utils/helper';
import path from 'path';
import { FOLDERS, FOLDER_UPLOAD, ROUTE_IMAGE } from './constants/config';

require('dotenv').config();

const PORT = process.env.PORT || 4000;

// Initialize the express engine
const app: express.Application = express();

// Connect db
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

//handlerImage
const dirNameWithEnv = isProduction ? path.dirname(__dirname) : __dirname;

const handlerImage: any = Object.values(FOLDERS).reduce(
  (result: any, current: any) => {
    return [
      ...result,
      express.static(path.join(dirNameWithEnv, `/${FOLDER_UPLOAD}/${current}`)),
    ];
  },
  [express.static(path.join(dirNameWithEnv, `/${FOLDER_UPLOAD}`))],
);

app.use(`/${ROUTE_IMAGE}`, ...handlerImage);

// Routes
const routes = [{ ...commonRoutes }, { ...adminRoutes }];
routes.forEach((item) =>
  item.routes.forEach((route) =>
    app.use(item.prefix + route.path, route.route),
  ),
);

app.listen(PORT, () => {
  console.log(chalk.green(`Server running on port: ${PORT}`));
});
