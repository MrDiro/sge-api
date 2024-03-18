import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { swagger } from './core/doc/swagger.config';
import { helmetCofig } from './core/security/headers.config';
import { corsConfig } from './core/security/cors.config';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
    logger: ["debug", "error", "fatal", "warn"]
  });

  // Headers configuration ============================================
  app.use(helmetCofig);
  // Cors configuration ===============================================
  app.enableCors(corsConfig);
  // Swagger configuration ============================================
  swagger(app);

  await app.listen(3000);
}

bootstrap();