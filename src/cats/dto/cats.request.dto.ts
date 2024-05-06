import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Cat } from "../cats.schema";

export class CatRequestDto extends PickType(Cat, ['email', 'name', 'password'] as const) {}
// as const 가 없어도 되지만 적어주는 이유는 const 타입으로 가져옴으로써 변경할 수 없도록하여
// readOnly 처럼 사용하기 위함