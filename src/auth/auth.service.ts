import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly catsRepository: CatsRepository){}

  async jwtLogIn(data: LoginRequestDto){
    const { email, password } = data;

    // 해당하는 email 있는지 체크
    const cat = await this.catsRepository.findCatByEmail(email);

    if(!cat){
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

  }
}