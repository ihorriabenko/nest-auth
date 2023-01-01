import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import IoRedis from 'ioredis';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const RedisStore = connectRedis(session);
const redisClient = new IoRedis({
  port: 6379,
  host: 'localhost',
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(
    session({
      store: new RedisStore({ client: redisClient as any }),
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 30, //  30 minutes
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
