import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  //nest에서는 위처럼 logging할 때 Logger 클래스 사용

  use(req: Request, res: Response, next: NextFunction) {
    // this.logger.log(req.ip, req.originalUrl);

    //결과값 로깅
    res.on('finish', () => {
      this.logger.log(
        `${req.ip} ${req.method} ${res.statusCode}`,
        req.originalUrl,
      );
    });
    //res가 완료가 됐을 경우의 event 등록

    next();
  }
}
