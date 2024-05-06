import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secrectOrkey: 'secretKey', //현재는 공부중이라 이렇게 value를 준거고 실제 개발에서는 환경변수로 관리하여 노출이 되지 않도록 해야됌
      ignoreExpiration: false, // ignoreExpiration -> 만료기간의 의미
    });
  }

  // async validate(payload){}
}