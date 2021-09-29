import * as dotenv from 'dotenv';
dotenv.config();
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from 'core/filters/http-exception.filter';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  let httpsOptions = {};
  const logger: Logger = new Logger('Main');
  // const ssl = process.env.SSL === 'true' ? true : false;
  // if (ssl) {
  //   try {
  //     const keyPath = process.env.SSL_KEY_PATH || '';
  //     const certPath = process.env.SSL_CERT_PATH || '';
  //     httpsOptions = {
  //       logger: true,
  //       key: fs.readFileSync(path.join(__dirname, keyPath)),
  //       cert: fs.readFileSync(path.join(__dirname, certPath)),
  //     };
  //   } catch (error) {
  //     logger.log(error);
  //   }
  // } else {
  httpsOptions = {
    logger: true,
  };
  // }

  const app = await NestFactory.create(AppModule, { httpsOptions });
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidateInputPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  app.enableCors({
    // origin: [
    //   'http://localhost:3000',
    //   'http://192.168.0.178:3000',
    //   'https://localhost:3000',
    //   'https://192.168.0.178:3000',
    //   'https://lunatri.com',
    // ],
    origin: 'https://lunatri.com',
    allowedHeaders: [
      'Accept',
      'Access-Control-Allow-Origin',
      'Authentication',
      'Authorization',
      'Content-Type',
      'Origin',
      'Cookie',
      'Cookies',
      'Set-Cookie',
      'X-Requested-With',
      'X-XSRF-TOKEN',
    ],
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });
  // app.use((req, res, next) => {
  //   // res.header('Access-Control-Allow-Origin', '*');
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept, Authentication, Set-Cookie',
  //   );
  //   res.header('withCredentials', true);
  //   next();
  // });
  await app.listen(process.env.PORT || 3200);
  logger.log(
    `\x1b[35mApplication is running on: \x1b[36m${await app.getUrl()}\x1b[0m`,
  );
  logger.log(
    `\x1b[35mCurrent build: \x1b[36m[${config.get('NODE_ENV')}]\x1b[0m`,
  );
  // console.log('Config', config);
}
bootstrap();
