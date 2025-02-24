import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from './routers';
import { errorHandler, notFoundRequest } from './routers/errorHandlers';
import path from 'path';

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors({
    origin: "http://localhost:3000"
  }));

  app.use('/', router);
  app.use(notFoundRequest);
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });