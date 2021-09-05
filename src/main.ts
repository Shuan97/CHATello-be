import * as dotenv from 'dotenv';
dotenv.config();
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from 'core/filters/http-exception.filter';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true,
  });
  const logger: Logger = new Logger('Main');
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidateInputPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  app.enableCors({
    // origin: config.get('ORIGIN_URL') || 'http://localhost:3000',
    origin: [
      'http://localhost:3000',
      'http://192.168.0.178:3000',
      'https://localhost:3000',
      'https://192.168.0.178:3000',
      'https://lunatri.com',
    ],
    allowedHeaders: [
      'Accept',
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
