import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { Cat } from "../cats.schema";


//swagger response 예시 부분 DTO
//PickType 필요한 데이터만 가져올 수 있도록 할 때 사용
// -> 현재는 email, name만 가져옴
export class ReadOnlyCatDto extends PickType(Cat, ['email','name'] as const ) {
  @ApiProperty({
    example: "3020123",
    description: "아이디",
  })
  id: string;

  //상속받은 Cat에는 id 데이터가 없기 때문에 필요한 데이터는 따로 설정 가능

  //PickType은 필요한 데이터만 가져오는 함수이고
  //OmitType은 필요없는 데이터를 제외하고 가져오는 함수
}