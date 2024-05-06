import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); //class-validator 라이브러리를 정상적으로 사용해주기 위해서는 해당 코드를 사용해서 등록해줘야됌

  app.useGlobalFilters(new HttpExceptionFilter()); //해당 선언은 app 객체에 전역필터를 적용했고 필터는 작성해둔 HttpExceptionFilter 가 적용이됌 즉, 전역으로 적용이 됌


  //nest는 swagger 를 자동화해서 만들어주는 라이브러리가 있음
  const config = new DocumentBuilder()
    .setTitle('Cats api swagger')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 첫번째 인자가 endpoint 설정하는 부분


  app.enableCors({
    origin: true, //개발을 할 떄는 true를 하지만 배포를 할 때는 서비스해주는 url이 아닌 다른 사이트에서도 들어오는 것을 막기 위해
                  //서비스해주는 특정 url 적는 것을 권장
    credentials: true,
  });
  
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
