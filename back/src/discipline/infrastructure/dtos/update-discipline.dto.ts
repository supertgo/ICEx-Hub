import { UpdateDisciplineUsecase } from '@/discipline/application/usecases/update-discipline.usecase';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDisciplineDto
  implements Omit<UpdateDisciplineUsecase.Input, 'id'>
{
  @ApiProperty({ description: 'The new name of the discipline' })
  @IsString()
  name?: string;

  @ApiProperty({ description: 'The new code of the discipline' })
  @IsString()
  code?: string;

  @ApiProperty({ description: 'The new courseId of the discipline' })
  @IsString()
  courseId?: string;

  @ApiProperty({ description: 'The new coursePeriodId of the discipline' })
  @IsString()
  coursePeriodId?: string;
}
