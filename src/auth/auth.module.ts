import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false, //세션 쿠기 사용 안 할 예정이라 false
    }), //PassportModule에서는 strategy에 대한 기본적인 설정 가능
    JwtModule.register({
      secret: 'secret',
      signOptions:{
        expiresIn: '1y',
      },
    }), //로그인할 때 쓰려고 작성한 부분

    CatsModule,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
