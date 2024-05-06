import { Controller, Get, Put,  Delete, Patch, Post, HttpException, UseFilters, Param, ParseIntPipe, UseInterceptors, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from 'src/cats/dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
// @UseFilters(HttpExceptionFilter) //여기에 선언하면 해당 class에 적용이 됌
export class CatsController {
  constructor(private readonly catsService : CatsService){}
  //위 라인은 DI를 해준 부분
  /**
   * DI 관련해서
   * 
   * CatsController 라는 소비자가
   * CatsService를 것을 공급받은 것이고
   * 공급자는 cats.module.ts 에 있는 providers
   */

  @ApiOperation({ summary: '현재 고양이 가져오기'})
  @Get()
  getCurrentCat(){
    return 'current cat';
  }

  
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  }) //swagger response 예시 부분
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입'}) //swagger 설명하는 부분
  @Post()
  async signUp(@Body() body: CatRequestDto){ //요청에서 들어온 param을 body에 담음
    // console.log('body -> '+JSON.stringify(body));
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인'})
  @Post('login')
  logIn(){
    return 'login';
  }

  @ApiOperation({ summary: '로그아웃'})
  @Post('logout')
  logOut(){
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드'})
  @Post('upload/cats')
  uploadCatImg(){
    return 'uploadImg';
  }



  /*
  //아래 라인의 경로는 get요청의 cats/
  @Get()
  // @UseFilters(HttpExceptionFilter) //여기에 선언하면 해당 route에만 적용이 됌
  getAllCat(){
    // throw new HttpException('api is broken', 401);
    // throw new HttpException({
    //   success : false,
    //   message : 'api is broken'
    // }, 401);
    return {
      cats : 'get all cat api'
    };
  }

  //아래 라인의 경로는  get요청의 cats/:id
  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param:number){
    //ParseIntPipe -> 정수형으로 변경해주는 pipe 단, '123' -> 123 이렇식으로만 가능하고 문자열이나 음수는 예외처리로 routing 됌
    //추가적으로 number 로 타입을 선정해줄 수 있기 때문에 예외처리 가능해서 1석2조
    
    //@Param() -> 으로하면 param 객체가 key:value 형태이지만
    //@Param('id') -> 으로하면 param 객체가 id의 value만 가지고 있는 객체가 됌

    // console.log(typeof param);
    console.log(param);
    return 'one cat';
  }
  */

}
