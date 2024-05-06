import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';


const options: SchemaOptions = {
  timestamps: true, //DB에서 하나가 만들어질 떄 timestamp를 찍어줌
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({ //swagger param 예시 부분
    example: 'jang0104@hanmail.net',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true, //defalut값은 false
    unique: true
    //옵션 설정 가능
  })

  //아래 데코레이터는 class-validator 라는 라이브러리의 function
  // npm i --save class-validator class-transformer
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string,
    email: string,
    name: string,
  };
}
//Cat 이 원래는 클래스인데
//아래 SchemaFactory.createForClass(Cat); 부분으로 CatSchema 라는 스키마를 만들어줌
export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat){
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
  //back에서 front로 응답을 해줄 때 원하는 데이터만만 보내기 위한 작업
});
//vitual field 사용
//vitual field란 실제 db에서 사용되는 필드는 아니지만 비즈니스 로직에서 사용할 수 있도록 제공해주는 필드