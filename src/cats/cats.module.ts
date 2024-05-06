import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats.schema';
import { CatsRepository } from './cats.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])], //사용할 스키마를 등록하여 정상적으로 동작하도록 해주는 부분
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports:[CatsService, CatsRepository], //CatsService를 다른 곳에서 import해서 쓰려면 캡슐화되어 있는 CatsService를 exports 부분을 꼭 해줘야함
})
export class CatsModule {}

//providers에 있는 것은 기본적으로 캡슐화가 되어 있어서 다른 모듈에서는 사용을 못 함
//그래서 exports해줘야됌