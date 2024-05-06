import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'; //bycript 암호화 라이브러리
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {

  constructor(private readonly catsRepository: CatsRepository){}

  async signUp(body: CatRequestDto){
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if(isCatExist){
      throw new UnauthorizedException('해당 고양이는 이미 존재합니다.');
      // UnauthorizedException 는 403 에러를 발생시켜주는 자동화된 class
      // throw new HttpException('해당 고양이는 이미 존재합니다.', 403);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password : hashedPassword,
    });

    return cat.readOnlyData;

  }
}
