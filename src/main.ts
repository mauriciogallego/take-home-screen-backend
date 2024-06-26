import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './database/prisma.service';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  const configService: ConfigService = app.get(ConfigService);

  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  // Swagger setup
  if (process.env.NODE_ENV !== 'production') {
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: { persistAuthorization: true },
    };
    const config = new DocumentBuilder()
      .setTitle('API WEB APP')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, customOptions);
  }

  // Prisma shutdown
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  // Set the versioning type
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Set the validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Start the server
  await app.listen(configService.get('port') as number);
}
bootstrap();
