import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GENERAL } from './const/general.const';
import { HttpCustomException } from './common/exception/http-custom.exception';

async function bootstrap() {
  const aplicationNestName = GENERAL.NAME_COMPONENT;

  const logger = new Logger(aplicationNestName);
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const tcp = {
    host: config.get('tcp.host', 'localhost'),
    port: config.get('tcp.port', 30000)
  }

  app.useGlobalFilters(new HttpCustomException(logger));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.connectMicroservice({
    transport: Transport.TCP,
      options: {
        host: config.get('tcp.host', 'localhost'),
        port: config.get('tcp.port', 30000)
      },
  });
  
  const swaggerBasePath = config.get('swagger.basePath', '/api');
  const httpBasePath = config.get('http.basePath', '/api');

  app.setGlobalPrefix(httpBasePath);

  const documentBuilder = new DocumentBuilder()
    .setTitle(aplicationNestName)
    .setVersion('1.0');

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup(swaggerBasePath, app, document);

  app.enableCors();

  await app.startAllMicroservices();
  await app.listen(config.get('http.port'), config.get('http.host'));

  logger.log(
    `HTTP server listening at http://${config.get('http.host')}:${config.get(
      'http.port',
    )}`,
  );
  logger.log(
    `Swagger documentation at http://${config.get('http.host')}:${config.get(
      'http.port',
    )}${swaggerBasePath}`,
  );
  
  logger.log(
    `TCP server listening at host: ${tcp.host},  port: ${tcp.port}`,
  );

}

void bootstrap();
