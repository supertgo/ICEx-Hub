import { UpdateUserUsecase } from '@/user/application/usecases/update-user.usecase';
import { IsEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClassroomDto implements Omit<UpdateUserUsecase.Input, 'id'> {
  @ApiProperty({ description: 'The name of the classroom' })
  @IsString()
  @IsEmpty()
  name: string;

  @ApiProperty({ description: 'The building of the classroom' })
  @IsString()
  @IsEmpty()
  building: 'CAD3' | 'ICEX';
}
