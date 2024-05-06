import { CatsService } from './cats/cats.service';
import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly CatsService:CatsService) {}

  @Get()
  getHello() {
    // return this.appService.getHello();
    // return this.CatsService.hiCatServiceProduct();
    return  'getHello';
  }
}