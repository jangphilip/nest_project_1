import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as mongoose from "mongoose";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), //isGlobal: true -> 전역변수로 설정하는 세팅 -> 다른 파일에서 import하지 않아도 사용할 수 있음
    MongooseModule.forRoot(process.env.MONGODB_URI), //환경변수 파일(.env) 내 객체 사용할 때는 process.env 로 사용
    CatsModule, AuthModule,
],
  //cats.module에서 CatsService가 export되어 있고 해당 파일에서 imports에 있으니 CatsService를 providers에 추가 안 해줘도 정상 작동
  controllers: [AppController],
  providers: [AppService], //공급자로 취급 -> 공급자로 취급된 것들은 @Injectable() 을 해줘야됌

  //providers에 있는 것을 controller에 있는 객체가 받아 DI하여 사용
  //위와 같은 경우는 AppService를 AppController가 받아서 DI 하여 사용

  /**
   * app.module.ts 파일 기준에서
   *
   * 해당 파일에서 자체적으로 만든 서비스만 provider에 넣어주는 게 좋고
   * 다른 모듈에서 만든 서비스 게이트웨이 등등 나머지 것들은 다른 모듈에서 exports해주고
   * app.module.ts에 imports에 넣어주는 게 좋은 패턴
   */
})


export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); //endpoint 경로
    mongoose.set('debug', this.isDev);//this.isDev가 true 일 경우 mongoose 쿼리가 log로 찍힘
                                      //배포할때는 false로 변경
  }
}


//module들이 app.module.ts에 묶이고 app.module.ts가 main으로 가게 됌

//imports에 있는 CatsModule에서 expoert한 객체들을 app.module.ts에서 쓸 수 있음
// 즉, imports 안에 있는 모듈들의 export된 객체들을 AppController과 AppService에서 쓸 수 있음
