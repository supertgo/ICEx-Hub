import { UpdateScheduleUsecase } from '@/schedule/application/usecases/update-schedule.usecase';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateScheduleDto
  implements Omit<UpdateScheduleUsecase.Input, 'id'>
{
  @ApiProperty({ description: 'The name of the schedule' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
