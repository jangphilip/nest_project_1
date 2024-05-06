import { Injectable } from '@nestjs/common';

//공급자로 취급된 것들은 @Injectable() 을 해줘야됌
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
